package ps.observer;

import ps.dtos.ObiectiveDTO;

import java.util.ArrayList;
import java.util.List;

public class ObiectiveObserver {
    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

   /* public void notifyObservers(ObiectiveDTO obiectiveDTO) {
        for (Observer observer : observers) {
            observer.update(obiectiveDTO);
        }
    }*/
    public void notifyObservers(ObiectiveDTO obiectiveDTO) {
        observers.forEach(observer -> observer.update(obiectiveDTO));
        System.out.println("New objective");
    }

}





