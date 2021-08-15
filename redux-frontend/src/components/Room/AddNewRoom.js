import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { createRoom } from "../../actions/actionRoom";
import { updateLocation } from "../../actions/actionLocation";
import { importAll } from "../../utils/JqueryImport";
import AdminFooter from '../Admin/Layout/AdminFooter';
import AdminNavbar from '../Admin/Layout/AdminNavbar';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const AddNewRoom = ({ closeModal, hotel }) => {


    // const room = props.room;
    // const provinces = props.province.data;

    // const [selectProvince, setSelectProvince] = useState(hotel.location.province);
    // const [selectDistrict, setSelectDistrict] = useState(hotel.location.district);
    // const [selectWard, setSelectWard] = useState(hotel.location.ward);
    // const [allDistrict, setAllDistrict] = useState(null);

    // const [allWard, setAllWard] = useState(null);
    // const [statusSignup, setStatuSignup] = useState(false);
    // const [messageSignup, setMessageSignup] = useState("");
    // const [isRequest, setIsRequest] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [status, setStatus] = useState(false);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const [validateError, setValidateError] = useState({
        roomNumber: "",
        roomType: "",
        price: "",
        maxAdult: "",
        maxChildren: ""
    });
    // const goBack = () => {
    //     history.push("/admin-hotel-manage");
    // }


    const roomCreate = (data) => { dispatch(createRoom(data)) }


    const handelSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData();
        console.log('' + hotel.id);
        // byte[] bytes = images.f.read(file_upload .toPath());
        if (handleChange(form)) {
            formData.append('roomNumber', parseInt(form.roomNumber.value));
            formData.append('hotel','' + hotel.id);
            formData.append('roomType', form.roomType.value);
            formData.append('price', parseInt(form.price.value));
            formData.append('maxAdult', parseInt(form.maxAdult.value));
            formData.append('maxChildren', parseInt(form.maxChildren.value));
            formData.append('roomStatus', 0);
            for (let index = 0; index < images.length; index++) {
                const image = images[index];
                formData.append('files',image);
            }
            roomCreate(formData);
            closeModal(false)
        }
    };

    const uploadFiles = (event) => {
        var files = [];
        for (let size = 0; size < event.target.files.length; size++) {
            files.push(event.target.files[size]);
        }
        setImages(files);
    }

    const handleChange = (e) => {

        const form = e;
        const err = { ...validateError };
        // console.log(form.roomNumber.value);
        // const pattern =
        //     /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        // const result = pattern.test(form.email.value);

        if (!form.roomNumber.value) {
            err.roomNumber = "Room number is required ";
        } else {
            err.roomNumber = "";
        }
        if (!form.roomType.value) {
            err.roomType = "Room type is required ";
        } else {
            err.roomType = "";
        }
        if (!form.price.value) {
            err.price = "Price is required ";
        } else {
            err.price = "";
        }
        if (!form.maxAdult.value) {
            err.maxAdult = "Max adult title is required ";
        } else {
            err.maxAdult = "";
        }
        if (!form.maxChildren.value) {
            err.maxChildren = " Max children is required ";
        } else {
            err.maxChildren = "";
        }
        if (
            err.roomNumber ||
            err.roomType ||
            err.phone ||
            err.price ||
            err.maxAdult ||
            err.maxChildren
        ) {
            setValidateError(err);
            return false;
        }
        return true;
    };

    // const handleGenderClick = (e) => {
    //     e.preventDefault();
    //     if (e.currentTarget.innerHTML === "F") {
    //         setIsMale("Female");
    //     } else { setIsMale("Male"); }
    // }

    useEffect(() => {
        let mount = false;
        // importAll();
        // props.getProvince();

        // document
        //     .querySelector("#provinces")
        //     .parentElement.querySelector(".customSelectInner").innerHTML =
        //     hotel?.location.province.name;
        // document
        //     .querySelector("#districts")
        //     .parentElement.querySelector(".customSelectInner").innerHTML =
        //     hotel?.location.district.name;
        // document
        //     .querySelector("#wards")
        //     .parentElement.querySelector(".customSelectInner").innerHTML =
        //     hotel?.location.ward.name;
        return () => {
            mount = true;
        };
    }, []);

    const formControlClass = (field) => {
        if (!validateError[field]) {
            if (isSubmit) {
                return "form-control is-valid";
            }
            return "form-control";
        }
        return "form-control is-invalid";
    }

    return (
        <>

            <div className="bootstrap-scope">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handelSubmit} className="form-sample" autoComplete="false">
                            <div className="row">
                                <div className="col-sm">
                                    <h3 className="card-title ">New room</h3>
                                </div>
                                <div className="col col-lg-4">
                                    {/* <div className="row"> */}
                                    {/* <div className="col-md-3"> */}
                                    <button type="submit" onSubmit={handelSubmit} className="btn btn-success"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
                                    {/* </div>
                                    <div className="col-md-3"> */}
                                    <button onClick={e => closeModal(false)} className="btn btn-md btn-danger "><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></button>
                                    {/* </div> */}
                                    {/* </div> */}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Room Number*</label>
                                        <input type="number" className={formControlClass("roomNumber")} name="roomNumber" />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.roomNumber}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">RoomType*</label>
                                        <input type="text" className={formControlClass("roomType")} name="roomType" />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.roomType}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Price*</label>
                                        <input type="number" className={formControlClass("price")} name="price" />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.price}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Max Adult*</label>
                                        <input type="number" className={formControlClass("maxAdult")} name="maxAdult" />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.maxAdult}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Max Children*</label>
                                        <input type="number" className={formControlClass("maxChildren")} name="maxChildren" />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.maxChildren}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Image of room</label>
                                        <input onChange={uploadFiles} type="file" id="files" name="files" multiple />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* </div>
                        </div> */}
            {/* <AdminFooter /> */}
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}

            {/* </div > */}
        </>
    );
};
const mapStateToProps = (state, ownProps) => {
    // return {};
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewRoom);
