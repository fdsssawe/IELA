import SignUpForm from "../components/SignUpForm"
import About from "../pages/About"
import Home from "../pages/Home"
import Account from '../pages/Account.tsx';
import Assessment from "../pages/Assessment.tsx";
import Post from "../pages/Post"



export const pageRoutes = [
    {path : '' , element : Home, exact : true},
    {path : '/signup' , element : SignUpForm, exact : true},
    {path : '/assessment' , element : Assessment, exact : true},
    {path : '/about' , element : About, exact : true},
    {path : '/account/:id' , element : Account, exact : true},
    {path : '/post/:id' , element : Post, exact : true},
]