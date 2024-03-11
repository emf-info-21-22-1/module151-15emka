import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProjectHome from "./ProjectHome";
import Project from "./Project";

function App() {
    return (
        <BrowserRouter basename="/151/client">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/ProjectHome" element={<ProjectHome />}/>
                <Route path="/Project/:id" element={<Project/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
