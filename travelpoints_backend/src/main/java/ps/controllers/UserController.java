package ps.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ps.dtos.*;
import ps.dtos.builders.ObiectiveBuilder;
import ps.entities.Obiective;
import ps.services.ObiectiveService;
import ps.services.UserService;
import ps.services.WishService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/")
public class UserController {
    private final UserService userService;
    private final ObiectiveService obiectiveService;
    private final WishService wishService;
    private int id_user=0;
    int wish=0;
    List<Integer> obiective=new ArrayList<>();

    @Autowired
    public UserController(UserService userService, ObiectiveService obiectiveService, WishService wishService) {
        this.userService = userService;
        this.obiectiveService = obiectiveService;


        this.wishService = wishService;
    }

    @GetMapping(value = "/login")
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> dtos = userService.findUsers();
        for (UserDTO dto : dtos) {
            Link userLink = linkTo(methodOn(UserController.class)
                    .getUser(dto.getId())).withRel("userDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping(value = "/login/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") int userId) {
        UserDTO dto = userService.findUserById(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //inregistrare
    @PostMapping(value = "/login/add")
    public ResponseEntity<Integer> insertProsumer(@Valid @RequestBody UserDTO userDTO) {
        int userID = userService.insert(userDTO);
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<Integer> register(@Valid @RequestBody UserDTO userDTO) {
        int userID = userService.insert(userDTO);
        return new ResponseEntity<>(userID, HttpStatus.CREATED);
    }

    //login
    @PostMapping(value = "/login")
    public ResponseEntity<UserDTO> login(@Valid @RequestBody UserDTO userDTO) {
        UserDTO dto = userService.findUserByUsername(userDTO.getUsername(), userDTO.getPassword());
        id_user=dto.getId();
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //reset
    @PutMapping(value = "/reset/{email}")
    public ResponseEntity<UserDTO> reset(@PathVariable("email") String email, @Valid @RequestBody ResetDataDTO data){
        UserDTO user= userService.updatePassword(email, data);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //comment
    @PostMapping(value = "/touristboard/objectives/comment/{id}")
    public ResponseEntity<CommentDTO> comment(@PathVariable("id") int obiectiveId, @Valid @RequestBody CommentDataDTO commentDTO) {
        //System.out.println(id_user);
        //System.out.println(obiectiveId);

        ObiectiveDTO obiective = obiectiveService.findObiectivById(obiectiveId);

        UserDTO user= userService.findUserById(id_user);


        CommentDTO dto = userService.addComment(commentDTO, obiective, user);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }


    //addWish
    @PostMapping(value = "/touristboard/objectives/wish/{id}")
    public ResponseEntity<Integer> insertWishlist(@PathVariable("id") int obId) {
        System.out.println(obId);
        System.out.println(id_user);

        ObiectiveDTO ob;
        UserDTO userDTO = userService.findUserById(id_user);

        boolean found = wishService.getObjectiveWish(id_user, obId);

        if (found) {
            WishlistDTO wishlist = new WishlistDTO();
            ob = obiectiveService.findObiectivById(obId);
            wish = wishService.insertWishlist(wishlist, userDTO, ob);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wish already exists");
        }

        return new ResponseEntity<>(wish, HttpStatus.CREATED);
    }

    @GetMapping(value = "/wishboard")
    public ResponseEntity<List<ObiectiveDTO>> getWishlistsUserId() {

        List<Obiective> ob= wishService.getWishlistByUserId(id_user);
        List<ObiectiveDTO> obiective= ob.stream()
                .map(ObiectiveBuilder::toObiectiveDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(obiective, HttpStatus.OK);
    }
    @GetMapping(value = "/comments")
    public ResponseEntity<List<CommentDTO>> getComments() {

        List<CommentDTO>  comm= userService.findComments();


        return new ResponseEntity<>(comm, HttpStatus.OK);
    }
}

