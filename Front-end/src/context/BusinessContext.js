import React, { Component } from 'react'
// import items from "../database/data"
// import categories from '../database/categories';
import axious from 'axios'

const BusinessContext = React.createContext();

export default class BusinessProvider extends Component {
    state = {
        categoryBusiness: [],
        business: [],
        sortedBusiness: [],
        featuredBusiness: [],
        loading: true,
        location: "all",
        // capacity: 1,
        // price: 0,
        // minPrice: 0,
        // maxPrice: 0,
        // minSize: 0,
        // maxSize: 0,
        // breakfast: false,
        // pets: false,
    };

    //getData
    async componentDidMount() {

        //get all business
        await axious.get("http://localhost:5015/api/business")
            .then((res) => {
                if (res.status === 200) {
                    this.setState({ business: res.data, sortedBusiness: res.data })
                }
            })

        // let typeBusiness = this.state.business.filter(busi => busi.category === true);
        // console.log("typeBusiness: "+ this.state.business[0].category);

        // let business = this.formatData(items);
        // let maxPrice = Math.max(...business.map(item => item.price))
        // let maxSize = Math.max(...business.map(item => item.size))

        this.setState({
            // typeBusiness,
            loading: false,
            // price: maxPrice,
            // maxPrice,
            // maxSize 
        })
    }

    // formatData(items) {
    //     let tempItems = items.map(item => {
    //         let id = item.sys.id;
    //         let images = item.fields.images.map(image =>
    //             image.fields.file.url);

    //         let business = { ...item.fields, images, id }
    //         return business;
    //     })
    //     return tempItems;
    // }

    getBusiness = (name) => {
        let tempBusiness = [...this.state.business];
        const business = tempBusiness.find(busi => busi.name === name);
        return business;
    }

    handleChange = event => {
        const target = event.target;
        const value = target.location === 'checkbox' ?
            target.checked : target.value;
        const name = event.target.name;
        this.setState(
            {
                [name]: value
            },
            this.filterBusiness
        );
    }

    filterBusiness = () => {
        let {
            business,
            location,
            // capacity,
            // price,
            // minPrice,
            // maxPrice,
            // minSize,
            // maxSize,
            // breakfast,
            // pets,
        } = this.state

        //all the business
        let tempBusiness = [...business];

        //filter by location
        if (location !== 'all') {
            tempBusiness = tempBusiness.filter(busi => busi.location === location);
        }       

        this.setState({
            sortedBusiness: tempBusiness
        })

        // //transform value
        // capacity = parseInt(capacity)

        // //filter by size
        // tempBusiness = tempBusiness.filter(busi => busi.size >= minSize && busi.size <= maxSize)

        // //filter by capacity
        // if(capacity !== 1){
        //     tempBusiness = tempBusiness.filter(busi => busi.capacity >= capacity);
        // }

        // //filter by price
        // tempBusiness = tempBusiness.filter(busi => busi.price <= price);

        // //filter by breakfast
        // if(breakfast) {
        //     tempBusiness = tempBusiness.filter(busi => busi.breakfast === true);
        // }

        // //filter by pets
        // if(pets){
        //     tempBusiness = tempBusiness.filter(busi => busi.pets === true);
        // }
    }

    render() {
        return (
            //...this.state = pass whole state
            <BusinessContext.Provider
                value={{
                    ...this.state,
                    getBusiness: this.getBusiness,
                    handleChange: this.handleChange,
                }}>
                {this.props.children}
            </BusinessContext.Provider>
        )
    }
}

const BusinessConsumer = BusinessContext.Consumer;

export function withBusinessConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <BusinessConsumer>
            {value => <Component {...props} context={value} />}
        </BusinessConsumer>
    }
}
export { BusinessProvider, BusinessConsumer, BusinessContext };
