import React, { Component } from "react";

export class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
        };
    }

    componentDidMount() {
        const profile = JSON.parse(localStorage.getItem("profile"));
    }

    render() {
        return <div>This is the home page</div>;
    }
}

export default Home;
