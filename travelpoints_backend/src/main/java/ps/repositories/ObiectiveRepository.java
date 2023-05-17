package ps.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ps.entities.Obiective;

import java.util.Optional;

public interface ObiectiveRepository extends JpaRepository<Obiective, Integer> {
    @Query(value = "SELECT p " +
            "FROM Obiective p " +
            "WHERE p.locatie = :locatie ")
    Optional<Obiective> findByLocation(@Param("locatie") String locatie);

    @Query(value = "SELECT p " +
            "FROM Obiective p " +
            "WHERE p.categorie = :categorie ")
    Optional<Obiective> findByCategory(@Param("categorie") String categorie);

}
