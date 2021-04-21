import React, {useState, useEffect} from "react";
import FlightForm from "./FlightForm";
import FlightCard from "./FlightCard";
import axios from "axios";
import FlightSearch from "./FlightSearch";

function FlightFinder() {
    const [findingFlight, setFindingFlight] = useState(false);
    const [flightFound, setFlightFound] = useState(false);
    const [flights, setFlights] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [listOfFlights, setListOfFlights] = useState([]);

    async function flightGenerator(flightFrom, flightTo) {
        setFindingFlight(false);
        setFrom(flightFrom);
        setTo(flightTo);
        const responseFrom = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${flightFrom}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "54c79bb3a7msh2db76f7f3ee51c7p1a4d09jsnf7801dd0865c",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        });
        let placesQueryFrom = await responseFrom.json();
        let flightFromCode = placesQueryFrom.Places[0].PlaceId;

        const responseTo = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${flightTo}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "54c79bb3a7msh2db76f7f3ee51c7p1a4d09jsnf7801dd0865c",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        });
        let placesQueryTo = await responseTo.json();
        let flightToCode = placesQueryTo.Places[0].PlaceId;

        const flightResponse = await fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${flightFromCode}/${flightToCode}/2021-09-01?inboundpartialdate=2021-12-01`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "54c79bb3a7msh2db76f7f3ee51c7p1a4d09jsnf7801dd0865c",
                "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
            }
        });
        let flightResults = await flightResponse.json();
        console.log(flightResults);
        setFlights(flightResults);
        setFlightFound(true);

        await axios({
            url: 'http://localhost:8080/api/save',
            method: 'POST',
            data: {
                title: flightFrom,
                body: flightTo,
            }
        }).then(() => console.log('data sent to the server'))
            .catch(() => console.log('server error'));
    }

    function onFlightSearch() {
        setFindingFlight(true);
    }

    function onFlightCancel() {
        setFindingFlight(false);
    }

    function doneViewingFlights() {
        setFlightFound(false);
    }

    function getFlights() {
        axios.get('http://localhost:8080/api')
            .then((response) => {
                const data = response.data;
                setListOfFlights(data);
                console.log('Data has been received!!');
            })
            .catch(() => {
                console.log('fetch error');
            });
    }

    useEffect( () => {
        getFlights();
    }, [listOfFlights]);

    if (findingFlight) {
        return <FlightForm onSubmit={flightGenerator} onCancel={onFlightCancel}></FlightForm>
    } else if (!findingFlight && !flightFound) {
        return (
            <div>
                <button onClick={onFlightSearch}>Search For Flights</button>
                <br/>
                <br/>
                <div className="title is-1">Previous Flights Searched</div>
                {listOfFlights.map((t) =>
                    (
                        <FlightSearch key={t._id} from={t.title} to={t.body}
                                    ></FlightSearch>
                    ))}
            </div>
        )
    } else if (flightFound) {
        return (
            <div>
            {flights.Carriers.map((t) =>
                (
                    <FlightCard key={'key'} from={from} to={to}
                    airline={t.Name} price={flights.Quotes[0].MinPrice}></FlightCard>
                ))}
                <button onClick={doneViewingFlights}>Done Viewing Flights</button>
            </div>
        )
    }
}

export default FlightFinder;