import React, { useState } from "react";
import Button from '../button'
import './style.css'

function Calculator(){
    const [expr, setExpr] = useState("");

    const buttons = [
        '7','8','9','/',
        '4','5','6','*',
        '1','2','3','+',
        '0','.','=','-',
    ]

    const update = value => {
        if(value!=="="){
            setExpr(expr+value);
        }else{
            setExpr(eval(expr));
        }
    }

    return <div className="calculator">
        <input type="text" value={expr} className="display" readOnly></input>
        {
        buttons.map(button => <Button key={button} update={update} value={button} />)
        }
    </div>
}
export default Calculator;