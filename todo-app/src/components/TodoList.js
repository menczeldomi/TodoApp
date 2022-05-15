import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './Todo';

function TodoList({name, todos, setTodos, sortTodos}) {
  const sortedTodos = sortTodos(name);

  function orderByIndex(todos) {
    return todos.sort((a, b) => {
        return a.index - b.index;
      });
  }

  return (
    <Card className="my-2">
      <Card.Header>
        <h5>
          {name} <Badge bg="secondary">{sortedTodos.length}</Badge>
        </h5>
      </Card.Header>
      <Card.Body>
        {orderByIndex(sortedTodos).map((todo) => 
            <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} sortTodos={sortTodos} orderByIndex={orderByIndex} />
          )}
      </Card.Body>
    </Card>
  );
}

export default TodoList;
