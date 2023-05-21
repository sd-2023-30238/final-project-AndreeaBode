package ps.entities;

import lombok.Data;
import ps.utils.Status;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "utilizator")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private int id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;


    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "status", nullable = false)
    private Status status;

    @OneToMany(mappedBy = "utilizator",
            cascade = CascadeType.ALL)
    private List<Comentariu> comentarii;

    public User() {
    }

    public User(int id, String username, String password, String email, String role, Status status) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    public User(String username, String password, String email, String role, Status status) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Comentariu> getComentarii() {
        return comentarii;
    }

    public void setComentarii(List<Comentariu> comentarii) {
        this.comentarii = comentarii;
    }

}

