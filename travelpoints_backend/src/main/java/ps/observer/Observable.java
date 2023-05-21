package ps.observer;

public interface Observable {
    void addObserver(Observer observer);
    void removeObserver(Observer observer);
}
