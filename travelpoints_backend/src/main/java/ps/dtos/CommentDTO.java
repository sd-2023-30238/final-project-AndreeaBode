package ps.dtos;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class CommentDTO extends RepresentationModel<CommentDTO> {
    private int id;
    private String data;
    private String descriere ;
    private String ora;
    private int id_obiectiv;
    private int id_user;

    private String obiectiv;
    private String username;


    public CommentDTO(int id, String data, String descriere, String ora,int obiective, int id_user) {
        this.id = id;
        this.data = data;
        this.descriere = descriere;
        this.ora = ora;
        this.id_obiectiv=obiective;
        this.id_user=id_user;


    }

    public CommentDTO(int id, String data, String descriere, String ora,String obiective, String user) {
        this.id = id;
        this.data = data;
        this.descriere = descriere;
        this.ora = ora;
        this.obiectiv=obiective;
        this.username=user;


    }

    public String getObiectiv() {
        return obiectiv;
    }

    public String getUsername() {
        return username;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public void setOra(String ora) {
        this.ora = ora;
    }

    public void setId_obiectiv(int id_obiectiv) {
        this.id_obiectiv = id_obiectiv;
    }

    public void setId_user(int id_user) {
        this.id_user = id_user;
    }

    public int getId() {
        return id;
    }

    public String getData() {
        return data;
    }

    public String getDescriere() {
        return descriere;
    }

    public String getOra() {
        return ora;
    }

    public int getId_obiectiv() {
        return id_obiectiv;
    }

    public int getId_user() {
        return id_user;
    }
}

