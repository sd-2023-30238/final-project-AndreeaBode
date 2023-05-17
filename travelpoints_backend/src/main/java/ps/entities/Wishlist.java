package ps.entities;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity



@NoArgsConstructor
@Table(name="Wishlist")
public class Wishlist implements Serializable {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = FetchType.LAZY,cascade=CascadeType.MERGE)
    @JoinColumn(name = "id_user", nullable = false)
    private User utilizator;


    @ManyToOne(fetch = FetchType.EAGER,cascade=CascadeType.MERGE)
    @JoinColumn(name = "id_obiectiv", nullable = false)
    private Obiective obiective;


    public Wishlist(int id,Obiective obiective, User user) {
        this.id=id;
        this.obiective=obiective;
        this.utilizator=user;

    }

    public int getId() {
        return id;
    }

    public User getUtilizator() {
        return utilizator;
    }

    public Obiective getObiective() {
        return obiective;
    }
}