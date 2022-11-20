import React , { Component } from 'react';
import SearchBox from '../components/home/SearchBox';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import categories from '../database/categories';
import Hero from '../components/Hero';
import Banner from '../components/Banner'
import Services from '../components/home/Services';
import CategoryBusiness from '../components/home/CategoryBusiness'

class Home extends Component {
    constructor() {
        super()
        this.state = { // תיאור של מה שבונים
            category: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        this.setState({category: categories})
        // fetch('https://jsonplaceholder.typicode.com/users') // פונקציה לבקש בקשה מהשרת
        // .then(response => response.json())
        // .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value }) // לקחת את הערך שנכתב בחיפוש
    }

    render() {

        const filteredCategories = this.state.category.filter(category =>{
            return category.name.toLowerCase().includes(this.state.searchfield.toLowerCase()) // לסנן כל ערך שמכיל את מה שנכתב בתיבת חיפוש
        })
        if (this.state.category.length === 0){
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
                    </div>
                </Hero>
                <CategoryBusiness categories={filteredCategories}/>
                <Services/>
                </>
            );
        }
    }
}


export default Home;