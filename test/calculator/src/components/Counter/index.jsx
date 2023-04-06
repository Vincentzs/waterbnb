import React, { useEffect, useState } from "react";

function Counter(props){
    const [count, setCount] = useState(0);
    useEffect(()=>{
        document.title =`You clicked ${count} times`;
    });

    return <>
        <h3>{count}</h3>
        <button onClick={()=>setCount(count+1)}> Click me</button>
    </>
;
}

export default Counter;