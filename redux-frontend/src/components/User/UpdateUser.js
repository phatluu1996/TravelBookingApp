import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { retrieveProvince } from '../../actions/actionLocation';
import { updateUser } from '../../actions/actionUser';
import { importAll } from "../../utils/JqueryImport";

const UpdateUser = (props) => {
    const dataUser = props.dataUser.data;
    const [selectProvince, setSelectProvince] = useState(dataUser.location.province);
    const [selectDistrict, setSelectDistrict] = useState(dataUser.location.district);
    const [selectWard, setSelectWard] = useState(dataUser.location.ward);
    const [allDistrict, setAllDistrict] = useState(null);
    const [allWard, setAllWard] = useState(null);
    const [statusSignup, setStatuSignup] = useState(false);
    const [messageSignup, setMessageSignup] = useState("");
    const [isRequest, setIsRequest] = useState(false);
    const [isMale, setIsMale] = useState(props.gender);
    const [validateError, setValidateError] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreePolicy: '',
        errLogic: ''
    });

    const handleChange = (e) => {

    }

    const handleGenderClick = (e) => {
        e.preventDefault();
        if (e.currentTarget.innerHTML === "F") {
            setIsMale("Female");
        } else { setIsMale("Male"); }
    }

    useEffect(() => {
        let mount = false;
        importAll();
        props.getProvince();

        document
            .querySelector("#provinces")
            .parentElement.querySelector(".customSelectInner").innerHTML = dataUser?.location.province.name;
        document
            .querySelector("#districts")
            .parentElement.querySelector(".customSelectInner").innerHTML = dataUser?.location.district.name;
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = dataUser?.location.ward.name;
        return () => {
            mount = true;
        }
    }, []);

    const onChangeProvince = (e) => {
        document
            .querySelector("#districts")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        if (e.currentTarget.id === "0") {
            setSelectDistrict(null);
            setSelectProvince(null);
            setSelectWard(null);
        } else {
            setSelectProvince(
                props.provinces.data.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
        }
    };
    const onChangeDistrict = (e) => {
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        if (e.currentTarget.id === "0") {
            setSelectDistrict(null);
            setSelectWard(null);
        } else {
            setSelectDistrict(
                selectProvince.districts.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
        }
    };
    const onChangeWard = (e) => {
        setSelectWard(
            selectDistrict.wards.find(
                (item) => item.id === parseInt(e.currentTarget.value)
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if(validateForm){
            let data = dataUser;

            data.firstName = form.firstName.value;
            data.lastName = form.lastName.value;
            data.gender = isMale;
            data.dateOfBirth = form.birthday.value;
            data.email = form.email.value;
            data.location.street = form.address.value;
            data.location.province.id = parseInt(selectProvince.id);
            data.location.district.id = parseInt(selectDistrict.id);
            data.location.ward.id = parseInt(selectWard.id);
            data.location.postalCode = form.postalCode.value;

            console.log(data);

            props.updateUser(data);
            setIsRequest(true);
        }
    }

    const validateForm = () => {
        return true;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="booking-form">
                    <div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">First Name:</label>
                            <div className={`input ${validateError.firstName ? 'is-invalid' : ''}`} ><input type="text" name="firstName" defaultValue={dataUser ? dataUser.firstName : ""} /></div>
                            <div className="booking-error-input">{validateError.firstName}</div>
                        </div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">Last Name:</label>
                            <div className={`input ${validateError.lastName ? 'is-invalid' : ''}`}><input type="text" name="lastName" defaultValue={dataUser ? dataUser.lastName : ""} /></div>
                            <div className="booking-error-input">{validateError.lastName}</div>
                        </div>
                        <div className="clear"></div>
                    </div>

                    <div>
                        <div className="booking-form-i">
                            <div className="form-sex">
                                <label>Male/Female</label>
                                <div className={`sex-type ${isMale === "Male" ? "chosen" : ""}`} onClick={handleGenderClick}>M</div>
                                <div className={`sex-type ${isMale === "Female" ? "chosen" : ""}`} onClick={handleGenderClick}>F</div>
                                <div className="clear"></div>
                            </div>

                            <div className="srch-tab-left">
                                <label>Date of birth:</label>
                                <div className="input-a" style={{ width: "230px" }}>
                                    <input
                                        type="text"
                                        className="date-inpt"
                                        placeholder="mm/dd/yyyy"
                                        name="birthday"
                                        defaultValue={dataUser ? dataUser.dateOfBirth : ""}
                                    />
                                    <span className="date-icon"></span>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="booking-form-i">
                            <label>Phone number:</label>
                            <div className="input"><input type="text" defaultValue={dataUser ? dataUser.phoneNumber : ""} /></div>
                        </div>
                        <div className="clear"></div>
                    </div>

                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: 0 }}>
                            <label className="custom-lbl">Email:</label>
                            <div className="booking-error-input">{validateError.email}</div>
                            <div className={`input ${validateError.email ? 'is-invalid' : ''}`}><input type="text" name="email" onChange={handleChange} defaultValue={dataUser ? dataUser.email : ""} /></div>
                            <div className="booking-error-input">{validateError.email}</div>
                        </div>
                        <div style={{ color: 'grey', marginBottom: '10px' }}><i>*Please enter Address to booking flight or hotel.</i></div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: '10px' }}>
                            <label className="custom-lbl">Address:</label>
                            <div className="booking-error-input">{validateError.email}</div>
                            <div className={`input ${validateError.email ? 'is-invalid' : ''}`}><input type="text" name="address" onChange={handleChange} defaultValue={dataUser ? dataUser.location.street : ""} /></div>
                            <div className="booking-error-input">{validateError.email}</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="srch-tab-line no-margin-bottom">
                            <div className="srch-tab-3c">
                                <label>Province</label>
                                <div className="select-wrapper">
                                    <select
                                        onChange={onChangeProvince}
                                        className="custom-select"
                                        name="province"
                                        id="provinces"
                                        defaultValue={dataUser?.location.province.id}
                                    >
                                        <option key={0} value={0}>
                                            --
                                        </option>
                                        {props.provinces?.data?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="srch-tab-3c">
                                <label>District</label>
                                <div className="select-wrapper">
                                    <select
                                        onChange={onChangeDistrict}
                                        className="custom-select"
                                        name="district"
                                        id="districts"
                                        defaultValue={dataUser ? dataUser.location.district.id : ""}
                                    >
                                        <option key={0} value={0}>
                                            --
                                        </option>
                                        {selectProvince?.districts?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="srch-tab-3c">
                                <label>Ward</label>
                                <div className="select-wrapper">
                                    <select
                                        className="custom-select"
                                        name="ward"
                                        id="wards"
                                        defaultValue={dataUser ? dataUser.location.ward.id : ""}
                                        onChange={onChangeWard}
                                    >
                                        <option key={0} value={0}>
                                            --
                                        </option>
                                        {selectDistrict?.wards?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: "10px", color: 'grey' }}><i>*Please enter Address to booking flight or hotel.</i></div>
                    <div>
                        <div className="booking-form-i">
                            <label>Postal Code:</label>
                            <div className="input"><input type="text" name="postalCode" defaultValue={dataUser ? dataUser.location.postalCode : ""} /></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="booking-complete" style={{ float: 'left' }}>
                    <button className="booking-complete-btn" type="submit" style={{ marginTop: '0' }}>Update</button>
                </div>
                <div className="clear"></div>
            </form>
        </div>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        provinces: state.province,
        dataUpdate: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        updateUser: (id,data) =>{
            dispatch(updateUser(id,data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);