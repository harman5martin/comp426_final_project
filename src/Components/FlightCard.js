import React from "react";

function FlightCard(props) {
    return (
        <div className="card singleTweet centered">
            <header className="card-header">
                <div className="card-header-title user-title">
                    Flight From {props.from} To {props.to}
                </div>
            </header>
            <div className="card-content">
                <div className="content">
                    <p>Price: ${props.price}</p>
                    <p>Airline: {props.airline}</p>
                </div>
            </div>
            <div className="bottom">
            </div>
        </div>
    )
}

export default FlightCard;