import React, { useState } from "react";
import styles from "./Navbar.module.css"; // Import CSS module

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`${styles.navbar} ${isOpen ? styles.responsive : ""}`}>
            <h2 className={styles.title} onClick={() => window.location.reload()}>
                Sorting Visualizer
            </h2>
            <p className={styles.connect}>
                
                <a href="https://github.com/nikunjgupta609" target="_blank" className={styles.link}>
                    <i className="fa fa-github" aria-hidden="true"></i>
                </a>
            </p>
            <button className={styles.icon} onClick={() => setIsOpen(!isOpen)}>
                <i className="fa fa-bars"></i>
            </button>
        </nav>
    );
};

export default Navbar;
