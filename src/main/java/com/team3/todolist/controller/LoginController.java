package com.team3.todolist.controller;

import com.team3.todolist.UserService;
import com.team3.todolist.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/login") // 로그인 관련 경로를 그룹화
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    // 로그인 폼 페이지 (GET 요청 처리)
    @GetMapping
    public String showLoginForm() {
        return "login"; // login.html 반환
    }

    @PostMapping("/login")
    public String login(@RequestBody UserEntity userEntity, Model model) {
        // 인증 메소드 호출
        String username = userService.authenticateUser(userEntity.getUserid(), userEntity.getPassword());

        if (username != null) {
            // 인증 성공 시, username을 모델에 추가하고 todolist 페이지로 리디렉션
            model.addAttribute("username", username);
            return "redirect:/todolist"; // 인증 성공 후 todolist 페이지로 리디렉션
        } else {
            // 인증 실패 시, 로그인 페이지로 다시 이동
            return "redirect:/login";
        }
    }
}