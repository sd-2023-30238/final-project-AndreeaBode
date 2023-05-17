package ps.entities;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Entity

@AllArgsConstructor

@NoArgsConstructor
@Table(name = "admin")
public class Admin extends User implements Serializable {
    @Id
    @GeneratedValue
    private int id;



}
