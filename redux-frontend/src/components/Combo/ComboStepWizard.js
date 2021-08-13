import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import StepWizard from 'react-step-wizard'
import { importAll } from '../../utils/JqueryImport'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import ComboFlightSearchPage from './ComboFlightSearchPage'
import ComboFlightSearchPage2 from './ComboFlightSearchPage2'
import ComboHotelSearchPage from './ComboHotelSearchPage'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ComboStepWizard = (props) => {
    const [departFlight, setDepartFlight] = useState(null);
    const [returnFlight, setReturnFlight] = useState(null);
    const [hotel, setHotel] = useState(null);
    const queryString = require('query-string');
    const [filter, setFilter] = useState(queryString.parse(props.location.search));

    useEffect(() => {
        importAll();
        // var filterObj = queryString.parse(props.location.search);
        // var paramsString = new URLSearchParams(filterObj).toString();
        // console.log(filterObj);
        // console.log(paramsString);
        // setFilter(filterObj);
    }, [])

    return (<>
        <Header></Header>
        <StepWizard>
            {!filter.returnDate ? (<ComboFlightSearchPage departFlight={departFlight} setDepartFlight={setDepartFlight} filter={filter} setFilter={setFilter}></ComboFlightSearchPage>)
            :(<ComboFlightSearchPage2 departFlight={departFlight} setDepartFlight={setDepartFlight} returnFlight={returnFlight} setReturnFlight={setReturnFlight} filter={filter} setFilter={setFilter}></ComboFlightSearchPage2>)}
            <ComboHotelSearchPage selectHotel={hotel} setSelectHotel={setHotel} filter={filter} setFilter={setFilter}></ComboHotelSearchPage>
            
        </StepWizard>
        <Footer></Footer>
    </>)
}

export default ComboStepWizard
