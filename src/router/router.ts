import SignUpForm from "../components/SignUpForm"
// import LoginForm from "../components/LoginForm"
// import AboutUs from "../pages/AboutUs"
import Home from "../pages/Home/Home.tsx"
// import Create from "../pages/Create"
import Account from '../pages/Account.tsx';
import Assessment from "../pages/Assessment.tsx";
import Post from "../pages/Post"



export const pageRoutes = [
    {path : '' , element : Home, exact : true},
    {path : '/signup' , element : SignUpForm, exact : true},
    {path : '/assessment' , element : Assessment, exact : true},
    // {path : '/login' , element : LoginForm, exact : true},
    // {path : '/about' , element : AboutUs, exact : true},
    // {path : '/create' , element : Create, exact : true},
    {path : '/account/:id' , element : Account, exact : true},
    {path : '/post/:id' , element : Post, exact : true},
]