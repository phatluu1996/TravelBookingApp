import React, { useState } from 'react';
import { FiMap } from 'react-icons/fi'
import { FaMapSigns } from 'react-icons/fa'
import { BsFileCode } from 'react-icons/bs'
import Select from "react-select";
import SelectCountry from "../common/SelectCountry";

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
const status = {
    properties: [
        {
            value: 'Available',
            label: 'AVAILABLE'
        },
        {
            value: 'codeshare',
            label: 'CODESHARE'
        }
    ]
}

   
const AddNewFlight = (props) => {
    const [selectedDProvince, setSelectedDProvince] = useState('SGN')
    const [selectedAProvince, setSelectedAProvince] = useState('SGN')
    const [selectedStatus, setSelectedStatus] = useState('Available')
    

    const handleChangeDProvince = (selectedDProvince) => {
        setSelectedDProvince(selectedDProvince)
    }
    const handleChangeAProvince = (selectedAProvince) => {
        setSelectedAProvince(selectedAProvince)
    }
    const handleChangeStatus = (selectedStatus) => {
        setSelectedStatus(selectedStatus)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        // if (validateForm(e)) {
        //     props.doSignup(form.firstName.value, form.lastName.value, form.userName.value, form.email.value, form.password.value);
        // }
    }

        return (
            <>
                <div className="billing-form-item">
                    <div className="billing-title-wrap">
                        <h3 className="widget-title pb-0">
                            Add New Flight
                        </h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="billing-content">
                        <div className="contact-form-action">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-box col-8">
                                            <label className="label-text">Flight Code</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <FiMap />
                                                </span>
                                                <input className="form-control" type="text" name="flightCode" placeholder="AF0123" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">Departure City</label>
                                            <div className="form-group">
                                                <Select
                                                    value={selectedDProvince}
                                                    onChange={handleChangeDProvince}
                                                    placeholder="Select city"
                                                    options={province.properties}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">Arrival City</label>
                                            <div className="form-group">
                                                <Select
                                                    value={selectedAProvince}
                                                    onChange={handleChangeAProvince}
                                                    placeholder="Select city"
                                                    options={province.properties}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="input-box">
                                            <label className="label-text">Departure Time</label>
                                            <div className="form-group">
                                            <input className="form-control" type="text" name="arrivalTime" placeholder="12:00" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="input-box">
                                            <label className="label-text">Arrival Time</label>
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="arrivalTime" placeholder="12:00" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="input-box">
                                            <label className="label-text">Aircraft</label>
                                            <div className="form-group">
                                                <input className="form-control" type="text" name="aircraftType" placeholder="Aircraft A320" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Business Capacity</label>
                                            <div className="form-group">
                                                <input className="form-control" type="number" name="businessCapacity" placeholder="16" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Business Price Ticket(USD)</label>
                                            <div className="form-group">
                                                <input className="form-control" type="number" name="businessPrice" placeholder="200" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Business Baggage Allowance</label>
                                            <div className="form-group">
                                            <input className="form-control" type="number" name="businessBaggage" placeholder="30" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Business Cabin-Baggage Allowance</label>
                                            <div className="form-group">
                                                <input className="form-control" type="number" name="businessCabinBaggage" placeholder="18" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Economy Capacity</label>
                                            <div className="form-group">
                                            <input className="form-control" type="number" name="economyCapacity" placeholder="160" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Economy Price Ticket(USD)</label>
                                            <div className="form-group">
                                            <input className="form-control" type="number" name="economyPrice" placeholder="100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Economy Baggage Allowance</label>
                                            <div className="form-group">
                                            <input className="form-control" type="number" name="economyBaggage" placeholder="0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="input-box">
                                            <label className="label-text">Economy Cabin-Baggage Allowance</label>
                                            <div className="form-group">
                                            <input className="form-control" type="number" name="economyCabinBaggage" placeholder="7" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-box col-lg-3">
                                            <label className="label-text">Child Price</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    
                                                </span>
                                                <input className="form-control" type="number" name="child_price" placeholder="50" />
                                            </div>
                                        </div>
                                        <div className="input-box col-lg-3">
                                            <label className="label-text">Infant Price</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    
                                                </span>
                                                <input className="form-control" type="number" name="infant_price" placeholder="10" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="col-lg-6">
                                            <div className="input-box">
                                                <label className="label-text">Status</label>
                                                <div className="form-group">
                                                    <Select
                                                        value={selectedStatus}
                                                        onChange={handleChangeStatus}
                                                        options={status.properties}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-box">
                                            <label className="label-text">Description</label>
                                            <div className="form-group">
                                            <textarea className="form-control" name="description" placeholder="Hành lý mua tại thời điểm đặt vé, Hàng ghế 3-3" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="custom-checkbox d-block mr-0">
                                            <input type="checkbox" name="hasEntertainment" />
                                            <label htmlFor="terms">Entertainment in Flight 
                                            </label>
                                        </div>
                                    </div>
                                    <input className="form-control" type="number" name="airline" value={props.airlineId} hidden />
                                    <div className="col-lg-12">
                                        <div className="btn-box mt-2">
                                            <button type="submit" className="theme-btn border-0">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }


export default AddNewFlight;