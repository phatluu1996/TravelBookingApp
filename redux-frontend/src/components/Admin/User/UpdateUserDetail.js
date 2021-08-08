import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { retrieveProvince } from '../../../actions/actionLocation';
import { getUser, updateUser } from '../../../actions/actionUser';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';

const UpdateUserDetail = (props) => {

    const [selectProvince, setSelectProvince] = useState(props.dataUser.data?.location?.province.id);
    const [selectDistrict, setSelectDistrict] = useState(props.dataUser.data?.location?.province.id);
    const [selectWard, setSelectWard] = useState(props.dataUser.data?.location?.province.id);
    const [errUpdate, setErrUpdate] = useState(false);
    const [responseMessageUpdate, setResponseMessageUpdate] = useState("");
    const [validateInput,setValidateInput] = useState({
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

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        // if(validateForm(e)){
            let data = {...props.dataUser.data};

            data.firstName = form.firstName.value;
            data.lastName = form.lastName.value;
            // data.gender = gender;
            data.dateOfBirth = form.birthday.value;
            data.email = form.email.value;
            data.location.street = form.address.value;
            data.location.province = selectProvince;
            data.location.district = selectDistrict;
            data.location.ward = selectWard;
            data.location.postalCode = form.postalCode.value;

            props.updateUser(data);
            // setIsRequest(true);
        // }
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

        if( props.dataUser.data?.firstName === form.firstName.value && props.dataUser.data?.lastName === form.lastName.value && props.dataUser.data?.dateOfBirth === form.birthday.value 
            && props.dataUser.data?.phoneNumber === form.phoneNumber.value && props.dataUser.data?.email === form.email.value && props.dataUser.data?.location?.street === form.address.value 
            && props.dataUser.data?.location?.province.id === selectProvince.id && props.dataUser.data?.location?.district.id === selectDistrict.id && props.dataUser.data?.location?.ward.id === selectWard.id
            && props.dataUser.data?.location?.postalCode === form.postalCode.value){
                setErrUpdate(true);
                setResponseMessageUpdate("No data change.");
                return false;
            }
        return true;
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
        props.getUser(7);
        console.log(props.dataUser.data);
    }, []);

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
                                        <form className="form-sample" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">First Name</label>
                                                        <input type="text" className="form-control" name="firstName" defaultValue={props.dataUser.data?.firstName}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Last Name</label>
                                                        <input type="text" className="form-control" name="lastName" defaultValue={props.dataUser.data?.lastName}/>
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
                                                                    <label className="form-check-label">
                                                                        <input type="radio" className="form-check-input" name="gender" id="gender" value="Male" /> Male </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                <div className="form-check">
                                                                    <label className="form-check-label">
                                                                        <input type="radio" className="form-check-input" name="gender" id="gender" value="Female" /> Female </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Date of Birth</label>
                                                        <input className="form-control" placeholder="dd/mm/yyyy" name="birthday" defaultValue={props.dataUser.data?.birthDay}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Email</label>
                                                        <input className="form-control" placeholder="abc@gmail.com" name="email" defaultValue={props.dataUser.data?.email}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Phone number:</label>
                                                        <input className="form-control" placeholder="abc@gmail.com" name="phoneNumber" defaultValue={props.dataUser.data?.phoneNumber}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Address:</label>
                                                        <input type="text" className="form-control" name="address" defaultValue={props.dataUser.data?.location?.street}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Province*</label>
                                                        <select className={`form-control`} 
                                                        name="province" 
                                                        onChange={onChangeProvince} defaultValue={props.dataUser.data?.location?.province.id}>
                                                            <option value={null}>---</option>
                                                            {props.province.data?.map(province => <option key={province.id} value={JSON.stringify(province)}>{province.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">District*</label>
                                                        <select className={`form-control`} name="district" onChange={onChangeDistrict} defaultValue={props.dataUser.data?.location?.district.id}>
                                                            <option value={null}>---</option>
                                                            {selectProvince?.districts?.map(district => <option key={district.id} value={JSON.stringify(district)}>{district.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Ward*</label>
                                                        <select className={`form-control`} 
                                                                name="ward" 
                                                                onChange={onChangeWard} 
                                                                defaultValue={props.dataUser.data?.location?.ward.id}>
                                                            <option value={null}>---</option>
                                                            {selectDistrict?.wards?.map(ward => <option key={ward.id} value={JSON.stringify(ward)}>{ward.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Postal Code:</label>
                                                        <input type="text" className="form-control" name="postalCode" defaultValue={props.dataUser.data?.location?.postalCode}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-sm-center">
                                                <div className="col-md-4">
                                                    <button className="btn btn-lg btn-block btn-success" type="submit">Update</button>
                                                </div>
                                                <div className="col-md-4">
                                                    <button className="btn btn-lg btn-block btn-danger" type="cancel">Cancel</button>
                                                </div>
                                            </div>
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
        updateUser: (data) =>{
            dispatch(updateUser(data));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserDetail);