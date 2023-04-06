import React from "react";
import './style.css'

const Button = ({value,update}) => {
    return <button 
              className={isNaN(value)?"btn operator":"btn"}
              onClick={()=>update(value)}>
                {value}</button>;
};

export default Button;