import React, {useState} from "react";
import 'bulma/css/bulma.min.css';

function FlightForm(props) {
    const [flightFrom, setFlightFrom] = useState('Washington DC');
    const [flightTo, setFlightTo] = useState('San Francisco');

    return (
        <div>
            <div className="field">
                <label className="label">Flight From (city)</label>
                <div className="control">
                    <input defaultValue='Washington DC' onChange={(e) => setFlightFrom(e.target.value)} className="input" type="text" placeholder="Text input"/>
                </div>
            </div>

            <div className="field">
                <label className="label">Flight To (city)</label>
                <div className="control">
                    <input defaultValue='San Francisco' onChange={(e) => setFlightTo(e.target.value)} className="input" type="text" placeholder="Text input"/>
                </div>
            </div>

            <div className="field">
                <label className="label">Departure Date</label>
                <div className="control">
                    <input className="input" type="date" placeholder="Text input"/>
                </div>
            </div>

            <div className="field">
                <label className="label">Return Date</label>
                <div className="control">
                    <input className="input" type="date"/>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={() => props.onSubmit(flightFrom, flightTo)} className="button is-link">Find Flight</button>
                </div>
                <div className="control">
                    <button onClick={props.onCancel} className="button is-link is-light">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default FlightForm;