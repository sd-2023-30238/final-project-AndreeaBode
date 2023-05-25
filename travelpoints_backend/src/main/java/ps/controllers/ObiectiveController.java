package ps.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ps.dtos.ObiectiveDTO;
import ps.repositories.ObiectiveRepository;
import ps.services.ObiectiveService;
import ps.services.WishService;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/")
public class ObiectiveController {
    private final ObiectiveService obiectiveService;
    private final WishService wishService;
    private final ObiectiveRepository obiectiveRepository;

    @Autowired
    public ObiectiveController(ObiectiveService obiectiveService, ObiectiveRepository obiectiveRepository,WishService wishService) {
        this.obiectiveService = obiectiveService;
        this.obiectiveRepository = obiectiveRepository;
        this.wishService=wishService;
    }

    @GetMapping(value = "/adminboard/objectives")
    public ResponseEntity<List<ObiectiveDTO>> getObiective() {
        List<ObiectiveDTO> dtos = obiectiveService.findObiective();
        for (ObiectiveDTO dto : dtos) {
            Link userLink = linkTo(methodOn(ObiectiveController.class)
                    .getObiectiv(dto.getId())).withRel("obiectiveDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    @GetMapping(value = "/adminboard/objectives/{id}")
    public ResponseEntity<ObiectiveDTO> getObiectiv(@PathVariable("id") int obiectivId) {
        ObiectiveDTO dto = obiectiveService.findObiectivById(obiectivId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //inregistrareObiective
    @PostMapping(value = "/adminboard/objectives")
    public ResponseEntity<Integer> insertProsumer(@Valid @RequestBody ObiectiveDTO obiectiveDTO) {
        int obiectivID = obiectiveService.insert(obiectiveDTO);
        return new ResponseEntity<>(obiectivID, HttpStatus.CREATED);
    }

    //cautare obictive dupa locatie
    @GetMapping(value = "/adminboard/objectives/{locatie}")
    public ResponseEntity<ObiectiveDTO> getObiectivByLocation(@PathVariable("locatie") String locatie) {
        ObiectiveDTO dto = obiectiveService.findObiectivByLocation(locatie);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //cautare obictive dupa categorie
    @GetMapping(value = "/adminboard/objectives/{categorie}")
    public ResponseEntity<ObiectiveDTO> getObiectivByCategory(@PathVariable("categorie") String categorie) {
        ObiectiveDTO dto = obiectiveService.findObiectivByCategory(categorie);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    //modificare detalii obiective
    @PutMapping(value = "/adminboard/objectives/update/{id}")
    public ResponseEntity<ObiectiveDTO> edit(@PathVariable("id") int id, @Valid @RequestBody  ObiectiveDTO obiectiveDTO){
        ObiectiveDTO dto = obiectiveService.updateObiective(id, obiectiveDTO);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }


    //delete
    @DeleteMapping(value = "/adminboard/objectives/delete/{id}")
    public ResponseEntity<Integer> deleteObjective(@PathVariable("id") int obiectiveId) {
        //wishService.delete(wishService.findWishlistById(obiectiveId));
         obiectiveService.delete(obiectiveService.findObiectivById(obiectiveId));
        return new ResponseEntity<>(obiectiveId, HttpStatus.OK);
    }


    //vizualizareDescriereText
 /*   @GetMapping(value = "/adminboard/objectives/text/{id}")
    public ResponseEntity<String> vizualizare(@PathVariable("id") int obiectivId) {
        ObiectiveDTO dto=obiectiveService.vizualizareText(obiectivId);

        return new ResponseEntity<>(dto.getDescriere_text(),HttpStatus.OK);
    }*/


    @GetMapping(value = "/touristboard/objectives")
    public ResponseEntity<List<ObiectiveDTO>> getObiectives() {
        List<ObiectiveDTO> dtos = obiectiveService.findObiective();
        for (ObiectiveDTO dto : dtos) {
            Link userLink = linkTo(methodOn(ObiectiveController.class)
                    .getObiectiv(dto.getId())).withRel("obiectiveDetails");
            dto.add(userLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }


}

