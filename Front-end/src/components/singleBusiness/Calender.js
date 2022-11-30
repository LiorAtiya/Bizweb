import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

//Calender
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import Badge from '@mui/material/Badge';
// import { PickersDay } from '@mui/x-date-pickers/PickersDay';
// import CheckIcon from '@mui/icons-material/Check';

//Window of client appointment
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Calendar = ({ id }) => {
    // const [highlightedDays, setHighlightedDays] = useState([1, 2, 13]);
    const [value, setValue] = useState(new Date());
    const [Flag, setFlag] = useState(false);
    const [events, setEvents] = useState([]);
    const [filteredFreeEvents, setFilteredFreeEvents] = useState([]);
    const [filteredAddHours, setFilteredAddHours] = useState([]);

    //Details of client
    const time = useRef("");
    const name = useRef("");
    const phone = useRef("");
    const comments = useRef("");

    //Admin Permissions
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const hours = [
        { value: "08:00", isChecked: false },
        { value: "09:00", isChecked: false },
        { value: "10:00", isChecked: false },
        { value: "11:00", isChecked: false },
        { value: "12:00", isChecked: false },
        { value: "13:00", isChecked: false },
        { value: "14:00", isChecked: false },
        { value: "15:00", isChecked: false },
        { value: "16:00", isChecked: false },
        { value: "17:00", isChecked: false },
        { value: "18:00", isChecked: false },
        { value: "19:00", isChecked: false },
        { value: "20:00", isChecked: false },
    ]

    useEffect(() => {
        const getResult = async () => {
            //gets all events of business
            await axios.post('http://localhost:5015/api/calender/get-events', { businessID: id }).
                then((res) => setEvents(res.data)).
                catch((err) => console.log(err));
        };
        getResult();
    }, []);

    //Add new event to calender
    const handleClick = async (e) => {
        e.preventDefault();

        const appointment = {
            businessID: id,
            busy: true,
            date: value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear(),
            time: time.current.value,
            name: name.current.value,
            phone: phone.current.value,
            comments: comments.current.value,
        }
        await (await axios.post('http://localhost:5015/api/calender/create-event', appointment))
        console.log("Added new event to calender");

        window.location.reload(false);
    }

    //for chosen times to add
    const handleChange = (event) => {
        let isChecked = event.target.checked;
        let item = event.target.value;

        hours.map(i => {
            if (i.value === item) {
                i.isChecked = isChecked;
            }
        });
    }

    const addHours = async () => {
        const hourChecked = hours.filter(i => i.isChecked === true);
        hourChecked.map(async (item) => {

            const appointment = {
                businessID: id,
                busy: false,
                date: value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear(),
                time: item.value
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
                    disablePast
                    onChange={(newValue) => {
                        setValue(newValue)

                        //========== Filter for select free hour to appiment ========
                        const filtered = events.availableHours.filter(event => event.date === newValue.getDate() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getFullYear());

                        let selectFreeEvent = filtered.map((item, index) => {
                            return <option value={item.time} key={index}>{item.time}</option>
                        })
                        setFilteredFreeEvents(selectFreeEvent);

                        //========== Filter for add hours for admin ========

                        const newFiltered = Object.values(filtered).map(k => k.time);
                        const dateFiltered = events.dates.map(obj => {
                            if (obj.date === newValue.getDate() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getFullYear()) {
                                return obj.time;
                            }
                        })
                        const addHoursFiltered = hours.filter(hour => !newFiltered.includes(hour.value) && !dateFiltered.includes(hour.value));

                        setFilteredAddHours(addHoursFiltered);

                        //==================================================

                        setFlag(true);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                // renderDay={(day, _value, DayComponentProps) => {
                // const isSelected =
                //     !DayComponentProps.outsideCurrentMonth &&
                //     highlightedDays.indexOf(day.getDate()) >= 0;

                // return (
                //     <Badge
                //         key={day.toString()}
                //         overlap='circular'
                //         badgeContent={isSelected ? <CheckIcon color='red' /> : undefined}
                //     >
                //         <PickersDay {...DayComponentProps} />
                //     </Badge>
                // );
                // }}
                />
            </LocalizationProvider>
            {Flag ?
                <Card style={{ width: '30rem', marginLeft: "30px", display: 'flex' }}>
                    <Card.Body>
                        <div className="d-grid">
                            <Button variant="btn btn-warning" onClick={handleShow}>
                                Admin Permissions
                            </Button>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <h5>Select hours to make appointments</h5>
                                </Modal.Header>
                                <Modal.Body>
                                    {
                                        filteredAddHours.map(item => (
                                            <>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        value={item.value}
                                                        onChange={handleChange}
                                                    /> {item.value}
                                                </label>
                                                <br></br>
                                            </>
                                        ))}

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="btn btn-success" onClick={addHours}>Confirm</Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                        <hr></hr>
                        <h1>Make appointment</h1>
                        <Card.Subtitle className="mb-2 text-muted">{value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()}</Card.Subtitle>
                        <Card.Text>

                            <form onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label>
                                        Choose an available time:<br></br>
                                        <select style={{ display: "inline" }} className="form-control" ref={time}>
                                            {filteredFreeEvents}
                                        </select>
                                    </label>
                                </div>

                                <div className="mb-3">
                                    <label>Client name</label>
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
                                    <button type="submit" className="btn btn-success">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                : null}
        </div>
    );
};

export default Calendar;