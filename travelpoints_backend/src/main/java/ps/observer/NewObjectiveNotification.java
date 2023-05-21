package ps.observer;

import org.springframework.stereotype.Service;
import ps.dtos.ObiectiveDTO;

@Service
public class NewObjectiveNotification implements Observer {
    @Override
    public void update(ObiectiveDTO obiectiveDTO) {
        System.out.println("A new objective has been added: " + obiectiveDTO.getNume_obiectiv());

    }
}

