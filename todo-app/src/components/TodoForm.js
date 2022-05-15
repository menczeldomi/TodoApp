import React, { useRef } from 'react';
import { Button, Card, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoForm({ setTodos, sortTodos }) {
  
  const todoTitleRef = useRef();
  const todoStatusRef = useRef();
  const todoDeadlineRef = useRef();
  const todoDescritionRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const sortedTodos = sortTodos(todoStatusRef.current.value);

    const newTodo = {
      id: null,
      index: sortedTodos.length,
      title: todoTitleRef.current.value,
      status: todoStatusRef.current.value,
      deadline: todoDeadlineRef.current.value,
      description: todoDescritionRef.current.value
    };

    fetch("http://localhost:5084/api/Todo", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        index: newTodo.index,
        title: newTodo.title,
        status: newTodo.status,
        deadline: newTodo.deadline,
        description: newTodo.description
      })
    })
    .then(res => res.json())
    .then((result) => {
      newTodo.id = result.id;
    })

    setTodos(prevTodos => {
      return [...prevTodos, newTodo]
    });

    todoTitleRef.current.value  = null;
    todoStatusRef.current.value  = "Todo";
    todoDeadlineRef.current.value  = null;
    todoDescritionRef.current.value  = null;  
  }

  return (
      <Card>
        <Form onSubmit={handleSubmit} className="form my-2 mx-3">
          <Row>
            <Form.Group as={Col} controlId="formTitle">
              <Form.Label className="my-0">Todo Title</Form.Label>
              <Form.Control required type="text" ref={todoTitleRef} placeholder="Enter the Todo's title" />
            </Form.Group>
            <Form.Group as={Col} controlId="formDeadline">
              <Form.Label className="my-0">Deadline</Form.Label>
              <Form.Control required type="text" ref={todoDeadlineRef} placeholder="Enter the deadline" />
            </Form.Group>
            <Form.Group as={Col} controlId="formStatus">
              <Form.Label className="my-0">Status</Form.Label>
              <Form.Select ref={todoStatusRef} >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="my-2">
            <Form.Group as={Col} controlId="formDescription">
              <Form.Label className="my-0">Description</Form.Label>
              <Form.Control as="textarea" rows={2} ref={todoDescritionRef} placeholder="Description (optional)" />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">Add Todo</Button>
        </Form>
      </Card>
    );
}

export default TodoForm;
