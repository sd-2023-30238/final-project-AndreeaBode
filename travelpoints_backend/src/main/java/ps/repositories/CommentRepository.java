package ps.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.entities.Comentariu;

public interface CommentRepository extends JpaRepository<Comentariu, Integer> {


}
