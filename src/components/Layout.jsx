import { Outlet } from "react-router-dom";
import Nav from './Nav';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <ToastContainer />
        </div>
    );
};

export default Layout;