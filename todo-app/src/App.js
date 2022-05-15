import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5084/api/Todo")
      .then(res => res.json())
      .then(
        (result) => {
          setTodos(result);
        })
  }, [])

  function sortTodos(status) {
    return todos.filter((todo) => todo.status === status);
  }

  return (
    <Container className="p-2 my-2">
      <Card className="my-2">
        <Card.Body><h1 className="text-center">To-Do App</h1></Card.Body>
      </Card>
      <TodoForm setTodos={setTodos} sortTodos={sortTodos} />
      <Row>
        <Col lg={true}><TodoList name="Todo" todos={todos} setTodos={setTodos} sortTodos={sortTodos} /></Col>
        <Col lg={true}><TodoList name="In Progress" todos={todos} setTodos={setTodos} sortTodos={sortTodos} /></Col>
        <Col lg={true}><TodoList name="Done" todos={todos} setTodos={setTodos} sortTodos={sortTodos} /></Col>
        <Col lg={true}><TodoList name="Inactive" todos={todos} setTodos={setTodos} sortTodos={sortTodos} /></Col>
      </Row>
    </Container>
    );
}

export default App;
