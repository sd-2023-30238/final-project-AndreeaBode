package ps.dtos.builders;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ps.dtos.UserDTO;
import ps.entities.User;

@Service
@Component
public class UserBuilder {

    public UserBuilder() {
    }


    public static UserDTO toUserDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getRole(), user.getStatus());
    }

    public static User toEntity(UserDTO userDTO) {
        return new User(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getEmail(),
                userDTO.getRole(),
                userDTO.getStatus());
    }
}

