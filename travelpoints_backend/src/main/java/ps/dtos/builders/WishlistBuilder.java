package ps.dtos.builders;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ps.dtos.WishlistDTO;
import ps.entities.Wishlist;
import ps.repositories.ObiectiveRepository;
import ps.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;

@Service
@Component
public class WishlistBuilder {
    private static
    UserRepository userRepository;
    private static
    ObiectiveRepository obiectiveRepository;

    public WishlistBuilder(UserRepository userRepository, ObiectiveRepository obiectiveRepository){
        this.obiectiveRepository= obiectiveRepository;
        this.userRepository= userRepository;
    }
    public static WishlistDTO toWishlistDTO(Wishlist wishlist) {
        return new WishlistDTO(wishlist.getId(),wishlist.getUtilizator().getId(),wishlist.getObiective().getId());
    }

/*    public static Wishlist toEntity(WishlistDTO wishlistDTO) {
        return new Wishlist(wishlistDTO.getId(),
                obiectiveRepository.findById(wishlistDTO.getId_obiectiv()).orElseThrow(()-> new DeviceNotFound(wishlistDTO.getId_obiectiv())),
                userRepository.findById(wishlistDTO.getId_user()).orElseThrow(()-> new DeviceNotFound(wishlistDTO.getId_user())));

    }*/
    public static Wishlist toEntity(WishlistDTO wishlistDTO) {
        return new Wishlist(wishlistDTO.getId(),
                obiectiveRepository.findById(wishlistDTO.getId_obiectiv())
                        .orElseThrow(() -> new EntityNotFoundException("Obiectiv not found with ID: " + wishlistDTO.getId_obiectiv())),
                userRepository.findById(wishlistDTO.getId_user())
                        .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + wishlistDTO.getId_user())));
    }
}

