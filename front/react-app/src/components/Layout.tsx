import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({children}) =>{
   
    return(
        <>
            <Navbar/>
            <main className="content">{children}</main>
            <Footer/>
        </>
    )
}

export default Layout;