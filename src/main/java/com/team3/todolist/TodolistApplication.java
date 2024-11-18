package com.team3.todolist;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodolistApplication {

	@Autowired
	private ToDoRepository toDoRepository;

	public static void main(String[] args) {
		SpringApplication.run(TodolistApplication.class, args);
	}
}
