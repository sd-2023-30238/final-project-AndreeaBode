package ps.dtos;

import lombok.EqualsAndHashCode;
import org.springframework.hateoas.RepresentationModel;

@EqualsAndHashCode(callSuper = true)
public class CommentDataDTO extends RepresentationModel<CommentDataDTO> {

    private String descriere;


    public CommentDataDTO(String descriere) {
        this.descriere = descriere;
    }

    public CommentDataDTO() {}

    public String getDescriere() {
        return descriere;
    }
}
