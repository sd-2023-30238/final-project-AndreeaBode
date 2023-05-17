package ps.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import ps.dtos.*;
import ps.dtos.builders.CommentBuilder;
import ps.dtos.builders.UserBuilder;
import ps.entities.Comentariu;
import ps.entities.User;
import ps.repositories.CommentRepository;
import ps.repositories.UserRepository;
import ps.repositories.WishlistRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private WishlistRepository wishlistRepository;


    @Autowired
    public UserService(UserRepository userRepository, CommentRepository commentRepository, WishlistRepository wishlistRepository) {
        this.userRepository = userRepository;
        this.commentRepository=commentRepository;
        this.wishlistRepository=wishlistRepository;
    }

    public List<UserDTO> findUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(UserBuilder::toUserDTO)
                .collect(Collectors.toList());
    }

    public UserDTO findUserById(int id) {
        Optional<User> prosumerOptional = userRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }
        return UserBuilder.toUserDTO(prosumerOptional.get());
    }

    public UserDTO findUserByUsername(String username, String password) {
        Optional<User> prosumerOptional = userRepository.findUserByUsername(username);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("User with username {} was not found in db", username);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + username);
        }
        if (prosumerOptional.isPresent()) {
            if (!prosumerOptional.get().getPassword().equals(password)) {
                System.out.println(prosumerOptional.get().getPassword());
                return null;
            }
        }
        return UserBuilder.toUserDTO(prosumerOptional.get());
    }

    public int insert(UserDTO userDTO) {
        User user = UserBuilder.toEntity(userDTO);
        user = userRepository.save(user);
        LOGGER.debug("user with id {} was inserted in db", user.getId());
        return user.getId();
    }

    public UserDTO updatePassword(String email, ResetDataDTO data) {

        UserDTO userDTO = null;
        if(userRepository.findByEmail(email) != null) {
            User user = userRepository.findByEmail(email);

            if ((user.getUsername()).equals(data.getUsername())) {
                System.out.println(data.getPassword());
                user.setPassword(data.getPassword());
                userRepository.save(user);
            }
            userDTO = UserBuilder.toUserDTO(user);
        }
        return userDTO;
    }

    public CommentDTO addComment(CommentDataDTO data, ObiectiveDTO obiectiveDTO, UserDTO userDTO) {

        //Obiective ob = ObiectiveBuilder.toEntity(obiectiveDTO);
        //User user = UserBuilder.toEntity(userDTO);

        CommentDTO commentDTO = new CommentDTO();

        //System.out.println(data.getDescriere());
        // System.out.println(obiectiveDTO.getId());
        //System.out.println(userDTO.getId());


        long millis=System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(millis);

        Calendar cal = Calendar.getInstance();
        Date date1=cal.getTime();
        DateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
        String formattedDate=dateFormat.format(date1);

        commentDTO.setDescriere(data.getDescriere());
        commentDTO.setData(String.valueOf(date));
        commentDTO.setOra(formattedDate);
        commentDTO.setId_obiectiv(obiectiveDTO.getId());
        commentDTO.setId_user(userDTO.getId());


        Comentariu comentariu = CommentBuilder.toEntity(commentDTO);


        commentRepository.save(comentariu);

        return commentDTO;
    }

    public List<CommentDTO> findComments() {
        List<Comentariu> commList = commentRepository.findAll();
        return commList.stream()
                .map(CommentBuilder::toCommentDTO1)
                .collect(Collectors.toList());
    }








}

