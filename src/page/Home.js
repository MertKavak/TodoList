import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { listItem_Delete } from "../actions/todolistActions";
import { Link } from "react-router-dom";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";

function Home() {
  const distpatch = useDispatch();
  const userListItem = useSelector((state) => state.userTodoList.userListItem);

  const deleteTodo = (index) => {
    distpatch(listItem_Delete(index));
  };

  return (
    <>
      <div className="todo-card" style={{ width: "100rem" }}>
        <Box>
          <Text mb="1rem" fontWeight="bold" textAlign="center" fontSize="3rem">
            Görevler
          </Text>
          {userListItem.map((todo, index) => {
            return (
              <div className="list-item" key={index}>
                {todo.gender === "male" ? <FaMale style={{fontSize:"3rem"}} /> : <FaFemale style={{fontSize:"3rem"}} />}
                <div style={{ flex: "0.9" }}>
                  <Link to={`/todoDetail/${todo.id}`} key={index}>
                    <Text fontSize="2rem" color="#b1b1b3">
                      {todo.title}
                    </Text>
                  </Link>

                  <Text fontSize="1.2rem" color="#b1b1b3">
                    {new Date(todo.date).toLocaleDateString("tr-TR")}
                  </Text>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MdDeleteForever
                    className="icon"
                    onClick={() => deleteTodo(index)}
                  />
                </div>
              </div>
            );
          })}
        </Box>
      </div>
    </>
  );
}

export default Home;
