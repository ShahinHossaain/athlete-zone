import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import Container from "../../Shared/Container/Container";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Main;
