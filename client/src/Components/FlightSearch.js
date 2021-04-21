import React from "react";

function FlightSearch(props) {
    return (
        <div className="card singleTweet centered">
            <header className="card-header">
                <div className="card-header-title user-title">
                    Flight From {props.from} To {props.to}
                </div>
            </header>
            <div className="bottom">
            </div>
        </div>
    )
}

export default FlightSearch;