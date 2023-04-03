import React from 'react';
import {Database} from "react-bootstrap-icons";

const FreeSpaceInfo = ({total, free}) => {

    return (
        <div>
            <div className="d-flex align-items-center">
                <Database size={30} className="me-2"/>
                <span>
                    <strong>total:</strong> {total} /
                    <strong> free:</strong> {free}
                </span>
            </div>
        </div>
    );
};

export default FreeSpaceInfo;