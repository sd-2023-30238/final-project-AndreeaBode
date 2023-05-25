package ps.observer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ps.dtos.ObiectiveDTO;
import ps.observer.Observer;

@Service
public class NewObjectiveNotification implements Observer {
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NewObjectiveNotification(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void update(ObiectiveDTO obiectiveDTO) {
        String message = "A new objective has been added: " + obiectiveDTO.getNume_obiectiv();
        messagingTemplate.convertAndSend("/topic/new-objective", message);
    }
}

