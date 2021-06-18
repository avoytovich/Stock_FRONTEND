export default (name, payload) => {
  switch (name) {
    case "setActiveLink":
      return {
        type: "SET_ACTIVE_LINK",
        payload,
      };
    case "saveUserId":
      return {
        type: "SAVE_USER_ID",
        payload,
      };
    case "errorNotification":
      return {
        type: "ERROR_NOTIFICATION",
        payload,
      };
    case "successNotification":
      return {
        type: "SUCCESS_NOTIFICATION",
        payload,
      };
  }
};
