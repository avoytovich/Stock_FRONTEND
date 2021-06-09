const generalReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_USER_ID":
      return {
        ...state,
        userId: action.payload,
      };
    case "ERROR_NOTIFICATION":
      return {
        ...state,
        errorNotification: action.payload,
      };
    case "SUCCESS_NOTIFICATION":
      return {
        ...state,
        successNotification: action.payload,
      };
    default:
      return state;
  }
};

export default generalReducer;
