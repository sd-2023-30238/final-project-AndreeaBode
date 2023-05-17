package ps.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ps.dtos.WishlistDTO;
import ps.services.WishService;

import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/")
public class WishController {
    private final WishService wishService;



    @Autowired
    public WishController( WishService wishService) {
        this.wishService = wishService;

    }

    @GetMapping(value = "/touristboard/wishlist")
    public ResponseEntity<List<WishlistDTO>> getWishlists() {
        List<WishlistDTO> dtos =  wishService.findWishlist();
        for (WishlistDTO dto : dtos) {
            Link userLink = linkTo(methodOn(WishController.class)
                    .getWishlist(dto.getId())).withRel("userDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    @GetMapping(value = "/touristboard/wishlist/{id}")
    public ResponseEntity<WishlistDTO> getWishlist(@PathVariable("id") int wishId) {
        WishlistDTO dto =  wishService.findWishlistById(wishId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }


}

