import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Headerr() {
  const userListItem = useSelector((state) => state.userTodoList.userListItem);

  return (
    <div className="navbar">
      <Link to="/">
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            fontStyle: "italic",
            color: "white",
          }}
        >
          TODO LİST
      {userListItem.length > 0 && (
        <span className="badge">-{userListItem.length}-</span>
      )}
        </h2>
      </Link>

      <Link
        style={{ marginRight: "2rem", color: "white", textDecoration: "none" }}
        to="/card"
      >
        Yeni görev Ekle
      </Link>
    </div>
  );
}

export default Headerr;
