import React, { useRef } from 'react'
import Hero from '../components/Hero';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function NewBusiness() {
    const category = useRef("");
    const name = useRef();
    const description = useRef();
    const location = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();

        const business = {
            category: category.current.value,
            name: name.current.value,
            description: description.current.value,
            location: location.current.value,
        }
        try {
            //send request to server to add new business
            await axios.post("http://localhost:5015/api/business/add", business)
                .then((res) => {
                    if (res.status === 200) {
                        //add id of business to list of business of user
                        const businessID = res.data._id;
                        const getUserData = JSON.parse(localStorage.getItem('token'));
                        const business = {
                            userID: getUserData._id,
                            business: businessID
                        }
                        axios.put(`http://localhost:5015/api/users/${getUserData._id}/business`,business);

                        console.log("Added new business to list of user");
                        history.push('/');
                        window.location.reload(false);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Hero hero="roomsHero">
            <div className="auth-wrapper">
                <form onSubmit={handleClick} className="auth-inner">
                    <h3>Open New Business</h3>

                    <div className="mb-3">
                        <label>
                            Category of your business:<br></br>
                            <select className="form-control" value={category.current.value} ref={category}>
                                <option value="Barbershop">Barbershop</option>
                                <option value="Nail Polish">Nail Polish</option>
                                <option value="Restaurants">Restaurants</option>
                                <option value="Renovations">Renovations</option>
                            </select>
                        </label>
                    </div>

                    <div className="mb-3">
                        <label>Name Business</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name business"
                            required
                            ref={name}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Description</label>
                        <textarea
                            placeholder="Description of the business"
                            className="form-control"
                            id="message"
                            name="message"
                            ref={description}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter location"
                            required
                            ref={location}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Hero>
    )
}
