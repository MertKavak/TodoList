import {
  TODOLIST_ITEM_ADD,
  TODOLIST_ITEM_DELETE,
  TODOLIST_ITEM_UPTADE,
} from "../constans/todolistConstans";

export const listReducer = (state = { userListItem: [] }, action) => {
  switch (action.type) {
    case TODOLIST_ITEM_ADD:
      return {
        ...state,
        userListItem: [
          ...state.userListItem,
          {
            id: action.payload.id,
            title: action.payload.title,
            name: action.payload.name,
            date: new Date(),
            gender: action.payload.gender,
            cityname: action.payload.cityname,
            districtName: action.payload.districtName,
          },
        ],
      };
    case TODOLIST_ITEM_DELETE:
      const updatedList = [...state.userListItem];
      updatedList.splice(action.payload, 1);
      return { ...state, userListItem: updatedList };
    
      case TODOLIST_ITEM_UPTADE: {
        const { id, yeniDeger } = action.payload;
        return {
          ...state,
          userListItem: state.userListItem.map(item =>
            item.id === id ? { ...item, title:yeniDeger.title , name: yeniDeger.name ,date: new Date(), gender: yeniDeger.gender, cityname: yeniDeger.cityname, districtName: yeniDeger.districtName } : item
          )
        };
      }
    default:
      return state;
  }
};
