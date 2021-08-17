import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import StepWizard from 'react-step-wizard'
import { importAll } from '../../utils/JqueryImport'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import ComboFlightSearchPage from './ComboFlightSearchPage'
import ComboFlightSearchPage2 from './ComboFlightSearchPage2'
import ComboHotelDetailPage from './ComboHotelDetailPage'
import ComboHotelSearchPage from './ComboHotelSearchPage'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ComboStepWizard = (props) => {

    const [selectProvince, setSelectProvince] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const [selectWard, setSelectWard] = useState(null);
    const [departFlight, setDepartFlight] = useState(null);
    const [returnFlight, setReturnFlight] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState(null);
    const queryString = require('query-string');
    const [filter, setFilter] = useState(queryString.parse(props.location.search));
    const [arriveCityCode, setArriveCityCode] = useState(queryString.parse(props.location.search).to);

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
            {/* <ComboFlightSearchPage departFlight={departFlight} setDepartFlight={setDepartFlight} filter={filter} setFilter={setFilter}></ComboFlightSearchPage> */}
            <ComboFlightSearchPage2 arriveCityCode={arriveCityCode} setArriveCityCode={setArriveCityCode} departFlight={departFlight} setDepartFlight={setDepartFlight} returnFlight={returnFlight} setReturnFlight={setReturnFlight} filter={filter} setFilter={setFilter} selectProvince={selectProvince} setSelectProvince={setSelectProvince} selectDistrict={selectDistrict} setSelectDistrict={setSelectDistrict} selectWard={selectWard} setSelectWard={setSelectWard}></ComboFlightSearchPage2>
            <ComboHotelSearchPage arriveCityCode={arriveCityCode} setArriveCityCode={setArriveCityCode} selectHotel={hotel} setSelectHotel={setHotel} filter={filter} setFilter={setFilter} departFlight={departFlight} returnFlight={returnFlight} selectProvince={selectProvince} setSelectProvince={setSelectProvince} selectDistrict={selectDistrict} setSelectDistrict={setSelectDistrict} selectWard={selectWard} setSelectWard={setSelectWard}></ComboHotelSearchPage>
            <ComboHotelDetailPage selectHotel={hotel} selectRooms={rooms} setSelectRooms={setRooms} filter={filter} fid={departFlight?.id} rid={returnFlight?.id}></ComboHotelDetailPage>
        </StepWizard>
        <Footer></Footer>
    </>)
}

export default ComboStepWizard
