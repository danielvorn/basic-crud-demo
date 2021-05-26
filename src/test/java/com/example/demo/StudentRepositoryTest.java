package com.example.demo;

import com.example.demo.student.Gender;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
public class StudentRepositoryTest {

    @Autowired
    StudentRepository studentRepository;

    @Test
    void shouldReturnTrueIfStudentEmailExists() {
        //given
        String email = "tomomi@gmail.com";
        Student student = new Student("tomomi", email, Gender.FEMALE);
        //when
        studentRepository.save(student);
        boolean expected = studentRepository.emailExists(email);
        //then
        assertThat(expected).isTrue();
    }

    @Test
    void shouldReturnFalseIfStudentEmailDoesNotExist() {
        //given
        String email = "shino@gmail.com";
        Student student = new Student("tomomi", "tomomi@gmail.com", Gender.FEMALE);
        //when
        studentRepository.save(student);
        boolean expected = studentRepository.emailExists(email);
        //then
        assertThat(expected).isFalse();
    }
}
