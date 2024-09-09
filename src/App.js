import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import { Route, Routes } from "react-router-dom";
import EditUser from "./components/User/EditUser";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import ShowCharts from "./components/chart/charts";

function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/show-user" element={<ShowUser />} />
            <Route path="/show-charts" element={<ShowCharts />} />
          </Routes>

        </div>
      </header>
    </div>
  );
}

export default App;
