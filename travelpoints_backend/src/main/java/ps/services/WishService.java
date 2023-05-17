package ps.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import ps.dtos.ObiectiveDTO;
import ps.dtos.UserDTO;
import ps.dtos.WishlistDTO;
import ps.dtos.builders.ObiectiveBuilder;
import ps.dtos.builders.WishlistBuilder;
import ps.entities.Obiective;
import ps.entities.User;
import ps.entities.Wishlist;
import ps.repositories.WishlistRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WishService {
    private static final Logger LOGGER = LoggerFactory.getLogger(WishService.class);
    private final WishlistRepository wishRepository;
    private final ObiectiveService obiectiveService;

    @Autowired

    public WishService(WishlistRepository wishRepository, ObiectiveService obiectiveService) {
        this.wishRepository = wishRepository;
        this.obiectiveService = obiectiveService;

    }

    public List<WishlistDTO> findWishlist() {
        List<Wishlist> obiectiveList = wishRepository.findAll();
        return obiectiveList.stream()
                .map(WishlistBuilder::toWishlistDTO)
                .collect(Collectors.toList());
    }

    public WishlistDTO findWishlistById(int id) {
        Optional<Wishlist> prosumerOptional = wishRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Wishlist with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }
        return WishlistBuilder.toWishlistDTO(prosumerOptional.get());
    }
    public int delete(WishlistDTO wishlistDTO) {
        wishRepository.deleteById(wishlistDTO.getId());
        LOGGER.debug("Wish with id {} was deleted in db", wishlistDTO.getId());
        return wishlistDTO.getId();
    }

    public boolean getObjectiveWish(int userId, int obId) {
        List<WishlistDTO> wishes = findWishlist();
        if (wishes.isEmpty()) {
            return true;
        }

        for (WishlistDTO w : wishes) {
            System.out.println("wishlist" + w.getId());
        }

        List<Obiective> obiective = new ArrayList<>();
        for (WishlistDTO w : wishes) {
            System.out.println("aaaa");
            Wishlist wish = WishlistBuilder.toEntity(w);
            System.out.println("bbbb " + wish.getUtilizator().getId());
            System.out.println(userId);

            if (wish.getUtilizator().getId() == userId) {
                System.out.println("ccc");
                obiective.add(wish.getObiective());
            }
        }
        for (Obiective o : obiective) {
            System.out.println("obiective" + o.getNume_obiectiv() + o.getDescriere_text() + o.getCategorie());
        }
        System.out.println("ddd");
        ObiectiveDTO dto = obiectiveService.findObiectivById(obId);

        System.out.println("eee " + dto.getId());

        Obiective obiectiv = ObiectiveBuilder.toEntity(dto);

        for(Obiective o: obiective){
            if (obiectiv.getNume_obiectiv().equals(o.getNume_obiectiv()))
            {
                obiectiv.setId(o.getId());
            }
        }

        System.out.println("fff " + obiectiv.getNume_obiectiv() + obiectiv.getDescriere_text() + obiectiv.getCategorie());
        System.out.println(obiective.contains(obiectiv));

        for (Obiective obiective1: obiective) {
            if (obiective1.getNume_obiectiv().equals(obiectiv.getNume_obiectiv())) {
                System.out.println("contains");
                return false;
            }
        }


        return true;


    }

    public int insertWishlist(WishlistDTO wishlistDTO, UserDTO user, ObiectiveDTO ob) {
        wishlistDTO.setId_user(user.getId());
        wishlistDTO.setId_obiectiv(ob.getId());
        Wishlist wishlist = WishlistBuilder.toEntity(wishlistDTO);
        wishlist = wishRepository.save(wishlist);

        return wishlist.getId();
    }


    public List<Obiective>  getWishlistByUserId(int userId) {
        List<WishlistDTO> wishes = findWishlist();

        List<Obiective> obiective = new ArrayList<>();
        for (WishlistDTO w : wishes) {

            Wishlist wish = WishlistBuilder.toEntity(w);


            if (wish.getUtilizator().getId() == userId) {

                obiective.add(wish.getObiective());
            }
        }


        return obiective;

    }
}


