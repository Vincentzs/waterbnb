import { Link, Outlet,  } from "react-router-dom"


const Layout = () => {
    return <>
        <header>
            <Link to="/">Counter</Link>
            <Link to="/Baseball/88">Baseball</Link>
            <Link to="/calculator">Calculator</Link>
        </header> 
        <Outlet />
    </>
}

export default Layout;