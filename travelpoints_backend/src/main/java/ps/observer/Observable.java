package ps.observer;

import ps.dtos.ObiectiveDTO;

public interface Observable {

        void attachObserver(Observer observer);
        void detachObserver(Observer observer);
        void notifyObservers(ObiectiveDTO obiectiveDTO);

}
