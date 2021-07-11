import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { connect } from 'react-redux';
import Select from "react-select";
import { fetchFlight } from '../../../actions/actionFlight';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


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
        <>
            <form onSubmit={handleSubmit} className="main-search-input">
                {/* <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                                <span className="form-icon">
                                    <FiSearch />
                                </span>
                                <input className="form-control" type="text" placeholder="What are you looking for?" />
                            </div>
                        </form>
                    </div>
                </div> */}
                <div className="main-search-input-item location">
                    <Select name="from"
                        placeholder="Departure City"
                        options={province.properties}
                    />
                </div>
                <div className="main-search-input-item location">
                    <Select name="to"
                        placeholder="Arrival City"
                        options={province.properties}
                    />
                </div>
                <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <div className="form-group mb-0">
                            <span className="form-icon">
                                <FiSearch />
                            </span>
                            <input className="date-range form-control" type="date" placeholder="" name="departureDay" />
                        </div>
                    </div>
                </div>
                {/* <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                                <span className="form-icon">
                                    <FaDollarSign />
                                </span>
                                <input type="number" className="form-control" placeholder="Filter by price" />
                            </div>
                        </form>
                    </div>
                </div> */}

                <div className="main-search-input-btn">
                    <button className="button theme-btn" type="submit">Search</button>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        flights : state.flight,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight : (from, to, ddate) => {
            dispatch(fetchFlight(from, to, ddate))    
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(FlightBannerSearchInput);
