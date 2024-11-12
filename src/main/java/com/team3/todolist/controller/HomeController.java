package com.team3.todolist.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;

@Controller
public class HomeController {

    @GetMapping(value="/")
    public String home(Model model) {

        model.addAttribute("test", "안녕하세요");

        return "index";
    }

}