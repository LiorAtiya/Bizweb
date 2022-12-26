import React, { useState, useEffect, useRef } from 'react'
import { FaStar } from "react-icons/fa"
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        margin: "20px 0",
        minHeight: 100,
        padding: 10
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10
    }
}

export default function Reviews({ id }) {

    const stars = Array(5).fill(0);
    const [reviewList, setReviewList] = useState([])
    const [currentValue, setCurrentValue] = useState(0);
    // const [name, setName] = useState('');
    // const [review, setReview] = useState('');
    const [hoverValue, setHoverValue] = useState(undefined);

    const name = useRef();
    const review = useRef();

    const getUserData = JSON.parse(localStorage.getItem('token'));

    const isAdmin = () => {
        if (getUserData) {
            return getUserData.business.includes(id);
        }
        return false;
    }

    useEffect(() => {
        const getResult = async () => {
            //get all images of the business from mongodb
            await axios.get(`http://localhost:5015/api/business/${id}/reviews`)
                .then((res) => setReviewList(res.data))
                .catch((err) => console.log(err));
        };
        getResult();
    }, [id]);

    //----- Stars Rating --------
    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const addReview = async () => {
        const newReview = {
            details: {
                id: 'id' + (new Date()).getTime(),
                name: name.current.value,
                review: review.current.value,
                stars: currentValue
            },
            userID: id
        }
        await axios.put(`http://localhost:5015/api/business/${id}/reviews`, newReview);
        window.location.reload(false);
    }

    const removeReview = async (review_id) => {
        await axios.delete(`http://localhost:5015/api/business/${id}/reviews`,
            { data: { id: review_id } });
        window.location.reload(false);
    }

    return (
        <div style={styles.container}>
            <h2>Star Rating</h2>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            style={{
                                marginRight: 10,
                                cursor: 'pointer'
                            }}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}
            </div>
            <br></br>
            <form onSubmit={addReview}>
                <div>
                    <input
                        placeholder='Your name'
                        style={styles.button}
                        required
                        ref={name}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="What's your feedback"
                        style={styles.textarea}
                        id="message"
                        name="message"
                        required
                        ref={review}
                    />
                </div>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
            <div>
                <br></br>
                {
                    reviewList.map((item, i) => {
                        return (
                            <>
                                {
                                    isAdmin() ?
                                        <Toast onClose={() => removeReview(item.id)}>
                                            <Toast.Header>
                                                {/* <img src="holder.js/20x20?text=/%20" className="rounded me-2" alt="" /> */}
                                                <strong className="me-auto">{item.name}</strong>
                                                <small>{item.stars}</small>
                                                <FaStar
                                                    key={i}
                                                    style={{
                                                        marginLeft: '5px',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </Toast.Header>
                                            <Toast.Body>{item.review}</Toast.Body>
                                        </Toast>
                                        :
                                        <Toast onClose={() => alert('Only admin can remove review')}>
                                            <Toast.Header>
                                                {/* <img src="holder.js/20x20?text=/%20" className="rounded me-2" alt="" /> */}
                                                <strong className="me-auto">{item.name}</strong>
                                                <small>{item.stars}</small>
                                                <FaStar
                                                    key={i}
                                                    style={{
                                                        marginLeft: '5px',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </Toast.Header>
                                            <Toast.Body>{item.review}</Toast.Body>
                                        </Toast>
                                }
                                <br></br>
                            </>
                        )
                    })
                }
            </div>
            <br></br>
            <br></br>
        </div>
    )
}
