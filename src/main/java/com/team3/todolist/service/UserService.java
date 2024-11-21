package com.team3.todolist.service;

import com.team3.todolist.entity.UserEntity;
import com.team3.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity login(String userid, String password) {
        return userRepository.findByUserid(userid)
                .filter(user -> user.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid userid or password"));
    }
}
