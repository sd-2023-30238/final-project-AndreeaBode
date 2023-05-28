package ps.observer;

import ps.dtos.ObiectiveDTO;

public interface Observable {

        void notifyObservers(ObiectiveDTO obiectiveDTO);

}
