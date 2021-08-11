import React from 'react'

const ComboSearchPage = (props) => {
    return (
        <>
            
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        flights: state.flight,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir))
        },
        getHotels: ( province, district, ward, numberAdult, numberChildren, checkInDate, numRoom) => {
            dispatch(fetchHotel( province, district, ward, numberAdult, numberChildren, checkInDate, numRoom));
          },
        getProvince: () => {dispatch(retrieveProvince());},
        clearBooking: () => { dispatch(clearBookingCached) }
    };
};
export default ComboSearchPage
