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
@Table(name="oferta")
public class Oferte implements Serializable {


    @Id
    @GeneratedValue
    private int id;

    @Column(name = "descriereOferta", nullable = false)
    private String descriereOferta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_obiectiv", nullable = false)
    private Obiective obiective;



}