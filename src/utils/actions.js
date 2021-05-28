export default (name, payload) => {
  switch (name) {
  case 'saveUserId':
    return {
      type: 'SAVE_USER_ID',
      payload,
    }
  }
}
