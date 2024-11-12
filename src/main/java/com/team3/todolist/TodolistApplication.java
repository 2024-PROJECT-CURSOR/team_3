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

	@PostConstruct
	public void initData() {
		ToDoEntity todo1 = new ToDoEntity();
		todo1.setTitle("똥싸기");
		todo1.setDescription(Boolean.TRUE);
		toDoRepository.save(todo1);

		ToDoEntity todo2 = new ToDoEntity();
		todo2.setTitle("밥먹기");
		todo2.setDescription(Boolean.FALSE);
		toDoRepository.save(todo2);
	}
}
