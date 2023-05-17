package ps.dtos;

import lombok.EqualsAndHashCode;
import org.springframework.hateoas.RepresentationModel;

@EqualsAndHashCode(callSuper = true)
public class ReviewDTO extends RepresentationModel<ReviewDTO> {

    private Integer nota;



    public ReviewDTO(Integer nota) {
        this.nota = nota;
    }
    public ReviewDTO() {}

}
