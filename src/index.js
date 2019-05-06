import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

//Creating a Class Component
//Must extend to React.Component
class App extends React.Component {
    //constructor() is a preset JavaScript function. It is the first function to start when the component is started.
    //So, since we need to initialize 'state' when a component is created; we can put that initialization within constructor() since it will be the first thing to run immediately after the component runs.
    constructor(props) {
        //super() is a constructor function from React.Component
        //This needs to be done everytime you make a constructor function.
        //This will bring in the construction from React
        super(props);

        //This is how you initialize 'state'
        //THIS IS THE ONLY TIME WE DO DIRECT ASSIGNMENT TO this.state
        //Otherwise you would use setState();
        this.state = { myLatitude: null, errorMessage: '' };

        window.navigator.geolocation.getCurrentPosition(
            //Callback function
            (position) => {
                //To update the state object, we called setState().
                //We did not use this.state.myLatitude = position.coords.latitude;
                this.setState({myLatitude: position.coords.latitude});
            },
            //Callback function
            (err) => this.setState({errorMessage: err.message})
        );
    }

    //React says we must define a render method that returns some amount of JSX
    //The render() method gets called frequently
    render() {
        //This is how you reference the 'state'
        if (this.state.errorMessage && !this.state.myLatitude){
            return <div>Error: {this.state.errorMessage}</div>;
        }
        else if (!this.state.errorMessage && this.state.myLatitude){
            return <div>Latitude: {this.state.myLatitude}</div>;
        }
        else return <div>Loading!</div>;
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));