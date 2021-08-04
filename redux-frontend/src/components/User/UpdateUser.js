import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/actionUser';
import { importAll } from "../../utils/JqueryImport";
import {getUser, setUserSession, getToken} from '../../utils/Common';

const UpdateUser = (props) => {
    const dataUser = props.dataUser.data;
    const [selectProvince, setSelectProvince] = useState(dataUser?.location?.province);
    const [selectDistrict, setSelectDistrict] = useState(dataUser?.location?.district);
    const [selectWard, setSelectWard] = useState(dataUser?.location?.ward);
    const [errUpdate, setErrUpdate] = useState(false);
    const [responseMessageUpdate, setResponseMessageUpdate] = useState("");
    const [isRequest, setIsRequest] = useState(false);
    const [gender, setGender] = useState(props.gender);
    const [validateInput, setValidateInput] = useState({
        firstName: '',
        lastName: '',
        birthday:'',
        phoneNumber:'',
        email: '',
        address:'',
        province:'',
        district:'',
        ward:'',
        postalCode:'',
        errLogic: ''
    });

    const handleGenderClick = (e) => {
        e.preventDefault();
        if (e.currentTarget.innerHTML === "F") {
            setGender("Female");
        } else { setGender("Male"); }
    }

    useEffect(() => {
        let mount = false;
        importAll();        

        document
            .querySelector("#provinces")
            .parentElement.querySelector(".customSelectInner").innerHTML = dataUser?.location?.province?.name;
        document
            .querySelector("#provinces").value = dataUser?.location?.province?.id;
        document
            .querySelector("#districts")
            .parentElement.querySelector(".customSelectInner").innerHTML = dataUser?.location?.district?.name;
        document
            .querySelector("#districts").value = dataUser?.location?.district?.id;
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = dataUser?.location?.ward?.name;
        document
            .querySelector("#wards").value = dataUser?.location?.ward?.id;
        
        return () => {
            mount = true;
        }
    }, []);

    useEffect(()=>{
        var mount = false;
        if(props.dataUpdate?.form === 'errUpdateUser'){
            setErrUpdate(true);
            setResponseMessageUpdate("Update fail. "+props.dataUpdate?.message.response.data.message);
        }
        if (props.dataUpdate?.form === 'successUpdateUser') {
            if (!props.dataUpdate?.data) {
                document.location.href = "/";
            }
            if (props.dataUpdate?.data && props.dataUpdate?.success) {
                setErrUpdate(false);
                setResponseMessageUpdate("Update successfuly!");
            }else if(props.dataUpdate?.data && !props.dataUpdate?.success){
                console.log(props.dataUpdate?.message.response.data.message);
                setResponseMessageUpdate(props.dataUpdate?.data.message);
            }
        }

        return () => {
            mount = true;
        }
    });

    const onChangeProvince = (e) => {
        document
            .querySelector("#districts")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        if (e.currentTarget.id === "0" || e.currentTarget.value === "0") {
            setSelectDistrict(null);
            setSelectProvince(null);
            setSelectWard(null);
        } else {
            setSelectProvince(
                props.province.data.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
            setSelectDistrict(null);
            setSelectWard(null);
        }
    };
    const onChangeDistrict = (e) => {
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        if (e.currentTarget.id === "0"  || e.currentTarget.value === '0') {
            setSelectDistrict(null);
            setSelectWard(null);
        } else {
            setSelectDistrict(
                selectProvince.districts.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
            setSelectWard(null);
        }
    };
    const onChangeWard = (e) => {
        if (e.currentTarget.id === "0"  || e.currentTarget.value === '0') {
            setSelectWard(null);
        } else {
            setSelectWard(
                selectDistrict.wards.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if(validateForm(e)){
            let data = {...dataUser};

            data.firstName = form.firstName.value;
            data.lastName = form.lastName.value;
            data.gender = gender;
            data.dateOfBirth = form.birthday.value;
            data.email = form.email.value;
            data.location.street = form.address.value;
            data.location.province = selectProvince;
            data.location.district = selectDistrict;
            data.location.ward = selectWard;
            data.location.postalCode = form.postalCode.value;

            props.updateUser(data);
            setIsRequest(true);
        }
    }

    const validateForm = (e) => {
        var form = e.target;
        let submitErr = { ...validateInput };

        if (!form.firstName.value) {submitErr.firstName = "First name is required!"} else {submitErr.firstName = "";}
        if (!form.lastName.value) {submitErr.lastName = "Last name is required!"} else {submitErr.lastName = "";}
        if (!form.birthday.value) {submitErr.birthday = "Birthday is required!"} else {submitErr.birthday = "";}
        if (!form.phoneNumber.value) {submitErr.phoneNumber = "Phone number is required!"} else {submitErr.phoneNumber = "";}
        if (!form.email.value) {submitErr.email = "Email is required!"} else {submitErr.email = "";}
        if (!form.address.value) {submitErr.address = "Address is required!"} else {submitErr.address = "";}
        if (!selectProvince) {submitErr.province = "Province";} else {submitErr.province = "";}
        if (!selectDistrict) {submitErr.district = "District";} else {submitErr.district = "";}
        if (!selectWard) {submitErr.ward = "Ward";} else {submitErr.ward = "";}
        if (!form.postalCode.value) {submitErr.postalCode = "Postal Code is required!"} else {submitErr.postalCode = "";}
        
        if(     submitErr.firstName || submitErr.lastName || submitErr.birthday || submitErr.phoneNumber
            ||  submitErr.email || submitErr.address || submitErr.province || submitErr.district 
            ||  submitErr.ward || submitErr.postalCode){
            setValidateInput(submitErr);
            return false;
        }

        if( dataUser.firstName === form.firstName.value && dataUser.lastName === form.lastName.value && dataUser.dateOfBirth === form.birthday.value 
            && dataUser.phoneNumber === form.phoneNumber.value && dataUser.email === form.email.value && dataUser.location.street === form.address.value 
            && dataUser.location.province.id === selectProvince.id && dataUser.location.district.id === selectDistrict.id && dataUser.location.ward.id === selectWard.id
            && dataUser.location.postalCode === form.postalCode.value){
                setErrUpdate(true);
                setResponseMessageUpdate("No data change.");
                return false;
            }
        return true;
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <div className="booking-form">
                    <div>
                        <div className="booking-form-i">
                            <label className="autorize-input-lbl">First Name:</label>
                            <div className="validate-error">{validateInput.firstName}</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.firstName ? 'is-invalid' : ''}`} ><input type="text" name="firstName" defaultValue={dataUser?.firstName} /></div>
                        </div>
                        <div className="booking-form-i">
                            <label className="autorize-input-lbl" style={{marginTop:0}}>Last Name:</label>
                            <div className="validate-error" style={{marginTop:0}}>{validateInput.lastName}</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.lastName ? 'is-invalid' : ''}`}><input type="text" name="lastName" defaultValue={dataUser?.lastName} /></div>
                        </div>
                        <div className="clear"></div>
                    </div>

                    <div>
                        <div className="booking-form-i">
                            <div className="form-sex">
                                <label>Male/Female</label>
                                <div className={`sex-type ${gender === "Male" ? "chosen" : ""}`} onClick={handleGenderClick}>M</div>
                                <div className={`sex-type ${gender === "Female" ? "chosen" : ""}`} onClick={handleGenderClick}>F</div>
                                <div className="clear"></div>
                            </div>

                            <div className="srch-tab-left"style={{ minWidth:'240px' }}>
                                <label className='autorize-input-lbl'>Date of birth:</label>
                                <div className="validate-error" style={{ margin: "0" }}>{validateInput.birthday}</div>
                                <div className="clear"></div>
                                <div className={`input-a ${validateInput.birthday ? "is-invalid" : ""}`} >
                                    <input
                                        type="text"
                                        className="date-inpt"
                                        placeholder="mm/dd/yyyy"
                                        name="birthday"
                                        defaultValue={dataUser?.dateOfBirth}
                                    />
                                    <span className="date-icon"></span>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="booking-form-i">
                            <label className='autorize-input-lbl'>Phone number:</label>
                            <div className="validate-error">{validateInput.phoneNumber}</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.phoneNumber ? "is-invalid" : ""}`}>
                                <input type="text" name='phoneNumber' defaultValue={dataUser?.phoneNumber} />
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>

                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: 0 }}>
                            <label className="autorize-input-lbl">Email:</label>
                            <div className="validate-error">{validateInput.email}</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.email ? 'is-invalid' : ''}`}><input type="text" name="email" defaultValue={dataUser?.email} /></div>
                        </div>
                        <div style={{ color: 'grey', marginBottom: '10px' }}><i>*Please enter Address to booking flight or hotel.</i></div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: '10px' }}>
                            <label className="autorize-input-lbl">Address:</label>
                            <div className="validate-error">{validateInput.address}</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.address ? 'is-invalid' : ''}`}>
                                <input type="text" name="address" defaultValue={dataUser?.location.street} />
                            </div>
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
                                    >
                                        <option key={0} value={0}>
                                            --
                                        </option>
                                        {props.province?.data?.map((item) => (
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
                                        defaultValue={dataUser?.location?.district?.id}
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
                                        defaultValue={dataUser?.location?.ward?.id}
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
                        {(validateInput.province || validateInput.district || validateInput.ward) && 
                        <div className="booking-error-input">Province, District and Ward is required</div>}
                    </div>
                    <div style={{ marginBottom: "10px", color: 'grey' }}><i>*Please enter Address to booking flight or hotel.</i></div>
                    <div>
                        <div className="booking-form-i">
                            <label className="autorize-input-lbl">Postal Code:</label>
                            <div className="validate-error">{validateInput.postalCode}</div>
                            <div className="clear"></div>
                            <div className="input"><input type="text" name="postalCode" defaultValue={dataUser?.location.postalCode} /></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="booking-complete" style={{ float: 'left' }}>
                    <button className="booking-complete-btn" type="submit" style={{ marginTop: '0' }}>Update</button>
                </div>
                <div style={{color: errUpdate ? "red" : "green", paddingLeft:'20px',float:'left'}}>{responseMessageUpdate}</div>
                <div className="clear"></div>
            </form>
        </div>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        dataUpdate: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (data) =>{
            dispatch(updateUser(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);