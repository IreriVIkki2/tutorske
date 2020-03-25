import React, { Component } from "react";

export class Home extends Component {
    render() {
        return (
            <div>
                <br />
                <br />
                <br />

                <button className="btn btn--primary">Primary</button>
                <br />
                <br />
                <hr />
                <br />
                <button className="btn btn--primary">secondary</button>

                <br />
                <br />
                <br />
                <div className="card card--primary mb-xs">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, blanditiis.
                    </p>
                </div>
                <div className="card card--secondary mb-sm">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, blanditiis.
                    </p>
                </div>
                <div className="card card--tertiary mb-md">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, blanditiis.
                    </p>
                </div>
                <div className="card card--tertiary-2 mb-lg">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, blanditiis.
                    </p>
                </div>
                <div className="card mb-xl">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, blanditiis.
                    </p>
                </div>

                <div className="card mb-sm">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Reprehenderit, blanditiis.
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
