package ps.dtos;

import lombok.EqualsAndHashCode;
import org.springframework.hateoas.RepresentationModel;

@EqualsAndHashCode(callSuper = true)
public class ResetDataDTO extends RepresentationModel<ResetDataDTO> {

    private String username;
    private String password;


    public ResetDataDTO(String username, String password) {
        this.username = username;
        this.password = password;}

    public ResetDataDTO() {}

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


}
