import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar, Footer } from "../../components";

const Layout = ({darkTheme, handleThemeChange}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
        <Navbar darkTheme={darkTheme} handleThemeChange={handleThemeChange} />
        <main className="flex-grow pt-20">
            <Outlet />
        </main>
        <Footer />
        </>
    )
}

export default Layout;