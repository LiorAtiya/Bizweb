import React , { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll';
import '../App.css';
import ErrorBoundry from '../components/ErrorBoundry';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '../database/categories';
import Hero from '../components/Hero';
import Banner from '../components/Banner'
// import {Link} from 'react-router-dom'
import Services from '../components/Services';
import FeatureBusiness from './FeatureBusiness'

class Home extends Component {
    constructor() {
        super()
        this.state = { // תיאור של מה שבונים
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        this.setState({robots: categories})
        // fetch('https://jsonplaceholder.typicode.com/users') // פונקציה לבקש בקשה מהשרת
        // .then(response => response.json())
        // .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value }) // לקחת את הערך שנכתב בחיפוש
    }

    render() {

        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) // לסנן כל ערך שמכיל את מה שנכתב בתיבת חיפוש
        })
        if (this.state.robots.length === 0){
            return <Hero><h1>Loading</h1></Hero>
        } else {
            return ( 
                <>
                <Hero>
                    <div className='tc'> 
                    <Banner title="Facework" subtitle="Social network for business">
                        {/* <Link to='/register' className='btn-primary'>Register</Link> */}
                        <SearchBox searchChange={this.onSearchChange} />
                    </Banner>
                        {/* <h1 className='f2'>Facework</h1>
                        <h4 style={{color:"white"}}>Social network for businesses</h4> */}
                        {/* <hr></hr> */}
                         
                        {/* <Scroll> */}
                        <ErrorBoundry>
                        <br></br>
                        <h2>Categories</h2>
                        <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                        {/* </Scroll> */}
                    </div>
                </Hero>
                <FeatureBusiness />
                <Services/>
                </>
            );
        }
    }
}


export default Home;