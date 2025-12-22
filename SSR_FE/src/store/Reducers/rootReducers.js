const initialState = {
  user: [
    { id: 1, name: "Initial State" },
    { id: 2, name: "Initial Linh" },
  ],
  posts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_USER":
      return {
        ...state,
        user: state.user.filter((item) => item.id !== action.payload.id),
      };

    case "ADD_USER":
      let id = Math.floor(Math.random() * 1000);
      let newUser = { id, name: `random-${id}` };

      return {
        ...state,
        user: [...state.user, newUser],
      };

    default:
      return state;
  }
};

export default rootReducer;
