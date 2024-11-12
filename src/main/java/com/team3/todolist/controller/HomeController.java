package com.team3.todolist.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

    @RequestMapping;
    @ResponseBody;

    @GetMapping(value="/")
    public String home(Model model) {

        model.addAttribute("test", "안녕하세요");

        return "index";
    }

    @GetMapping(value="/todolist")
    public String todolist(Model model) {

        model.addAttribute("test", "안녕하세요");

        return "todolist";
    }

}