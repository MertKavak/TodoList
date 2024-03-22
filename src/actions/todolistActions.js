import {
  TODOLIST_ITEM_ADD,
  TODOLIST_ITEM_DELETE,
  TODOLIST_ITEM_UPTADE,
} from "../constans/todolistConstans";

export const listItem_Add = (id ,title,name, date, gender,cityname,districtName) => (distpatch, getState) => {
  
  distpatch({
    type: TODOLIST_ITEM_ADD,
    payload: {id, title, date,name, gender,cityname,districtName },
  });
  const updatedList = getState().userTodoList.userListItem;
  localStorage.setItem("todolist", JSON.stringify(updatedList));
};

export const listItem_Delete = (id) => (distpatch, getState) => {
  distpatch({
    type: TODOLIST_ITEM_DELETE,
    payload: id,
  });
  const updatedList = getState().userTodoList.userListItem;
  localStorage.setItem("todolist", JSON.stringify(updatedList));
};

export const listItem_Update = (id ,yeniDeger) => (distpatch,getState) => {
  
  distpatch({
    type: TODOLIST_ITEM_UPTADE,
    payload: {id, yeniDeger },
  });
  const updatedList = getState().userTodoList.userListItem;
  localStorage.setItem("todolist", JSON.stringify(updatedList));
};
