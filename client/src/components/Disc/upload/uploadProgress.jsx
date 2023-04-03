import React from 'react';
import {Card, CardBody, CardHeader, CloseButton} from "reactstrap";
import UploadItem from "./uploadItem";
import {useDispatch, useSelector} from "react-redux";
import {clearUploadFiles, hideUploader} from "../../../reducers/uploadReducer";

const UploadProgress = () => {
    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.upload.isVisible)
    const files = useSelector(state => state.upload.files)

    function visibleUploaderHandler() {
        dispatch(hideUploader())
        dispatch(clearUploadFiles())

    }

    return (
        (isVisible &&
            <div>
                <Card
                    className="my-2"
                    color="light"
                    style={{
                        width: '18rem',
                        position: "absolute",
                        right: "10px",
                        bottom: "10px"
                    }}
                >
                    <CardHeader className="d-flex justify-content-between">
                        <p>Uploading...</p>
                        <CloseButton
                            onClick={() => visibleUploaderHandler()}
                        />
                    </CardHeader>
                    <CardBody>
                        {files.map(file => <UploadItem file={file}/>)}
                    </CardBody>
                </Card>
            </div>
        )

    );
};

export default UploadProgress;