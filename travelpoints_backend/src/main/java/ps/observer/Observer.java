package ps.observer;

import ps.dtos.ObiectiveDTO;
import ps.entities.Obiective;

public interface Observer {
    void update(ObiectiveDTO obiectiveDTO);
}

