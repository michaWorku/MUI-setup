import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes, Error } from "./components";
import Home from "./pages/home";
import Program from "./pages/program";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import User from "./pages/user";
import { permissions } from "./data/permissions";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children:[
          {
            path:"private",
            element: <PrivateRoutes redirectPath="/" permission={permissions.map(permission => permission.id)}/>,
            errorElement: <Error />,
            children:[
              {
                path: 'program',
                element: <Program />
              },
              {
                path: 'user',
                element: <User />
              }
            ]
          },
          {
            path:'login',
            element: <Signin/>
          },
          {
            path: 'signup',
            element: <Signup />
          }
        ]
    }
    
  ]);

export default router;