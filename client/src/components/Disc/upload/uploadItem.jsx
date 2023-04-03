import React from 'react';
import {CardTitle, CloseButton, Progress} from "reactstrap";
import {useDispatch} from "react-redux";
import {removeUploadFile} from "../../../reducers/uploadReducer";
import convertSize from "../../../services/convertSize";

const UploadItem = ({file}) => {
    const dispatch = useDispatch()

    function closeItem() {
        dispatch(removeUploadFile(file.id))
    }

    return (
        <>
            <div>
                <div className="d-flex justify-content-between">
                    <CardTitle tag="h6">
                        {`${file.name} (${convertSize(file.size)})`}
                    </CardTitle>
                    <CloseButton
                    onClick={() => closeItem()}
                    />
                </div>
                <Progress
                    className="my-2"
                    value={file.progress}
                >
                    {file.progress} %
                </Progress>
            </div>
        </>
    );
};

export default UploadItem;