package com.team3.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 사용자 인증 메소드 (userid와 password를 동시에 확인) - username 반환
    public String authenticateUser(String userid, String password) {
        // userid로 사용자 조회
        UserEntity user = userRepository.findByUserid(userid)
                .orElse(null);  // Optional 처리

        // 사용자 존재 여부 및 비밀번호 비교
        if (user != null && user.getPassword().equals(password)) {
            return user.getUsername(); // 인증 성공 시 username 반환
        } else {
            return null; // 인증 실패 시 null 반환
        }
    }
}