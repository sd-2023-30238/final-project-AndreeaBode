package ps.dtos.builders;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ps.dtos.ObiectiveDTO;
import ps.entities.Obiective;

@Service
@Component
public class ObiectiveBuilder {

    public ObiectiveBuilder() {
    }


    public static ObiectiveDTO toObiectiveDTO(Obiective obiective) {
        return new ObiectiveDTO(obiective.getId(),obiective.getNume_obiectiv(), obiective.getDescriere_text(),obiective.getPret_intrare(),obiective.getLocatie(),obiective.getCategorie());
    }

    public static Obiective toEntity(ObiectiveDTO obiectiveDTO) {
        return new Obiective(
                obiectiveDTO.getNume_obiectiv(),
                obiectiveDTO.getDescriere_text(),
                obiectiveDTO.getPret_intrare(),
                obiectiveDTO.getLocatie(),
                obiectiveDTO.getCategorie());
    }
}
