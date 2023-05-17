package ps.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ObiectiveDTO extends RepresentationModel<ObiectiveDTO> {
    private int id;
    private String nume_obiectiv;
    private String descriere_text;
    private String descriere_audio;
    private Double pret_intrare;
    private String locatie;
    private String categorie;


    public ObiectiveDTO(String nume_obiectiv, String descriere_text, String descriere_audio, Double pret_intrare, String locatie, String categorie) {
        this.nume_obiectiv = nume_obiectiv;
        this.descriere_text = descriere_text;
        this.descriere_audio = descriere_audio;
        this.pret_intrare = pret_intrare;
        this.locatie = locatie;
        this.categorie = categorie;
    }

    public String getNume_obiectiv() {
        return nume_obiectiv;
    }

    public void setNume_obiectiv(String nume_obiectiv) {
        this.nume_obiectiv = nume_obiectiv;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescriere_text() {
        return descriere_text;
    }

    public void setDescriere_text(String descriere_text) {
        this.descriere_text = descriere_text;
    }

    public String getDescriere_audio() {
        return descriere_audio;
    }

    public void setDescriere_audio(String descriere_audio) {
        this.descriere_audio = descriere_audio;
    }

    public Double getPret_intrare() {
        return pret_intrare;
    }

    public void setPret_intrare(Double pret_intrare) {
        this.pret_intrare = pret_intrare;
    }

    public String getLocatie() {
        return locatie;
    }

    public void setLocatie(String locatie) {
        this.locatie = locatie;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }
}

