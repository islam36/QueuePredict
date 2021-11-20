import React, { useState, useEffect } from 'react';
import arrowLeft from './arrow-left.svg';
import mapPin from './map-pin.svg';
import calendar from './calendar.svg';
import clock from './clock.svg';
import { useNavigate } from 'react-router-dom';


function Map() {
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const day = new Date();
        let h = day.getHours();
        let m = day.getMinutes();
        h = (h < 10) ? `0${h}` : `${h}`;
        m = (m < 10) ? `0${m}` : `${m}`;
        setHour(`${h}:${m}`);
        setDate(day.toLocaleDateString());

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation(pos.coords);
                console.log(location);
            }, (err) => {
                console.log(err);
            });
        } else {
            alert("Error: can't access geolocation");
        }

        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });

    }, []);

    return (
        <div className="map-bg">
            <div className="top-bar">
                <div className="navbar">
                    <img src={arrowLeft} alt="arrow-left"
                        onClick={() => {
                            navigate("/services", { replace: true });
                        }}
                    />
                    <h3>Post Office</h3>
                </div>

                <div className="location-input">
                    <img src={mapPin} alt="map-pin" />
                    <input type="text" name="location"
                        value={location ? `${location.latitude}, ${location.longitude}` : ""}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                    />
                </div>

                <div className="time-inputs">
                    <div className="date-input">
                        <input type="text" name="date" value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                        />
                        <img src={calendar} alt="calendar" />
                    </div>

                    <div className="hour-input">
                        <input type="text" name="hour" value={hour}
                            onChange={(e) => {
                                setHour(e.target.value);
                            }}
                        />
                        <img src={clock} alt="clock" />
                    </div>
                </div>

            </div>
            
            <div id="map">

            </div>
        </div>
    );
}

export default Map;