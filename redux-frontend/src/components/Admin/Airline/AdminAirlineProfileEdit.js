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
import { clearAirlineState, getAirline, updateAirline } from '../../../actions/actionAirline';

const AdminAirlineProfileEdit = (props) => {
    let queryParam = useQuery();
    let history = useHistory();
    const [isEdit, setIsEdit] = useState(false);
    const [slProvince, setSlProvince] = useState(null);
    const [slDistrict, setSlDistrict] = useState(null);
    const [slWard, setSlWard] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [airline, setAirline] = useState(null);
    const [validateError, setValidateError] = useState({
        username: "",
        password: "",
        airlineName: "",
        email: "",
        phone: "",
        mobile: "",
        fax:"",
        contactName: "",
        contactTitle: "",
        homepage: "",
        street: "",
        province: "",
        district: "",
        ward: ""
    });

    const onChangeProvince = (e) => {
        setSlProvince(props.province.data.find(pv => pv.id == parseInt(e.target.value)));
        setSlDistrict(null);
        setSlWard(null);
        e.target.form.district.value = 0;
        e.target.form.ward.value = 0;
    }

    const onChangeDistrict = (e) => {
        setSlDistrict(slProvince.districts.find(dt => dt.id == parseInt(e.target.value)));
        setSlWard(null);
        e.target.form.ward.value = 0;
    }

    const onChangeWard = (e) => {
        setSlWard(slDistrict.wards.find(w => w.id == parseInt(e.target.value)));
    }

    useEffect(() => {
        let mount = false;

        props.getAirline(queryParam.get("id"));
        props.getProvince();

        return () => {
            mount =true;
        }
    }, [])

    useEffect(() => {
        let mount = false;

        if(props.airline.success && isSubmit && isSuccess){            
            setIsEdit(false);
            setIsSuccess(false);
            props.clearState();
        }

        // if(status){
        //     history.push("/admin-airline-manage");
        // }
        
        if(props.province.data && props.airline.single && !airline){  
            setAirline(props.airline.single);
            var pv = props.airline.single.location.province;
            var dt = props.airline.single.location.district;
            var w = props.airline.single.location.ward;

            setSlProvince(pv);
            setSlDistrict(dt);
            setSlWard(w);          
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
            let data = {...airline};
            // var data = {
            data.airlineName = form.airlineName.value;
            data.email = form.email.value;
            data.phone = form.phone.value;
            data.contactName = form.contactName.value;
            data.contactTitle = form.contactTitle.value;
            data.mobile = form.mobile.value;
            data.fax = form.fax.value;
            data.location.street = form.street.value;
            data.location.province = slProvince;
            data.location.district = slDistrict;
            data.location.ward = slWard;
            data.account.password = form.password.value;
            data.retired = false;            
            data.homepage = form.homepage.value;
            data.flights = null;
            // }
            props.updateAirline(data.id,data);
            setIsSuccess(true);
        }else{
            setIsSuccess(false);
        }
    }

    const isValid = (form) => {
        setIsSubmit(true);
        const err = { ...validateError };
        const pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(form.email.value);
        if (!form.username.value) {
            err.username = "Hotel username is required ";
        } else {
            err.username = "";
        }

        let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
        if (!form.password.value) {
            err.password = "Airline password is required ";
        } else {
            if (!regex.test(form.password.value)) {
                err.password = "Password is invalid. (Password must be 8 or more characters, at least one digit, at least one lowercase character and at least one uppercase character.)";
            } else {
                err.password = "";
            }
        }
        if (!form.airlineName.value) {
            err.airlineName = "Airline name is required ";
        } else {
            err.airlineName = "";
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
        if (!form.fax.value) {
            err.fax = " Fax is required ";
        } else {
            err.fax = "";
        }
        if (!form.mobile.value) {
            err.mobile = " Mobile is required ";
        } else {
            err.mobile = "";
        }
        if (!form.homepage.value) {
            err.homepage = " Homepage is required ";
        } else {
            err.homepage = "";
        }


        if (
            err.username ||
            err.password ||
            err.airlineName ||
            err.email ||
            err.phone ||
            err.contactName ||
            err.contactTitle ||
            err.mobile ||
            err.fax ||
            err.homepage ||
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

    const switchToEditMode = () => {
        setIsEdit(!isEdit);
        setIsSubmit(false);
        setValidateError({
            username: "",
            password: "",
            airlineName: "",
            email: "",
            phone: "",
            mobile: "",
            fax:"",
            contactName: "",
            contactTitle: "",
            homepage: "",
            street: "",
            province: "",
            district: "",
            ward: ""
        });
    }

    const goBack = () => {
        history.push("/admin-airline-manage");
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
                                                <h3 className="card-title mb-3">{isEdit ? "Edit":"View"} Airline</h3>
                                                <button className={!isEdit ? "btn btn-sm btn-primary mb-3" : "btn btn-sm btn-warning mb-3"} onClick={() => switchToEditMode() }><FontAwesomeIcon icon={!isEdit ? faEdit : faEye}></FontAwesomeIcon></button>
                                                {!(props.province.data && airline) && <div className="loading" delay-hide="10"></div>}
                                                {airline && <form onSubmit={handleSubmit} className="form-sample" autoComplete="false" id="form">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Username*</label>
                                                                <input type="text" className={formControlClass("username")} name="username" defaultValue={airline?.account.userName} readOnly/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.username}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Password*</label>
                                                                <input type="password" className={formControlClass("password")} name="password" defaultValue={airline?.account.password} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.password}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Hotel Name*</label>
                                                                <input type="text" className={formControlClass("airlineName")} name="airlineName" defaultValue={airline?.airlineName} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.airlineName}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Phone Number*</label>
                                                                <input type="tel" className={formControlClass("phone")} name="phone" defaultValue={airline?.phone} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.phone}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Mobile*</label>
                                                                <input type="tel" className={formControlClass("mobile")} min="1" name="mobile" defaultValue={airline?.mobile} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.mobile}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Fax*</label>
                                                                <input type="tel" className={formControlClass("fax")} min="1" name="fax" defaultValue={airline?.fax} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.fax}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Homepage*</label>
                                                                <input type="text" className={formControlClass("homepage")} name="homepage" defaultValue={airline?.homepage} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.homepage}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Email*</label>
                                                                <input type="email" className={formControlClass("email")} name="email" defaultValue={airline?.email} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.email}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Contact Name*</label>
                                                                <input type="text" className={formControlClass("contactName")} name="contactName" defaultValue={airline?.contactName} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.contactName}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Contact Title*</label>
                                                                <input type="text" className={formControlClass("contactTitle")} name="contactTitle" defaultValue={airline?.contactTitle} readOnly={!isEdit}/>
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
                                                                <input type="text" className={formControlClass("street")} name="street" defaultValue={airline?.location.street} readOnly={!isEdit}/>
                                                                <div className="valid-feedback"></div>
                                                                <div className="invalid-feedback">{validateError.street}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Province*</label>
                                                                <select className={formControlClass("province")} name="province" onChange={onChangeProvince} defaultValue={slProvince?.id} readOnly={!isEdit} disabled={!isEdit}>
                                                                    <option value="0">---</option>
                                                                    {props.province.data?.map(province => <option key={province.id} value={province.id}>{province.name}</option>)}
                                                                </select>
                                                                <div className="invalid-feedback">{validateError.province}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="col-form-label">District*</label>
                                                                <select className={formControlClass("district")} name="district" onChange={onChangeDistrict} defaultValue={slDistrict?.id} readOnly={!isEdit} disabled={!isEdit}>
                                                                    <option value="0">---</option>
                                                                    {slProvince?.districts?.map(district => <option key={district.id} value={district.id}>{district.name}</option>)}
                                                                </select>
                                                                <div className="invalid-feedback">{validateError.district}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Ward*</label>
                                                                <select className={formControlClass("ward")} name="ward" onChange={onChangeWard} defaultValue={slWard?.id} readOnly={!isEdit} disabled={!isEdit}>
                                                                    <option value="0">---</option>
                                                                    {slDistrict?.wards?.map(ward => <option key={ward.id} value={ward.id}>{ward.name}</option>)}
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
                                                </form>}
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
        airline: state.airline,
        province: state.province
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAirline: (id) => {
            dispatch(getAirline(id))
        },
        updateAirline: (id, data) => {
            dispatch(updateAirline(id, data));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        clearState: () => {
            dispatch(clearAirlineState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAirlineProfileEdit);
