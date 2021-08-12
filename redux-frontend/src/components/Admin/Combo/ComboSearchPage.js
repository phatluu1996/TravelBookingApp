import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { clearBookingCached } from '../../../actions/actionBookingRoom';
import { clearFlightBookingCached } from '../../../actions/actionBookingFlight';
import { fetchFlight } from '../../../actions/actionFlight';
import { retrieveProvince } from '../../../actions/actionLocation';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchHotel } from '../../../actions/actionHotel';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ComboSearchPage = (props) => {
    const history = useHistory();
    let queryParam = useQuery();
    const [fFilter, setFFilter] = useState(null);
    const [hFilter, setHFilter] = useState(null);
    useEffect(() => {
        let flightFilter = {
            from: queryParam.get("from"),
            to: queryParam.get("to"),
            departureDate: queryParam.get("departureDate"),
            returnDate: queryParam.get("returnDate"),
            seatClass: queryParam.get("seatClass"),
            adult: queryParam.get("adult"),
            child: queryParam.get("child"),
            infant: queryParam.get("infant"),
            priceFrom: queryParam.get("priceFrom"),
            priceTo: queryParam.get("priceTo"),
            page: 1,
            sortBy: queryParam.get("sortBy"),
            sortDir: queryParam.get("sortDir")
        }
        let hotelFilter = {
            province: queryParam.get("province"),
            district: queryParam.get("district"),
            ward: queryParam.get("ward"),
            numberAdult: queryParam.get("hAdult"),
            numberChildren: queryParam.get("hChild"),
            checkInDate: queryParam.get("checkInDate"),
            numRoom: queryParam.get("numRoom"),
        };

        var checkinDate = dateConvert(queryParam.get("checkInDate"));
        props.getFlight(queryParam.get("from"), queryParam.get("to"), queryParam.get("adult"), queryParam.get("child"), queryParam.get("infant"), queryParam.get("departureDate"), queryParam.get("returnDate"), queryParam.get("seatClass"), queryParam.get("priceFrom"), queryParam.get("priceTo"), 1, queryParam.get("sortBy"), queryParam.get("sortDir"));
        props.getHotel(queryParam.get("province"), queryParam.get("district"), queryParam.get("ward"), queryParam.get("hAdult"), queryParam.get("hChild"), checkinDate.toDateString(), queryParam.get("numRoom"));
        props.getProvince();
    }, []);

    useEffect(() => {
        if (props.flights.data && props.hotels.data) {

        }
    })

    const dateConvert = (date) => {
        var st = date.replace("/", ".");
        var pattern = /(\d{2}).(\d{2}).(\d{4})/;
        var dt = new Date(st.replace(pattern, '$3-$2-$1'));
        return dt;
    }
    return (
        <>

        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        flights: state.flight,
        hotels: state.hotels
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir))
        },
        getHotel: (province, district, ward, numberAdult, numberChildren, checkInDate, numRoom) => {
            dispatch(fetchHotel(province, district, ward, numberAdult, numberChildren, checkInDate, numRoom));
        },
        getProvince: () => { dispatch(retrieveProvince()); },
        clearBooking: () => {
            dispatch(clearBookingCached);
            dispatch(clearFlightBookingCached);
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ComboSearchPage);
