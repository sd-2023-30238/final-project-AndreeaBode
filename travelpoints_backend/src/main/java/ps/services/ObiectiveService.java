package ps.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import ps.observer.ObiectiveObserver;
import ps.observer.Observable;
import ps.observer.Observer;
import ps.dtos.ObiectiveDTO;
import ps.dtos.builders.ObiectiveBuilder;
import ps.entities.Obiective;
import ps.entities.User;
import ps.repositories.ObiectiveRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ObiectiveService implements Observable {
    private static final Logger LOGGER = LoggerFactory.getLogger(ObiectiveService.class);
    private final ObiectiveRepository obiectiveRepository;
    private ObiectiveObserver obiectiveObserver;
    private List<Observer> observers = new ArrayList<>();

    @Autowired
    public ObiectiveService(ObiectiveRepository obiectiveRepository) {
        this.obiectiveRepository = obiectiveRepository;
    }

    public void attachObserver(Observer observer) {
        observers.add(observer);
    }

    public void detachObserver(Observer observer) {
        observers.remove(observer);
    }


    public List<ObiectiveDTO> findObiective() {
        List<Obiective> obiectiveList = obiectiveRepository.findAll();
        return obiectiveList.stream()
                .map(ObiectiveBuilder::toObiectiveDTO)
                .collect(Collectors.toList());
    }

    public ObiectiveDTO findObiectivById(int id) {
        Optional<Obiective> obiectiveOptional = obiectiveRepository.findById(id);
        if (!obiectiveOptional.isPresent()) {
            LOGGER.error("Obiectiv with id {} was not found in db", id);
            throw new ResourceNotFoundException(User.class.getSimpleName() + " with id: " + id);
        }
        return ObiectiveBuilder.toObiectiveDTO(obiectiveOptional.get());
    }

    public int insert(ObiectiveDTO obiectiveDTO) {
        Obiective obiective = ObiectiveBuilder.toEntity(obiectiveDTO);
        obiective = obiectiveRepository.save(obiective);
        LOGGER.debug("Obiectiv with id {} was inserted in db", obiective.getId());
        obiectiveObserver.notifyObservers(obiectiveDTO);
        return obiective.getId();
    }

    public ObiectiveDTO findObiectivByLocation(String locatie) {
        Optional<Obiective> obiectiveOptional = obiectiveRepository.findByLocation(locatie);
        if (!obiectiveOptional.isPresent()) {
            LOGGER.error("Obiectiv from location {} was not found in db", locatie);
            throw new ResourceNotFoundException("Obiectiv from location " + locatie + " was not found!");
        }
        return ObiectiveBuilder.toObiectiveDTO(obiectiveOptional.get());
    }

    public ObiectiveDTO findObiectivByCategory(String categorie) {
        Optional<Obiective> obiectiveOptional = obiectiveRepository.findByCategory(categorie);
        if (!obiectiveOptional.isPresent()) {
            LOGGER.error("Obiectiv with name {} was not found in db", categorie);
            throw new ResourceNotFoundException("Obiectiv with name " + categorie + " was not found!");
        }
        return ObiectiveBuilder.toObiectiveDTO(obiectiveOptional.get());
    }

    public ObiectiveDTO vizualizareText(int id) {
        Optional<Obiective> obiectiveOptional = obiectiveRepository.findById(id);
        if (!obiectiveOptional.isPresent()) {
            LOGGER.error("Obiectiv with id {} was not found in db", id);
            throw new ResourceNotFoundException("Obiectiv with id " + id + " was not found!");
        }
        return ObiectiveBuilder.toObiectiveDTO(obiectiveOptional.get());
    }

    public int delete(ObiectiveDTO obiectiveDTO) {
        obiectiveRepository.deleteById(obiectiveDTO.getId());
        LOGGER.debug("Obiectiv with id {} was deleted in db", obiectiveDTO.getId());
        return obiectiveDTO.getId();
    }

    public ObiectiveDTO updateObiective(int id, ObiectiveDTO obiectiveDTO) {
        Optional<Obiective> obiectiveOptional = obiectiveRepository.findById(id);
        if (!obiectiveOptional.isPresent()) {
            LOGGER.error("Obiectiv with id {} was not found in db", id);
            throw new ResourceNotFoundException("Obiectiv with id " + id + " was not found!");
        }

        Obiective obiective = obiectiveOptional.get();
        obiective.setNume_obiectiv(obiectiveDTO.getNume_obiectiv());
        obiective.setDescriere_text(obiectiveDTO.getDescriere_text());
        obiective.setPret_intrare(obiectiveDTO.getPret_intrare());
        obiective.setLocatie(obiectiveDTO.getLocatie());
        obiective.setCategorie(obiectiveDTO.getCategorie());

        obiectiveRepository.save(obiective);

        return ObiectiveBuilder.toObiectiveDTO(obiective);
    }

    @Override
    public void addObserver(Observer observer) {
        attachObserver(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        detachObserver(observer);
    }
}
