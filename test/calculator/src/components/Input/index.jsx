import React from "react";

class Input extends React.Component {

    render() {
        const {title, value, alter} = this.props;

        return <>
            <h2>{title}</h2>
            <input type="number" 
                value={value} 
                onChange={event => alter(event.target.value)}
                style={{width:200,fontSize:'1.5em',padding:'0.2em 0.4em'}} />
        </>;
    }
}
export default Input
