import React from "react";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";
import "./index.css"; // Import global styles

const App: React.FC = () => {
    return (
        <div className="app-container">
            <Navbar />
            <SortingVisualizer />
        </div>
    );
};

export default App;
