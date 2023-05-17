package ps.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ps.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    List<User> findByUsername(String username);

    @Query(value = "SELECT p " +
            "FROM User p " +
            "WHERE p.username = :username ")
    Optional<User> findUserByUsername(@Param("username") String username);

    User findByEmail(String email);
}
