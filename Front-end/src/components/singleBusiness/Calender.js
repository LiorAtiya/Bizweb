import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import AddEventModal from '../AddEventModal'
// import axios from 'axios';
import moment from 'moment';

export default function Calender() {
    const [modalOpen, setModalOpen] = useState(false);
    // const [events, setEvents] = useState([])
    const calenderRef = useRef(null);

    const onEventAdded = event => {
        let calenderApi = calenderRef.current.getApi();
        calenderApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title,
        })
    }

    async function handleEventAdd(data) {
        // await axios.post("/api/calender/create-event",data.event)
    }

    async function handleDatesSet(data) {
        // const response = await axios.get('/api/calender/get-events?start='+moment(data.start).toISOString()+"&end="+moment(data.end).toISOString());
        // setEvents(response.data);
    }
    return (
        <section>
            <button onClick={() => setModalOpen(true)}>Add Event</button>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <FullCalendar
                    ref={calenderRef}
                    // events={events}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={event => handleEventAdd(event)}
                    datesSet = {(date) => handleDatesSet(date)}
                />
            </div>

            <AddEventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onEventAdded={event => onEventAdded(event)}
            />
        </section>
    )
}
