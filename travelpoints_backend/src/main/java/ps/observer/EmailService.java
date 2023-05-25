package ps.observer;

import org.springframework.stereotype.Service;
import ps.dtos.ObiectiveDTO;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    private Properties properties;
    private static EmailService emailSender;

    private EmailService() {
        properties = new Properties();
        properties.setProperty("mail.smtp.host", "localhost");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.port", "1025");
        properties.setProperty("mail.smtp.starttls.enable", "true");
    }

    public static EmailService getEmailInstance() {
        if (emailSender == null) {
            emailSender = new EmailService();
        }
        return emailSender;
    }

    public void sendEmail(String recipientEmail, ObiectiveDTO obiectiveDTO) {
        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("hello", "hello");
            }
        });

        try {
            // Creare mesaj de e-mail
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("admin@yahoo.com"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
            message.setSubject("New objective");
            message.setText("A new objective has been added. Come to our website to see what it's about.:)");


            Transport.send(message);
            System.out.println("E-mail trimis către " + recipientEmail);
        } catch (MessagingException e) {
            System.out.println("Eroare la trimiterea e-mailului către " + recipientEmail);
            e.printStackTrace();
        }
    }
}


