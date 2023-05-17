package ps.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.entities.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
}
