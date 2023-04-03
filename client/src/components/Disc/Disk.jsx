import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {createDir, getFiles, uploadFile} from "../../actions/file";
import {Button} from "reactstrap";
import {BoxArrowInLeft, FolderPlus} from "react-bootstrap-icons";
import styles from "./Disk.module.css"
import FileList from "./fileList/FileList";
import PopupBlock from "../Blocks/Popup/popupBlock";
import {setCurrentDir} from "../../reducers/fileReducer";
import UploadFiles from "./upload/upload";
import DragAndDrop from "./dragAndDrop/dragAndDrop";
import FreeSpaceInfo from "./freeSpaceInfo/freeSpaceInfo";
import convertSize from "../../services/convertSize";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const totalSpace = convertSize(useSelector(state => state.user.diskSpace))
    const freeSpace = convertSize(useSelector(state => state.user.diskSpace - state.user.usedSpace))

    const [showModal, setShowModal] = useState(false);
    const [dragEnter, setDragEnter] = useState(false);

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, [currentDir])

    function createDirHandler(name) {
        dispatch(createDir(currentDir, name))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)

    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)

    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }


    return (!dragEnter ?
            <div className={styles.wrapper}
                 onDragEnter={dragEnterHandler}
                 onDragLeave={dragLeaveHandler}
                 onDragOver={dragEnterHandler}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <Button
                            disabled={dirStack.length === 0}        // check Back button available
                            onClick={() => backClickHandler()}
                            color="light">
                            <BoxArrowInLeft size={35} className="me-2"/>
                            Back
                        </Button>
                        <Button
                            color="light"
                            onClick={() => setShowModal(true)}
                        >
                            <FolderPlus size={35} className="me-2"/>
                            Create new folder
                        </Button>
                        <UploadFiles/>
                    </div>
                    <div>
                        <Button color="light">
                            <FreeSpaceInfo total={totalSpace} free={freeSpace}/>
                        </Button>
                    </div>
                </div>
                <FileList/>
                {showModal && <PopupBlock
                    createDirHandler={createDirHandler}
                    toggle={() => setShowModal(false)}
                    modal={showModal}
                />}
            </div>
            :
            <div
                onDrop={dropHandler}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}>
                <DragAndDrop/>
            </div>

    );
};

export default Disk;
