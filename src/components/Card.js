import React, { useEffect, useState } from "react";
import { Box, Button, Container, Input, Text } from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

function TodoList() {
  const [todoTask, setTodoTask] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const HandleAddTodo = (e) => {
    e.preventDefault();
    if (newTitle !== "") {
      const updatedTodo = [...todoTask, { title: newTitle }];
      setTodoTask(updatedTodo);
      
      localStorage.setItem("todolist", JSON.stringify(updatedTodo));
      setNewTitle("");
    }
  };

  const deleteTodo = (index) => {
    const decreaseTodo = [...todoTask];
    decreaseTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(decreaseTodo));
    setTodoTask(decreaseTodo);
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodoTask(savedTodo);
    }
  }, []);

  return (
    <Container className="todo-card">
      <h1>Yapılacaklar Listesi</h1>
      <form onSubmit={HandleAddTodo}>
        <Box className="todo-input">
          <Text mb="1rem" fontWeight="bold">
            Görevler
          </Text>
          <Box style={{ display: "flex" }}>
            <Input
              padding="1.5rem"
              fontSize="1.5rem"
              w="100%"
              mr={2}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Yapılacakları buraya girin..."
            />
            <Button
              type="submit"
              colorScheme="blue"
              p="1.6rem"
              w="6rem"
              fontSize="1.5rem"
            >
              Ekle
            </Button>
          </Box>
        </Box>
      </form>
      <Box>
        {todoTask.map((todo, index) => {
          return (
            <div className="list-item" key={index}>
              <div>
                <Text fontSize="2rem" color="#b1b1b3">
                  {todo.title}
                </Text>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <MdDeleteForever
                  className="icon"
                  onClick={() => deleteTodo(index)}
                />
                <BsCheckLg className="check-icon" />
              </div>
            </div>
          );
        })}
      </Box>
    </Container>
  );
}

export default TodoList;
