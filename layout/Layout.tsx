import { useState } from "react"
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<any>(false)

	const toggle = () => {
		setIsOpen(!isOpen);
	}


  return ( 
    <>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {children}
      <Footer />
    </>
   );
}
 
export default Layout;