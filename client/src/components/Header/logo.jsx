import React from 'react';
import { Navbar } from "reactstrap";
import { CloudArrowUp } from "react-bootstrap-icons";
import styles from "./logo.module.css"

function Logo() {
    return (
        <Navbar className="my-2 " color="dark" dark>
            <div className="d-flex align-items-center justify-content-center">
                <CloudArrowUp size={40} className={styles.logoText}/>
                <span className={styles.logoText}>Cloud Disc</span>
            </div>
        </Navbar>
    );
}

export default Logo;
