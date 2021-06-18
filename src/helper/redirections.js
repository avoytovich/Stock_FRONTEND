//import history from './history';

const isAuth = () => !!JSON.parse(localStorage.getItem("token"));

export default isAuth;
