package ps.dtos.builders;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ps.dtos.CommentDTO;
import ps.entities.Comentariu;
import ps.entities.Obiective;
import ps.entities.User;
import ps.repositories.ObiectiveRepository;
import ps.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@Component
public class CommentBuilder {
    private static
    ObiectiveRepository obiectiveRepository;
    private static
    UserRepository userRepository;


    private CommentBuilder(ObiectiveRepository obiectiveRepository, UserRepository userRepository) {
        this.obiectiveRepository= obiectiveRepository;
        this.userRepository= userRepository;

    }


    public static CommentDTO toCommentDTO(Comentariu comentariu) {
        return new CommentDTO(comentariu.getId(),comentariu.getData(), comentariu.getDescriere(), comentariu.getOra(),comentariu.getObiective().getId(),comentariu.getUtilizator().getId());
    }
    public static CommentDTO toCommentDTO1(Comentariu comentariu) {
        return new CommentDTO(comentariu.getId(),comentariu.getData(), comentariu.getDescriere(), comentariu.getOra(),comentariu.getObiective().getNume_obiectiv(),comentariu.getUtilizator().getUsername());
    }

    public static Comentariu toEntity(CommentDTO commentDTO) {
        Optional<Obiective> obiectivOptional = obiectiveRepository.findById(commentDTO.getId_obiectiv());
        Optional<User> userOptional = userRepository.findById(commentDTO.getId_user());

        if (obiectivOptional.isPresent() && userOptional.isPresent()) {
            return new Comentariu(
                    commentDTO.getId(),
                    commentDTO.getData(),
                    commentDTO.getDescriere(),
                    commentDTO.getOra(),
                    obiectivOptional.get(),
                    userOptional.get()
            );
        } else {
            throw new EntityNotFoundException("Obiectiv or User not found with ID: " + commentDTO.getId_obiectiv() + ", " + commentDTO.getId_user());
        }
    }
}
