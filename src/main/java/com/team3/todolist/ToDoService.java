package com.team3.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    // 할 일 목록을 가져오는 메소드
    public List<ToDoEntity> getList() {
        return this.toDoRepository.findAll();
    }

    // 할 일을 추가하는 메소드
    public ToDoEntity insertdata(ToDoEntity toDoEntity) {
        return this.toDoRepository.save(toDoEntity);
    }

    // 할 일을 수정하는 메소드
    public ToDoEntity updateData(long id, ToDoEntity updatedToDo) {
        Optional<ToDoEntity> existingToDo = toDoRepository.findById(id);
        if (existingToDo.isPresent()) {
            ToDoEntity toDoEntity = existingToDo.get();
            toDoEntity.setTitle(updatedToDo.getTitle());
            toDoEntity.setDescription(updatedToDo.getDescription());
            return toDoRepository.save(toDoEntity);
        } else {
            throw new IllegalArgumentException("ToDo with ID " + id + " not found.");
        }
    }

    // 할 일을 삭제하는 메소드
    public void deleteData(long id) {
        Optional<ToDoEntity> existingToDo = toDoRepository.findById(id);
        if (existingToDo.isPresent()) {
            toDoRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("ToDo with ID " + id + " not found.");
        }
    }
}
