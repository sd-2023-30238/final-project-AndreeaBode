package ps.observer;

import ps.dtos.ObiectiveDTO;

import java.util.ArrayList;
import java.util.List;

public class ObiectiveObserver implements Observer {
    @Override
    public void update(ObiectiveDTO obiectiveDTO) {
        System.out.println("S-a inregistrat un nou obiectiv");
    }
}





