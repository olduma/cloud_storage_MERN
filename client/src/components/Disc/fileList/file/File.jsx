import React from 'react';
import { Download, Trash3 } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { pushToState, setCurrentDir } from "../../../../reducers/fileReducer";
import styles from "./File.module.css";
import { Button } from "reactstrap";
import { deleteFile, downloadFile } from "../../../../actions/file";
import ConvertSize from "../../../../services/convertSize";
import getFileIcon from "../../../../services/fileTypesIcons/FileIcon";

const File = ({ file, index }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector((state) => state.files.currentDir);
    const icon = getFileIcon(file.type);

    const type = file.type === "dir" ? "" : file.type;

    const date = file.date.slice(0, 10);

    function openDirHandler() {
        dispatch(pushToState(currentDir));
        dispatch(setCurrentDir(file._id));
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    return (
        <tr
            onClick={file.type === "dir" ? () => openDirHandler() : null}
            className={styles.wrapper}
        >
            <th className="text-center" scope="row">{index}</th>
            <td>
                <div className={styles.itemContent}>
                    <div className={styles.itemName}>
                        {icon}
                        {file.name}
                    </div>
                    <div className={styles.buttonsBlock}>
                        {file.type !== "dir" && (
                            <Button
                                onClick={(e) => downloadClickHandler(e)}
                                color="light"
                                className="me-1"
                            >
                                <Download size={15} />
                            </Button>
                        )}
                        <Button
                            onClick={(e) => deleteClickHandler(e)}
                            color="danger"
                        >
                            <Trash3 size={15} />
                        </Button>
                    </div>
                </div>
            </td>
            <td>{date}</td>
            <td>{ConvertSize(file.size)}</td>
            <td>{type}</td>
        </tr>
    );
};

export default File;
