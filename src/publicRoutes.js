import Login from "./Modules/Authentication/Page/Login";
import Signup from "./Modules/Authentication/Page/Signup";

export default {
    SignUp: {
        exact: true,
        path: '/signup',
        component: Signup
    },
    Login: {
        exact: true,
        path: '/',
        component: Login
    }
};
