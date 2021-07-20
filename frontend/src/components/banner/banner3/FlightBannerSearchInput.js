import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { connect } from 'react-redux';
import Select from "react-select";
import { fetchFlight } from '../../../actions/actionFlight';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneArrival, faPlaneDeparture, faCalendar, faRetweet } from '@fortawesome/free-solid-svg-icons'


const province = {
    selectedPropertyOp: null,
    properties: [
        {
            value: 'SGN',
            label: 'TP.HCM'
        }, {
            value: 'HAN',
            label: 'Hà Nội'
        }, {
            value: 'DAD',
            label: 'Đà Nẵng'
        }, {
            value: 'CXR',
            label: 'Nha Trang'
        }, {
            value: 'DLI',
            label: 'Đà Lạt'
        }, {
            value: 'PQC',
            label: 'Phú Quốc'
        }, {
            value: 'VCA',
            label: 'Cần Thơ'
        }, {
            value: 'VCS',
            label: 'Côn Đảo'
        }, {
            value: 'VKG',
            label: 'Rạch Giá'
        }, {
            value: 'CAH',
            label: 'Cà Mau'
        }, {
            value: 'BMV',
            label: 'Buôn Ma Thuộc'
        }, {
            value: 'UIH',
            label: 'Quy Nhơn'
        }, {
            value: 'THD',
            label: 'Thanh Hóa'
        }, {
            value: 'VII',
            label: 'Vinh'
        }, {
            value: 'HUI',
            label: 'Huế'
        }, {
            value: 'VDH',
            label: 'Đồng Hới'
        }, {
            value: 'TBB',
            label: 'Tuy Hòa'
        }, {
            value: 'VCL',
            label: 'Chu Lai'
        }, {
            value: 'PXU',
            label: 'Pleiku'
        }, {
            value: 'HPH',
            label: 'Hải Phòng'
        }, {
            value: 'DIN',
            label: 'Điện Biên'
        }, {
            value: 'VDO',
            label: 'Vân Đồn'
        }
    ]
}
function FlightBannerSearchInput(props) {
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props);
        var form = e.target;
        // dispatch(fetchFlight(form.from.value, form.to.value, form.departureDay.value));
        props.getFlight(form.from.value, form.to.value, form.departureDay.value);
        history.push(`/flight-list?from=${form.from.value}&to=${form.to.value}&departureDay=${form.departureDay.value}`);
    }

    return (
        <form className="banner-search-form">
            <div className="form-row">
                <div className="form-group col-md-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPlaneDeparture} /></span>
                        </div>
                        <select className="form-control" name="from">
                            {province.properties.map(province => <option key={province.value} value={province.value}>{province.label}</option>)}
                        </select>
                    </div>

                </div>
                <div className="form-group col-sm-1">
                    <button  className="form-control radius-rounded"><FontAwesomeIcon icon={faRetweet} color="#ff6b6b" /></button>
                </div>
                <div className="form-group col-md-3">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPlaneArrival} /></span>
                        </div>
                        <select className="form-control" name="to">
                            {province.properties.map(province => <option key={province.value} value={province.value}>{province.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className="form-group col-md-3">
                    <div className='input-group date' id='datetimepicker1'>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faCalendar} /></span>
                        </div>
                        <input type='text' className="form-control" name="departureDay" />
                    </div>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit} className="main-search-input">
                <div className="main-search-input-item">
                    <FontAwesomeIcon icon={faPlaneDeparture} className="mr-2"/>  
                    <label>Departure City</label>
                    <Select name="from"
                        placeholder="Departure City"
                        options={province.properties}
                    />
                </div>
                <div className="main-search-input-item">
                    <FontAwesomeIcon icon={faPlaneArrival} className="mr-2"/>  
                    <label>Arrival City</label>
                    <Select name="to"
                        placeholder="Arrival City"
                        options={province.properties}
                    />
                </div>
                <div className="main-search-input-item">                    
                    <div className="contact-form-action">                        
                        <div className="form-group mb-0">
                            <FontAwesomeIcon icon={faCalendar} className="mr-2"/>  
                            <input className="date-range form-control" type="date" placeholder="" name="departureDay" />
                        </div>
                    </div>
                </div>
            </form> */}

        </form>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        flights: state.flight,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, ddate) => {
            dispatch(fetchFlight(from, to, ddate))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightBannerSearchInput);
