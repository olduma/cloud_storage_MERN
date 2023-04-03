import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input

} from 'reactstrap';
import {isFolderNameValid} from "../../../services/fileNameValidation";

function PopupBlock({toggle, modal, createDirHandler, centered}) {
    const [folderName, setFolderName] = useState('');

    const handleFolderNameChange = (event) => {
        if (isFolderNameValid(event.target.value)) {
            setFolderName(event.target.value);
        }
    };

    const handleSubmit = () => {
            createDirHandler(folderName);
        toggle();
    };

    return (
        <div>
            <Modal  isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Folder</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Enter folder name"
                        value={folderName}
                        onChange={handleFolderNameChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={handleSubmit}>
                        Create Folder
                    </Button>{' '}
                    <Button color="danger" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default PopupBlock;
