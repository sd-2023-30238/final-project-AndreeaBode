package ps.dtos;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class WishlistDTO extends RepresentationModel<WishlistDTO> {
    private int id;
    private int id_obiectiv;
    private int id_user;



    public WishlistDTO(int id, int id_user, int obiective) {
        this.id=id;
        this.id_user=id_user;
        this.id_obiectiv=obiective;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public int getId() {
        return id;
    }

    public int getId_obiectiv() {
        return id_obiectiv;
    }


    public int getId_user() {
        return id_user;
    }

    public void setId_obiectiv(int id_obiectiv) {
        this.id_obiectiv = id_obiectiv;
    }

}
