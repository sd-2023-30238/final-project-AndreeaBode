package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.web.dto.UserRegistrationDto;

public interface UserService {
    User save(UserRegistrationDto registrationDto);
}
