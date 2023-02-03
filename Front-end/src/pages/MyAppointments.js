import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import axios from 'axios';
import '../styles/Form.css'
import ApiClient from '../api/ApiRoutes';

export default function MyAppointments() {

    let { userID } = useParams();
    const [userData, setUserData] = useState();

    useEffect(() => {
        const getResult = async () => {
            // gets all appintments of user
            ApiClient.getMyAppointments(userID)
                .then((res) => {
                    localStorage.setItem("token", JSON.stringify(res.data));
                    setUserData(JSON.parse(localStorage.getItem('token')));
                })
                .catch((err) => console.log(err));
        };
        getResult();
    }, [userID]);

    const deleteEvent = async (id, t, name, phone, date) => {

        const appointment = {
            businessID: id,
            date: date,
            time: t,
            name: name,
            phone: phone,
        }

        ApiClient.deleteEventFromCalender(appointment)
            .then((res) => {
                //Delete from my appointments
                appointment.userID = userID;
                ApiClient.deleteEventFromMyAppointments(appointment)
                    .then((res) => {
                        if (res.status !== 500) {
                            window.localStorage.setItem("token", JSON.stringify(res.data));
                            console.log("Delete appointment from list of user");
                            window.location.reload(false);
                        }
                    })
                    .catch((err) => console.log(err));
            }).catch((err) => console.log(err));

    }
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <h2>My Appointments</h2>
                <hr></hr>
                {
                    userData ?
                        userData.myAppointments.map(item => {
                            return (
                                <>
                                    <Card>
                                        <Card.Header><b>Business Name:</b> {item.name}</Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                <b>Date: </b>{item.date}
                                                <br />
                                                <b>Time: </b>{item.time}
                                                <br />
                                            </Card.Text>
                                            <Button variant="btn btn-danger"
                                                onClick={() => deleteEvent(item.businessID, item.time, item.name, item.phone, item.date)}
                                            >Delete</Button>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </>
                            )
                        })
                        :
                        null
                }
            </div>
        </div>
    )
}
