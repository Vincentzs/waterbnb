import React, {useState} from "react";
import Input from '../Input'

const Converter = () =>{
    const [celsius,setCelsius] = useState(0);

    const fahrenheit = () => {
        return celsius*9/5+32;
    };

    const update = is_celsius => value => {
        setCelsius(
            is_celsius? value : (value-32)* 5 / 9
        );
    }

    return  <>
        <Input title="Celsius" value={celsius} alter={update(true)} />
            <h1>=</h1>
        <Input title="fahrenheit" value={fahrenheit()} alter={update(false)} />
            </>;
}

// class Converter extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {celsius:0};
//     }

//     get celsius() {
//         return this.state.celsius;
//     }

//     get fahrenheit(){
//         return this.state.celsius*9/5+32;
//     }

//     update = is_celsius => value => {
//         this.setState({
//             celsius: is_celsius? value : (value-32)* 5 / 9
//         });
//     }

//     render() {
//         return <>
//             <Input title="Celsius" value={this.celsius} alter={this.update(true)} />
//             <h1>=</h1>
//             <Input title="fahrenheit" value={this.fahrenheit} alter={this.update(false)} />
//         </>;
//     }
// }

export default Converter