import {BrowserRouter as Routers,Route,Routes} from "react-router-dom";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import { Team } from "../Pages/Team";
import { Nav } from "../Components/Header&Footer";
export default function Navegation() {
  return (
    <>
      <Routers>
        <Nav/>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/contact" element={<Contact/>} />
            <Route exact path="/team" element={<Team/>} />
        </Routes>
      </Routers>
    </>
  )
}

