// import React, {useState} from 'react'
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import Badge from '@mui/material/Badge';
// import {PickersDay} from '@mui/x-date-pickers/PickersDay'
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';

// export default function Calender() {
//     const [value, setValue] = useState(new Date());
//     const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

//     return (
//         <>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <StaticDatePicker
//                     orientation="portrait"
//                     openTo="day"
//                     value={value}
//                     onChange={(newValue) => {
//                         setValue(newValue);
//                         console.log(newValue);
//                     }}
//                     renderInput={(params) => <TextField {...params} />}
//                     renderDay={(day, _value, DayComponentProps) => {
//                         const isSelected =
//                           !DayComponentProps.outsideCurrentMonth &&
//                           highlightedDays.indexOf(day.getDate()) >= 0;

//                         return (
//                           <Badge
//                             key={day.toString()}
//                             overlap="circular"
//                             badgeContent={isSelected ? <CheckIcon /> : <CloseIcon />}
//                           >
//                             <PickersDay {...DayComponentProps} />
//                           </Badge>
//                         );
//                       }}
//                 />
//             </LocalizationProvider>
//         </>
//     )
// }


import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';

import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Calendar = ({ id }) => {
    const [value, setValue] = useState(new Date());
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
    const [Flag, setFlag] = useState(false);
    const [times,setTimes] = useState([]);

    const time = useRef("");
    const name = useRef("");
    const phone = useRef("");
    const comments = useRef("");

    const hours = [
        { value: "08:00" ,isChecked: false},
        { value: "09:00" ,isChecked: false},
        { value: "10:00" ,isChecked: false},
        { value: "11:00" ,isChecked: false},
        { value: "12:00" ,isChecked: false},
        { value: "13:00" ,isChecked: false},
        { value: "14:00" ,isChecked: false},
        { value: "15:00" ,isChecked: false},
        { value: "16:00" ,isChecked: false},
        { value: "17:00" ,isChecked: false},
        { value: "18:00" ,isChecked: false},
        { value: "19:00" ,isChecked: false},
        { value: "20:00" ,isChecked: false},
    ]

    //Add new event to calender
    const handleClick = async (e) => {
        e.preventDefault();

        const appointment = {
            businessID: id,
            busy: true,
            date: value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear(),
            time: time.current.value,
            name: name.current.value,
            phone: phone.current.value,
            comments: comments.current.value,
        }
        await (await axios.post('http://localhost:5015/api/calender/create-event', appointment))
        console.log("Added new event to calender");
        setFlag(false);
    }

    //for chosen times to add
    const handleChange = (event) => {
        let isChecked = event.target.checked;  
        let item = event.target.value; 
        
        hours.map(i => {
            if(i.value === item){
                i.isChecked = isChecked;
            }
        });
        console.log(hours);
    }

    const addHours = async () => {
        console.log(hours);
        const hourChecked = hours.filter(i => i.isChecked === true);
        console.log(hourChecked)
        hourChecked.map(async (item) => {

            const appointment = {
                businessID: id,
                busy: false,
                date: value.getDate() + "/" + value.getMonth() + "/" + value.getFullYear(),
                time: item.value,
                name: "",
                phone: "",
                comments: "",
            }

            await axios.post('http://localhost:5015/api/calender/create-event', appointment)
        })
        alert("Added more hours to calender")
        window.location.reload(false);
    }


    return (
        <div style={{ display: "flex", alignItems: "center" }}>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    // mask='____/__/__'
                    variant='static'
                    orientation='portrait'
                    value={value}
                    disableFuture
                    onChange={(newValue) => {
                        setValue(newValue)
                        // console.log(newValue)
                        setFlag(true);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.getDate()) >= 0;

                        return (
                            <Badge
                                key={day.toString()}
                                overlap='circular'
                                badgeContent={isSelected ? <CheckIcon color='red' /> : undefined}
                            >
                                <PickersDay {...DayComponentProps} />
                            </Badge>
                        );
                    }}
                />
            </LocalizationProvider>
            {Flag ?
                <Card style={{ width: '30rem', marginLeft: "30px", display: 'flex' }}>
                    <Card.Body>
                        <div className="d-grid">
                            <h5>Admin Permissions</h5>
                            {hours.map(item => (
                                <label>
                                    <input
                                        type="checkbox"
                                        value={item.value}
                                        onChange={handleChange}
                                    /> {item.value}
                                </label>
                            ))}
                            <button className="btn btn-primary" onClick={addHours}>
                                Add hours to appointment
                            </button>
                        </div>
                        <hr></hr>
                        <h1>Make appointment</h1>
                        <Card.Subtitle className="mb-2 text-muted">{value.getDate() + " / " + value.getMonth() + " / " + value.getFullYear()}</Card.Subtitle>
                        <Card.Text>
                            <form onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label>
                                        Choose an available time:<br></br>
                                        <select className="form-control" ref={time}>
                                            <option value="13:00">13:00</option>
                                            <option value="14:00">14:00</option>
                                            <option value="15:00">15:00</option>
                                            <option value="16:00">16:00</option>
                                        </select>
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>Name Client</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter name business"
                                        required
                                        ref={name}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Phone number</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter location"
                                        required
                                        ref={phone}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Additional Comments</label>
                                    <textarea
                                        placeholder="Description of the business"
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        ref={comments}
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </Card.Text>
                        {/* <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link> */}
                    </Card.Body>
                </Card>
                : null}
        </div>
    );
};

export default Calendar;







// // // import React, { useRef, useState } from 'react'
// // // import FullCalendar from '@fullcalendar/react' // must go before plugins
// // // import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
// // // import AddEventModal from '../AddEventModal'
// // // // import axios from 'axios';
// // // import moment from 'moment';

// // // export default function Calender() {
// // //     const [modalOpen, setModalOpen] = useState(false);
// // //     // const [events, setEvents] = useState([])
// // //     const calenderRef = useRef(null);

// // //     const onEventAdded = event => {
// // //         let calenderApi = calenderRef.current.getApi();
// // //         calenderApi.addEvent({
// // //             start: moment(event.start).toDate(),
// // //             end: moment(event.end).toDate(),
// // //             title: event.title,
// // //         })
// // //     }

// // //     async function handleEventAdd(data) {
// // //         // await axios.post("/api/calender/create-event",data.event)
// // //     }

// // //     async function handleDatesSet(data) {
// // //         // const response = await axios.get('/api/calender/get-events?start='+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString());
// // //         // setEvents(response.data);
// // //     }
// // //     return (
// // //         <section>
// // //             <button onClick={() => setModalOpen(true)}>Add Event</button>
// // //             <div style={{ position: 'relative', zIndex: 0 }}>
// // //                 <FullCalendar
// // //                     ref={calenderRef}
// // //                     // events={events}
// // //                     plugins={[dayGridPlugin]}
// // //                     initialView="dayGridMonth"
// // //                     eventAdd={event => handleEventAdd(event)}
// // //                     datesSet = {(date) => handleDatesSet(date)}
// // //                 />
// // //             </div>

// // //             <AddEventModal
// // //                 isOpen={modalOpen}
// // //                 onClose={() => setModalOpen(false)}
// // //                 onEventAdded={event => onEventAdded(event)}
// // //             />
// // //         </section>
// // //     )
// // // }
