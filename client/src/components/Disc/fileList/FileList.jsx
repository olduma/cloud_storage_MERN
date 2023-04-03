import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import File from "./file/File";
import { useSelector } from "react-redux";
import "./FileList.css";
import sortFiles from "../../../services/sortFiles";
import SpinnerBlock from "../../Blocks/Spinner/Spinner";
import { ArrowDownUp } from "react-bootstrap-icons";

const FileList = () => {
    const [sort, setSort] = useState("name");
    const [sortDirection, setSortDirection] = useState(true);
    const files = useSelector((state) => state.files.files);
    const loader = useSelector((state) => state.loader.loader);

    useEffect(() => {
        sortFiles(files, sort, sortDirection);
    }, [sort, files, sortDirection]);

    function sortHandler(sortBy) {
        setSort(sortBy);
        setSortDirection(!sortDirection);
    }

    if (files.length === 0) {
        return <div className="text-center mt-5">NO FILES HERE!</div>;
    }

    return (
        <>
            {loader ? (
                <SpinnerBlock />
            ) : (
                <Table hover className="mt-3">
                    <thead>
                    <tr>
                        <th className="text-center" style={{ width: "10%" }}>
                            #
                        </th>
                        <th
                            style={{ width: "60%" }}
                            onClick={() => sortHandler("name")}
                        >
                            Name
                            <ArrowDownUp
                                className="m-2"
                                size={15}
                                style={{ visibility: sort === "name" ? "visible" : "hidden" }}
                            />
                        </th>
                        <th
                            style={{ width: "10%" }}
                            onClick={() => sortHandler("date")}
                        >
                            Date
                            <ArrowDownUp
                                className="m-2"
                                size={15}
                                style={{ visibility: sort === "date" ? "visible" : "hidden" }}
                            />
                        </th>
                        <th
                            style={{ width: "10%" }}
                            onClick={() => sortHandler("size")}
                        >
                            Size
                            <ArrowDownUp
                                className="m-2"
                                size={15}
                                style={{ visibility: sort === "size" ? "visible" : "hidden" }}
                            />
                        </th>
                        <th
                            style={{ width: "10%" }}
                            onClick={() => sortHandler("type")}
                        >
                            Type
                            <ArrowDownUp
                                className="m-2"
                                size={15}
                                style={{ visibility: sort === "type" ? "visible" : "hidden" }}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortFiles(files, sort, sortDirection).map((file, index) => (
                        <File file={file} key={file._id} index={index + 1} />
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default FileList;
