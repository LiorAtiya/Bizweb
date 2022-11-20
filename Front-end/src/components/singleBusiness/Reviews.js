import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import Toast from 'react-bootstrap/Toast';

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

export default function Reviews() {

    const stars = Array(5).fill(0);
    const [reviewList, setReviewList] = useState([])
    const [currentValue, setCurrentValue] = useState(0);
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleMessageChange = event => {
        // 👇️ access textarea value
        setReview(event.target.value);
    };

    const createNewReview = () => {
        setReviewList(oldList => [...oldList, [name, review, currentValue]])
        console.log(reviewList)
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
            <input
                placeholder='Your name'
                style={styles.button}
                onChange={handleNameChange}
            />
            <textarea
                placeholder="What's your feedback"
                style={styles.textarea}
                id="message"
                name="message"
                value={review}
                onChange={handleMessageChange}
            />
            <button style={styles.button} onClick={createNewReview}>Submit</button>
            <div>
                <br></br>
                {
                    reviewList.map((item, i) => {
                        return (
                            <>
                                <Toast>
                                    <Toast.Header>
                                        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                                        <strong className="me-auto">{item[0]}</strong>
                                        <small>{item[2]}</small>
                                        <FaStar style={{
                                            marginLeft: '5px',
                                            cursor: 'pointer'
                                        }} />
                                    </Toast.Header>
                                    <Toast.Body>{item[1]}</Toast.Body>

                                </Toast>
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
