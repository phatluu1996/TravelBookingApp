import { faCheck, faEdit, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { retrieveProvince } from '../../../actions/actionLocation';
import { getUser, updateUser } from '../../../actions/actionUser';
import { useQuery } from '../../../utils/QueryParam';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';

const UpdateUserDetail = (props) => {
    let queryParam = useQuery();
    let history = useHistory();
    const [selectProvince, setSelectProvince] = useState(props.dataUser.data?.location?.province.id);
    const [selectDistrict, setSelectDistrict] = useState(props.dataUser.data?.location?.province.id);
    const [selectWard, setSelectWard] = useState(props.dataUser.data?.location?.province.id);
    const [errUpdate, setErrUpdate] = useState(false);
    const [gender, setGender] = useState("");
    const [isInitial, setIsInitial] = useState(0);
    const [isRequest, setIsRequest] = useState(null);
    const [responseMessageUpdate, setResponseMessageUpdate] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [validateInput, setValidateInput] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        phoneNumber: '',
        email: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        postalCode: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (validateForm(e)) {
            let data = { ...props.dataUser.data };

            data.firstName = form.firstName.value;
            data.lastName = form.lastName.value;
            data.gender = form.gender.value;
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

        if (!form.firstName.value) { submitErr.firstName = "First name is required!" } else { submitErr.firstName = ""; }
        if (!form.lastName.value) { submitErr.lastName = "Last name is required!" } else { submitErr.lastName = ""; }
        if (!form.birthday.value) { submitErr.birthday = "Birthday is required!" } else { submitErr.birthday = ""; }
        if (!form.phoneNumber.value) { submitErr.phoneNumber = "Phone number is required!" } else { submitErr.phoneNumber = ""; }
        if (!form.email.value) { submitErr.email = "Email is required!" } else { submitErr.email = ""; }
        if (!form.address.value) { submitErr.address = "Address is required!" } else { submitErr.address = ""; }
        if (!selectProvince) { submitErr.province = "Province"; } else { submitErr.province = ""; }
        if (!selectDistrict) { submitErr.district = "District"; } else { submitErr.district = ""; }
        if (!selectWard) { submitErr.ward = "Ward"; } else { submitErr.ward = ""; }
        if (!form.postalCode.value) { submitErr.postalCode = "Postal Code is required!" } else { submitErr.postalCode = ""; }

        setValidateInput(submitErr);

        if (submitErr.firstName || submitErr.lastName || submitErr.birthday || submitErr.phoneNumber
            || submitErr.email || submitErr.address || submitErr.province || submitErr.district
            || submitErr.ward || submitErr.postalCode) {

            return false;
        }

        if (props.dataUser.data?.firstName === form.firstName.value && props.dataUser.data?.lastName === form.lastName.value && props.dataUser.data?.dateOfBirth === form.birthday.value
            && props.dataUser.data?.phoneNumber === form.phoneNumber.value && props.dataUser.data?.email === form.email.value && props.dataUser.data?.location?.street === form.address.value
            && props.dataUser.data?.location?.province.id === selectProvince.id && props.dataUser.data?.location?.district.id === selectDistrict.id && props.dataUser.data?.location?.ward.id === selectWard.id
            && props.dataUser.data?.location?.postalCode === form.postalCode.value && props.dataUser.data?.gender === form.gender.value) {
            setErrUpdate(true);
            setResponseMessageUpdate("No data change.");
            return false;
        }
        return true;
    }

    const handleGenderCheck = (e) => {
        setGender(e.target.value);
    }

    const onChangeProvince = (e) => {
        setSelectProvince(JSON.parse(e.target.value));
        setSelectDistrict(null);
        setSelectWard(null);
        e.target.form.district.value = null;
        e.target.form.ward.value = null;
    }

    const onChangeDistrict = (e) => {
        setSelectDistrict(JSON.parse(e.target.value));
        setSelectWard(null);
        e.target.form.ward.value = null;
    }

    const onChangeWard = (e) => {
        setSelectWard(JSON.parse(e.target.value));
    }

    useEffect(() => {
        if (!props.province.data) {
            props.getProvince();
        }
        props.getUser(queryParam.get('id'));
    }, []);

    useEffect(() => {
        let mount = false;
        if (isInitial === 0 && gender === "" && props.dataUser.data != null) {
            // setGender(props.dataUser.data?.gender);
            setIsInitial(1);
        }

        if (props.province.data && props.dataUser.data?.location) {
            var pv = props.dataUser.data?.location.province;
            var dt = props.dataUser.data?.location.district;
            var w = props.dataUser.data?.location.ward;
        }

        if (!selectProvince) { setSelectProvince(pv); }
        if (!selectDistrict) { setSelectDistrict(dt); }
        if (!selectWard) { setSelectWard(w); }

        if (props.dataUpdate?.form === 'errUpdateUser') {
            setErrUpdate(true);
            setResponseMessageUpdate("Update fail. " + props.dataUpdate?.message.response.data.message);
        }
        if (props.dataUpdate?.form === 'successUpdateUser') {
            if (!props.dataUpdate?.data) {
                document.location.href = "/";
            }
            if (props.dataUpdate?.data && props.dataUpdate?.success) {
                setErrUpdate(false);
                setResponseMessageUpdate("Update successfuly!");
            } else if (props.dataUpdate?.data && !props.dataUpdate?.success) {
                setResponseMessageUpdate(props.dataUpdate?.data.message);
            }
        }

        return () => {
            mount = true;
        }
    });

    const switchToEditMode = () => {
        setIsEdit(!isEdit);
    }

    const stopIfReadonly = (e) => {
        if(!isEdit){
            e.preventDefault();
        }
    }

    return (
        <div className="bootstrap-scope">
            <div className="container-scroller">
                <AdminSidebar />
                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <div className="main-panel">
                        <div className="content-wrapper row justify-content-xl-center">
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">User Details</h4>
                                        <button className={!isEdit ? "btn btn-sm btn-primary mb-3" : "btn btn-sm btn-warning mb-3"} onClick={() => switchToEditMode()}><FontAwesomeIcon icon={!isEdit ? faEdit : faEye}></FontAwesomeIcon></button>
                                        <form className="form-sample" onSubmit={handleSubmit} id="form">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">First Name</label>
                                                        <input type="text" className={`form-control ${validateInput.firstName ? "is-invalid" : "is-valid"}`} name="firstName" defaultValue={props.dataUser.data?.firstName} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.firstName}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Last Name</label>
                                                        <input type="text" className={`form-control ${validateInput.lastName ? "is-invalid" : "is-valid"}`} name="lastName" defaultValue={props.dataUser.data?.lastName} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.lastName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Gender</label>
                                                        <div className="row">
                                                            <div className="col-sm-5">
                                                                <div className="form-check">
                                                                    <label>
                                                                        <input type="radio" className="form-check-input" name="gender" id="gender" value="Male" defaultChecked={props.dataUser.data?.gender} readOnly={!isEdit} onChange={stopIfReadonly} onClick={stopIfReadonly}/> Male </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                <div className="form-check">
                                                                    <label>
                                                                        <input type="radio" className="form-check-input" name="gender" id="gender" value="Female" defaultChecked={props.dataUser.data?.gender} readOnly={!isEdit} onChange={stopIfReadonly} onClick={stopIfReadonly}/> Female </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Date of Birth</label>
                                                        <input className={`form-control ${validateInput.birthday ? "is-invalid" : "is-valid"}`} placeholder="dd/mm/yyyy" name="birthday" defaultValue={props.dataUser.data?.dateOfBirth} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.birthday}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Email</label>
                                                        <input className={`form-control ${validateInput.email ? "is-invalid" : "is-valid"}`} placeholder="abc@gmail.com" name="email" defaultValue={props.dataUser.data?.email} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.email}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Phone number:</label>
                                                        <input className={`form-control ${validateInput.phoneNumber ? "is-invalid" : "is-valid"}`} placeholder="abc@gmail.com" name="phoneNumber" defaultValue={props.dataUser.data?.phoneNumber} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.phoneNumber}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Address:</label>
                                                        <input type="text" className={`form-control ${validateInput.address ? "is-invalid" : "is-valid"}`} name="address" defaultValue={props.dataUser.data?.location?.street} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.address}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Province*</label>
                                                        <select className={`form-control ${validateInput.province ? "is-invalid" : "is-valid"}`}
                                                            name="province"
                                                            onChange={onChangeProvince} readOnly={!isEdit} disabled={!isEdit}>
                                                            <option value={null}>---</option>
                                                            {props.province.data?.map(province => <option key={province.id} value={JSON.stringify(province)} selected={selectProvince?.id == province?.id}>{province.name}</option>)}
                                                        </select>
                                                        <div className="invalid-feedback">{validateInput.province}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">District*</label>
                                                        <select className={`form-control ${validateInput.district ? "is-invalid" : "is-valid"}`}
                                                            name="district"
                                                            onChange={onChangeDistrict} readOnly={!isEdit} disabled={!isEdit}>
                                                            <option value={null}>---</option>
                                                            {selectProvince?.districts?.map(district => <option key={district.id} value={JSON.stringify(district)} selected={selectDistrict?.id == district?.id}>{district.name}</option>)}
                                                        </select>
                                                        <div className="invalid-feedback">{validateInput.district}</div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Ward*</label>
                                                        <select className={`form-control ${validateInput.ward ? "is-invalid" : "is-valid"}`}
                                                            name="ward"
                                                            onChange={onChangeWard} readOnly={!isEdit} disabled={!isEdit}>
                                                            <option value={null}>---</option>
                                                            {selectDistrict?.wards?.map(ward => <option key={ward.id} value={JSON.stringify(ward)} selected={selectWard?.id == ward?.id}>{ward.name}</option>)}
                                                        </select>
                                                        <div className="invalid-feedback">{validateInput.ward}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Postal Code:</label>
                                                        <input type="text" className={`form-control ${validateInput.postalCode ? "is-invalid" : "is-valid"}`} name="postalCode" defaultValue={props.dataUser.data?.location?.postalCode} readOnly={!isEdit}/>
                                                        <div className="invalid-feedback">{validateInput.postalCode}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-sm-center">
                                                <div className="col-md-4">
                                                    <button hidden={!isEdit} className="btn btn-lg btn-block btn-success" type="submit"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
                                                </div>
                                                <div className="col-md-4">
                                                    <Link className="btn btn-lg btn-block btn-danger" to="/admin-user-manage"><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></Link>
                                                </div>
                                            </div>
                                            {errUpdate && responseMessageUpdate && <div class="alert alert-danger mt-2">{responseMessageUpdate}</div>}
                                            {!errUpdate && responseMessageUpdate && <div class="alert alert-success mt-2">{responseMessageUpdate}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        dataUser: state.user,
        dataUpdate: state.user,
        province: state.province
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => {
            dispatch(getUser(id));
        },
        updateUser: (data) => {
            dispatch(updateUser(data));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserDetail);