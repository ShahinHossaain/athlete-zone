import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import Container from "../../Shared/Container/Container";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Main = () => {
  const { isNight } = useContext(AuthContext);
  return (
    <div className={isNight && `bg-gray-900`}>
      <Navbar></Navbar>

      <Container>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Main;
