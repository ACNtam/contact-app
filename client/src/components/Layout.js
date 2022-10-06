import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="layout">
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>contacts</Link>
                    </li>

                    <li>
                        <Link to={"/add"}>Add</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;