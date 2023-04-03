import React, { useRef } from 'react';
import {Button, Label} from "reactstrap";
import styles from "./upload.module.css"
import { Upload } from "react-bootstrap-icons";
import {uploadFile} from "../../../actions/file";
import {useDispatch, useSelector} from "react-redux";

const UploadButton = () => {
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    };

    return (
        <>
            <Button color="success" onClick={handleClick}>
                <Upload size={30} className="me-2"/>
                Upload files...
                <input
                    ref={fileInputRef}
                    className={styles.input}
                    type="file"
                    onChange={handleFileChange}
                    multiple
                />
            </Button>
            <Label className={styles.label} htmlFor={fileInputRef.current?.id} />
        </>
    );
};

export default UploadButton;
