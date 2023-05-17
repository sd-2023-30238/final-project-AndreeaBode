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
@Table(name="review")
public class Review implements Serializable {
    @Id
    @GeneratedValue
    private int id;

    @Column(name = "nota", nullable = false)
    private int nota;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_comentariu", nullable = false)
    private Comentariu comentariu;


}
