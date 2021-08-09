import { faBullseye, faCheck, faCross, faEdit, faEye, faEyeDropper, faSkullCrossbones, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createHotel, getHotel, updateHotel } from '../../../actions/actionHotel';
import { retrieveProvince } from '../../../actions/actionLocation';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import { useQuery } from '../../../utils/QueryParam';

const AdminHotelEdit = (props) => {
    let queryParam = useQuery();
    let history = useHistory();
    const [isEdit, setIsEdit] = useState(false);
    const [slProvince, setSlProvince] = useState(null);
    const [slDistrict, setSlDistrict] = useState(null);
    const [slWard, setSlWard] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [status, setStatus] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([])
    const [isSuccess, setIsSuccess] = useState(false);
    const [validateError, setValidateError] = useState({
        hotelName: "",
        email: "",
        phone: "",
        contactName: "",
        contactTitle: "",
        numberOfRoom: "",
        street: "",
        province: "",
        district: "",
        ward: ""
    });

    const onChangeProvince = (e) => {
        setSlProvince(JSON.parse(e.target.value));
        setSlDistrict(0);
        setSlWard(0);
        e.target.form.district.value = 0;
        e.target.form.ward.value = 0;
    }

    const onChangeDistrict = (e) => {
        setSlDistrict(JSON.parse(e.target.value));
        setSlWard(0);
        e.target.form.ward.value = 0;
    }

    const onChangeWard = (e) => {
        setSlWard(JSON.parse(e.target.value));
    }

    useEffect(() => {
        let mount = false;

        props.getHotel(queryParam.get("id"));
        props.getProvince();

        return () => {
            mount =true;
        }
    }, [])

    useEffect(() => {
        let mount = false;

        if(props.hotel.success && isSubmit && isSuccess){
            setStatus(true);
        }

        if(status){
            history.push("/admin-hotel-manage");            
        }
        
        if(props.province.data && props.hotel.single){            // && !slProvince && !slDistrict && !slWard
            var pv = props.hotel.single.location.province;
            var dt = props.hotel.single.location.district;
            var w = props.hotel.single.location.ward;

            // setSlProvince(pv);
            // setSlDistrict(dt);
            // setSlWard(w);            
            if(!slProvince){
                setSlProvince(pv);
            }else{
                pv = slProvince;
            }
            
            if(!slDistrict){
                setSlDistrict(dt);
            }else{
                dt = slDistrict;
            }
            
            if(!slWard){
                setSlWard(w);
            }else{
                w = slWard;
            }
            

            var form = document.getElementById("form");
            form.province.value = JSON.stringify(pv);
            form.district.value = JSON.stringify(dt);
            form.ward.value = JSON.stringify(w);            
        }



        return () => {
            mount =true;
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (isValid(form)) {
            //TODO call API
            let data = {...props.hotel.single};
            // var data = {
            data.hotelName = form.hotelName.value;
            data.email = form.email.value;
            data.phone = form.phone.value;
            data.contactName = form.contactName.value;
            data.contactTitle = form.contactTitle.value;
            data.numberOfRoom = form.numberOfRoom.value;
            data.location.street = form.street.value;
            data.location.province.id = slProvince.id;
            data.location.district.id = slDistrict.id;
            data.location.ward.id = slWard.id;
            data.account.password = form.password.value;
            data.retired = false;
            // }
            props.updateHotel(data.id,data);
            setIsSuccess(true);
        }else{
            setIsSuccess(false);
        }
    }

    const isValid = (form) => {
        setIsSubmit(true);
        const err = { ...validateError };
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(form.email.value);
        if (!form.username.value) {
            err.username = "Hotel username is required ";
        } else {
            err.username = "";
        }

        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;            
        if (!form.password.value) {
            err.password = "Hotel password is required ";
        } else {
            if (!regex.test(form.password.value)) {
                err.password = "Password is invalid. (Password must be 8 or more characters, at least one digit, at least one lowercase character and at least one uppercase character.)";
            }else{
                err.password = "";
            }            
        }
        if (!form.hotelName.value) {
            err.hotelName = "Hotel name is required ";
        } else {
            err.hotelName = "";
        }
        if (!form.email.value) {
            err.email = "Email is required ";
        } else if (!result) {
            err.email = "Email is valid";
        } else {
            err.email = "";
        }
        if (!form.phone.value) {
            err.phone = "Phone is required ";
        } else {
            err.phone = "";
        }
        if (!form.contactName.value) {
            err.contactName = "Contact name is required ";
        } else {
            err.contactName = "";
        }
        if (!form.contactTitle.value) {
            err.contactTitle = "Contact title is required ";
        } else {
            err.contactTitle = "";
        }
        if (!form.street.value) {
            err.street = " Street is required ";
        } else {
            err.street = "";
        }
        if (!form.province.value) {
            err.province = " Province is required ";
        } else {
            err.province = "";
        }
        if (!form.district.value) {
            err.district = " District is required ";
        } else {
            err.district = "";
        }
        if (!form.ward.value) {
            err.ward = " Ward is required ";
        } else {
            err.ward = "";
        }
        if (!form.numberOfRoom.value) {
            err.numberOfRoom = " Room Amount is required ";
        } else {
            err.numberOfRoom = "";
        }

        if (
            err.username ||
            err.password ||
            err.hotelName ||
            err.email ||
            err.phone ||
            err.contactName ||
            err.contactTitle ||
            err.numberOfRoom ||
            err.street ||
            err.province ||
            err.district ||
            err.ward
        ) {
            setValidateError(err);
            return false;
        }
        return true;
    }

    const formControlClass = (field) => {
        if(!validateError[field]){
            if(isSubmit){
                return "form-control is-valid";
            }
            return "form-control";
        }
        return "form-control is-invalid";
    }

    const goBack = () => {
        history.push("/admin-hotel-manage");
    }

    return (
        <>
            <div className="bootstrap-scope">
                <div className="container-scroller">
                    <AdminSidebar />
                    <div className="container-fluid page-body-wrapper">
                        <AdminNavbar />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="row">
                                    <div className="col-sm-3">
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title mb-3">{isEdit ? "Edit" : "View"} Hotel</h3>
                                                <button className={!isEdit ? "btn btn-sm btn-primary mb-3" : "btn btn-sm btn-warning mb-3"} onClick={() => setIsEdit(!isEdit)}><FontAwesomeIcon icon={!isEdit ? faEdit : faEye}></FontAwesomeIcon></button>
                                                <form onSubmit={handleSubmit} className="form-sample" autoComplete="false" id="form">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Username*</label>
                                                                <input type="text" className={formControlClass("username")} name="username" defaultValue={props.hotel.single?.account.userName} readOnly/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.username}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Password*</label>
                                                                <input type="password" className={formControlClass("password")} name="password" defaultValue={props.hotel.single?.account.password} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.password}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Hotel Name*</label>
                                                                <input type="text" className={formControlClass("hotelName")} name="hotelName" defaultValue={props.hotel.single?.hotelName} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.hotelName}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Phone Number*</label>
                                                                <input type="tel" className={formControlClass("phone")} name="phone" defaultValue={props.hotel.single?.phone} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.phone}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Email*</label>
                                                                <input type="email" className={formControlClass("email")} name="email" defaultValue={props.hotel.single?.email} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.email}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Room Amount*</label>
                                                                <input type="number" className={formControlClass("numberOfRoom")} min="1" max="50" name="numberOfRoom" defaultValue={props.hotel.single?.numberOfRoom} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.numberOfRoom}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Contact Name*</label>
                                                                <input type="text" className={formControlClass("contactName")} name="contactName" defaultValue={props.hotel.single?.contactName} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.contactName}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Contact Title*</label>
                                                                <input type="text" className={formControlClass("contactTitle")} name="contactTitle" defaultValue={props.hotel.single?.contactTitle} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.contactTitle}</div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="col-form-label">*Please enter address</label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Street*</label>
                                                                <input type="text" className={formControlClass("street")} name="street" defaultValue={props.hotel.single?.location.street} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.street}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Province*</label>
                                                                <select className={formControlClass("province")} name="province" onChange={onChangeProvince} defaultValue={slProvince} readOnly={!isEdit} disabled={!isEdit}>
                                                                    <option value="0">---</option>
                                                                    {props.province.data?.map(province => <option key={province.id} value={JSON.stringify(province)}>{province.name}</option>)}
                                                                </select>
                                                                <div className="invalid-feedback">{validateError.province}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="col-form-label">District*</label>
                                                                <select className={formControlClass("district")} name="district" onChange={onChangeDistrict} defaultValue={slDistrict} readOnly={!isEdit} disabled={!isEdit}>
                                                                    <option value="0">---</option>
                                                                    {slProvince?.districts?.map(district => <option key={district.id} value={JSON.stringify(district)}>{district.name}</option>)}
                                                                </select>
                                                                <div className="invalid-feedback">{validateError.district}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Ward*</label>
                                                                <select className={formControlClass("ward")} name="ward" onChange={onChangeWard} defaultValue={slWard} readOnly={!isEdit} disabled={!isEdit}>
                                                                    <option value="0">---</option>
                                                                    {slDistrict?.wards?.map(ward => <option key={ward.id} value={JSON.stringify(ward)}>{ward.name}</option>)}
                                                                </select>
                                                                <div className="invalid-feedback">{validateError.ward}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3"></div>
                                                        <div className="col-md-3">
                                                            {isEdit && <button type="submit" className="btn btn-lg btn-success btn-block"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>}
                                                        </div>
                                                        <div className="col-md-3">
                                                            <button onClick={goBack} type="reset" className="btn btn-lg btn-danger btn-block"><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></button>
                                                        </div>
                                                        <div className="col-md-3"></div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <AdminFooter />
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotels,
        province: state.province
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => {
            dispatch(getHotel(id))
        },
        updateHotel: (id, data) => {
            dispatch(updateHotel(id, data));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotelEdit);
