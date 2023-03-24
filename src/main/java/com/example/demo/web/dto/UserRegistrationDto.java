package com.example.demo.web.dto;

public class UserRegistrationDto {
    private String email;
    private String password;

    public UserRegistrationDto(String email, String password, String password2) {
        this.email = email;
        this.password = password;

    }

    public UserRegistrationDto() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
