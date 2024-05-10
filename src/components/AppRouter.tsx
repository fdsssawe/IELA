import {Route , Routes} from 'react-router-dom'
import { pageRoutes } from '../router/router.ts';


const AppRouter = () => {
    return (
        <Routes>
        {pageRoutes.map((routes)=>
            <Route
                key={routes.path}
                element={<routes.element/>}
                path={routes.path}
                >
            </Route>
        )}
    </Routes>
    );
};

export default AppRouter;