package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        String studentEmail = student.getEmail();
        Boolean existsEmail = studentRepository.emailExists(studentEmail);
        if (existsEmail) {
            throw new BadRequestException("Email " + studentEmail + "taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        // check if student exists
        studentRepository.deleteById(studentId);
    }
}
