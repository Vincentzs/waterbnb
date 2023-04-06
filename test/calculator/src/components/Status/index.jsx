import React,{useState} from "react";

const Status = (props) => {
    const [stuatus, setStatus] = useState("good");

    const toggleStatus = () => {
        setStatus(stuatus === "good" ? "bad":"good");
    };

    return <>
        <div>
            <h3>Status is {stuatus}</h3>
            <button onClick={toggleStatus}>Toggle</button>
        </div>
    </>
}

export default Status