package ps.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor

@NoArgsConstructor
@Table(name="comentariu")
public class Comentariu implements Serializable {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "descriere", nullable = false)
    private String descriere;

    @Column(name = "data", nullable = false)
    private String data;

    @Column(name = "ora", nullable = false)
    private String ora;

    @ManyToOne(optional = false,cascade=CascadeType.MERGE)
    @JoinColumn(name = "id_user", nullable = false)
    private User utilizator;

    @OneToOne(mappedBy="comentariu",fetch = FetchType.LAZY, optional = false,cascade=CascadeType.MERGE)
    private Review review;

    @ManyToOne( optional = false, cascade=CascadeType.MERGE)
    @JoinColumn(name = "id_obiectiv", nullable = false)
    private Obiective obiective;



    public Comentariu(int id, String data, String descriere, String ora ,Obiective id_obiectiv, User id_user) {
        this.id=id;
        this.data=data;
        this.descriere=descriere;
        this.ora=ora;
        this.obiective=id_obiectiv;
        this.utilizator=id_user;


    }



    public void setIdObiectiv(int id) {
        this.obiective.setId(id);
    }

    public void setIdUser(int id) {
        this.utilizator.setId(id);
    }
}
