import React, { Component } from 'react'
import defaultBcg from "../images/room-1.jpeg"
import { BusinessContext } from "../context"
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import StyledHero from '../components/StyledHero'


//Gallery
import { GalleryCard } from '../components/GalleryCard'
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import TrackVisibility from 'react-on-screen';
import Calender from '../components/Calender'
import Reviews from '../components/Reviews'

export default class SingleBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }
  }

  static contextType = BusinessContext;

  render() {
    const { getBusiness } = this.context;
    const business = getBusiness(this.state.slug)
    if (!business) {
      return (
        <div className='error'>
          <h3>no such business could be found...</h3>
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      )
    }
    const { name,
      // description,
      // capacity,
      // price,
      // extras,
      // breakfast,
      // pets, 
      images } = business;

    const [...defaultImg] = images

    const projects = [
      {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg1,
      },
      {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg2,
      },
      {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg3,
      },
      {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg1,
      },
      {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg2,
      },
      {
        title: "Business Startup",
        description: "Design & Development",
        imgUrl: projImg3,
      },
    ];

    return (
      <>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} room`}>
            <Link to='/' className='btn-primary'>
              Back to home
            </Link>
          </Banner>
        </StyledHero>
        <section className="project" id="project">
          <Container>
            <Row>
              <Col size={12}>
                <TrackVisibility>
                  {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      {/* <h2>Projects</h2> */}
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                      <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                          <Nav.Item>
                            <Nav.Link eventKey="first">Gallery</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">Calendar</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="third">Reviews</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="four">Contact</Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                          <Tab.Pane eventKey="first">
                            <Row>
                              {
                                projects.map((project, index) => {
                                  return (
                                    <GalleryCard
                                      key={index}
                                      {...project}
                                    />
                                  )
                                })
                              }
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <Col size={12} sm={6} md={7}>
                            <Calender />
                            </Col>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <Reviews />
                          </Tab.Pane>
                          <Tab.Pane eventKey="four">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </div>}
                </TrackVisibility>
              </Col>
            </Row>
          </Container>
          {/* <img className="background-image-right" src={colorSharp2} alt="colorsharp"></img> */}
        </section>
        {/* <section className='single-room'>
        <div className='single-room-images'>
          {defaultImg.map((item,index) => {
            return <img key={index} src={item} alt={name}/>
          })}
        </div>
        <div className='single-room-info'>
        <article className='desc'>
          <h3>details</h3>
          <p>{description}</p>
        </article>
        <article className='info'>
          <h3>info</h3>
          <h6>price : ${price}</h6>
          <h6>
            max capacity : {" "}
            {capacity > 1 ? `${capacity} people` : `${capacity} person `}
          </h6>
          <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
          <h6>{breakfast && "free breakfast included"}</h6>
        </article>
        </div>
      </section>
      <section className='room-extras'>
          <h6>extras</h6>
          <ul className='extras'>
          {extras.map((item, index) => {
            return <li key={index}>- {item}</li>
          })}
          </ul>
      </section> */}
      </>
    )
  }
}
