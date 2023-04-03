import React from 'react';
import styles from "./dragAndDrop.module.css"
import {CloudUpload} from "react-bootstrap-icons";

const DragAndDrop = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <CloudUpload size={60} className={styles.icon}/>
                <h1 className={styles.title}>Drag and Drop files here...</h1>
            </div>
        </div>
    );
};

export default DragAndDrop;