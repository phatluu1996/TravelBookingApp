import React, { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'
import { connect } from 'react-redux';
import Select from "react-select";
import { fetchFlight } from '../../../actions/actionFlight';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneArrival, faPlaneDeparture, faCalendar, faRetweet, faSearch, faUserFriends, faChild, faBaby, faMale, faChair } from '@fortawesome/free-solid-svg-icons'

const province = {
    properties: [
        {
            value: '',
            label: 'None'
        },
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

const seatClass = {
    properties: [
        {
            value: 'ECONOMY',
            label: 'Economy'
        },
        {
            value: 'BUSINESS',
            label: 'Business'
        }
    ]
}
function FlightBannerSearchInput(props) {
    const [isReturn, setIsReturn] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props);
        var form = e.target;
        props.getFlight(form.from.value, form.to.value, form.adult.value, form.child.value, form.infant.value, form.departureDate.value, form.returnDate.value, form.seatClass.value);
        history.push(`/flight-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatClass=${form.seatClass.value}`);
    }

    const swapCity = (e) => {
        e.preventDefault();
        if (e.currentTarget.classList.contains("click")) {
            e.currentTarget.classList.remove("click");
        } else {
            e.currentTarget.classList.add("click");
        }
        let temp = document.querySelector("#departure-city").value;
        document.querySelector("#departure-city").value = document.querySelector("#arrival-city").value;
        document.querySelector("#arrival-city").value = temp;
    }

    return (
        <div>
            <form className="banner-search-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="departure-city" className="font-weight-bold text-secondary">From</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPlaneDeparture} /></span>
                            </div>
                            <select className="form-control" name="from" id="departure-city">
                                {province.properties.map(province => <option key={province.value} value={province.value}>{province.label} {province.value ?"(" + province.value + ")" : ""}</option>)}
                            </select>
                        </div>

                    </div>
                    <div className="col-md-auto swap-btn">
                        <label></label>
                        <div className="input-group">
                            <button onClick={swapCity} className="btn btn-primary btn-circle rotate mt-2"><FontAwesomeIcon icon={faRetweet} color="#FFFFFF" /></button>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="arrival-city" className="font-weight-bold text-secondary">To</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faPlaneArrival} /></span>
                            </div>
                            <select className="form-control" name="to" id="arrival-city">
                                {province.properties.map(province => <option key={province.value} value={province.value}>{province.label} {province.value ?"(" + province.value + ")" : ""}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-group col">
                        <label htmlFor="adult" className="font-weight-bold text-secondary">Adults</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text" id="basic-addon1" title="Age 12 and over">
                                    <FontAwesomeIcon icon={faMale} />
                                </div>
                            </div>
                            <input type='number' min={1} className="form-control" id="adult" name="adult" defaultValue={1} />
                        </div>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="child" className="font-weight-bold text-secondary">Childs</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text" id="basic-addon2" title="Age 2 - 11">
                                    <FontAwesomeIcon icon={faChild} />
                                </div>
                            </div>
                            <input type='number' min={0} className="form-control" id="child" name="child" defaultValue={0} />
                        </div>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="infant" className="font-weight-bold text-secondary">Infants</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text" id="basic-addon3" title="Age below 2">
                                    <FontAwesomeIcon icon={faBaby} />
                                </div>
                            </div>
                            <input type='number' min={0} className="form-control" id="infant" name="infant" defaultValue={0} />
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3 mr-40">
                        <label htmlFor="departureDay" className="font-weight-bold text-secondary">Departure Date</label>
                        <div className='input-group' >
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon4"><FontAwesomeIcon icon={faCalendar} /></span>
                            </div>
                            <input type='date' className="form-control" name="departureDate" id="departureDate" />
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="checkbox" className="form-check-input ml-auto" id="returnCheck" onClick={(e) => setIsReturn(!isReturn)} defaultValue={isReturn} />
                        <label htmlFor="returnDay" className="font-weight-bold text-secondary ml-3">Return Date</label>
                        <div className='input-group' hidden={!isReturn}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon5"><FontAwesomeIcon icon={faCalendar} /></span>
                            </div>
                            <input type='date' className="form-control" name="returnDate" id="returnDate" />
                        </div>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="arrival-city" className="font-weight-bold text-secondary">Seat Class</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon6"><FontAwesomeIcon icon={faChair} /></span>
                            </div>
                            <select className="form-control" name="seatClass" id="seatClass">
                                {seatClass.properties.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group col mt-2">
                        <label htmlFor="search-button" className="font-weight-bold text-secondary"></label>
                        <div className="input-group">
                            <button className="btn btn-primary" type="submit"><FontAwesomeIcon icon={faSearch} color="#ffff" id="search-button"/> Search Flights</button>
                        </div>
                    </div>
                    <div className="form-group col"></div>
                </div>
            </form>
        </div>);
}

const mapStateToProps = (state, ownProps) => {
    return {
        flights: state.flight,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatClass) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatClass))
        },        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightBannerSearchInput);
