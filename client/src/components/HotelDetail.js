import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hotelItinerary } from '../redux/actions/hotelsAction';

class HotelDetail extends Component {
  constructor(props) {
    super(props);

    this.addHotelHandler = this.addHotelHandler.bind(this);
  }

  hotelDescription() {
    if (this.props.hotels.hotelDetail.marketingText) {
      return <p>Description: { this.props.hotels.hotelDetail.marketingText }</p>;
    }
  }

  addHotelHandler(event) {
    event.preventDefault();
    let searchValues = this.props.searchValues;
    let hotel = this.props.hotels.hotelDetail;
    this.props.onAddToItinerary(searchValues.check_in, searchValues.check_out, searchValues.airport, hotel.name, hotel.cost);

    this.props.history.push('/itinerary');
  }

  render() {
    console.log('from details:', this.props);
    let hotel = this.props.hotels.hotelDetail;

    return (
      <div>
        <h1>HOTEL DETAIL PAGE</h1>
        <h1>{ hotel.name }</h1>
        { this.hotelDescription() }
        <p>Amenities: { hotel.amenities }</p>
        <p>Lowest Total Cost: { hotel.cost }</p>
        <p>Rating: { hotel.rating }</p>
        <p>Address:</p>
        <p>{ hotel.address.line1 }</p>
        <p>{ hotel.address.city }, { hotel.address.region }, { hotel.address.postal_code }</p>
        { hotel.contacts.map( ({ detail, type }) => <p>{ type }: { detail }</p> )}
        <button onClick={ this.addHotelHandler }>Add Hotel</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hotels: state.hotels,
    searchValues: state.hotels.searchValues
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToItinerary: (check_in, check_out, airport, hotelName, saleTotal) => {
      dispatch(hotelItinerary(check_in, check_out, airport, hotelName, saleTotal))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelDetail);