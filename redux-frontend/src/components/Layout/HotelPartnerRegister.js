import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import { signup } from "../../actions/actionAuth";
import { importAll } from "../../utils/JqueryImport";
import { retrieveProvince } from "../../actions/actionLocation";
import { createPartner } from "../../actions/actionHotel";
import { useQuery } from "../Airline/EditFlight";

function HotelPartnerRegister(props) {
    let queryParam = useQuery();

    
    const [statusSignup, setStatuSignup] = useState(false);
    const [messageSignup, setMessageSignup] = useState("");
    const [isRequest, setIsRequest] = useState(false);
    const [selectProvince, setSelectProvince] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const [selectWard, setSelectWard] = useState(null);
    const [files, setFiles] = useState([]);
    const [validateError, setValidateError] = useState({
        hotelName: "",
        email: "",
        phone: "",
        contactName: "",
        contactTitle: "",
        description: "",
        numberOfRoom: "",
        street: "",
        province: "",
        district: "",
        ward: "",
    });

    const getName = (name) => {
        switch (name) {
            case "hotelName":
                return "Hotel Name";
            case "email":
                return "Email";
            case "contactName":
                return "Contact Name";
            case "contactTitle":
                return "Contact Title";
            case "description":
                return "Description";
            case "phone":
                return "Phone";
            case "numberOfRoom":
                return "Number Of Room";
            case "stress":
                return "Stress";
            case "province":
                return "Province";
            case "district":
                return "District";
            case "ward":
                return "Ward";
            default:
                return "";
        }
    };

    const validateForm = (e) => {
        var form = e.target;
        const err = { ...validateError };

        if (!form.hotelName.value) {
            err.hotelName = "Hotel Name is required!";
        } else {
            err.hotelName = "";
        }

        if (!form.email.value) {
            err.email = "Email is required!";
        } else {
            err.email = "";
        }

        if (!form.contactName.value) {
            err.contactName = "Contact name is required!";
        } else {
            err.contactName = "";
        }

        if (!form.description.value) {
            err.description = "Description is required!";
        } else {
            err.description = "";
        }

        if (!form.numberOfRoom.value) {
            err.numberOfRoom = "Num of room is required!";
        } else {
            err.numberOfRoom = "";
        }

        if (!form.street.value) {
            err.street = "Street is required!";
        } else {
            err.street = "";
        }
        if (!form.district.value) {
            err.district = "District is required!";
        } else {
            err.district = "";
        }
        if (!form.ward.value) {
            err.ward = "Ward is required!";
        } else {
            err.ward = "";
        }

        // if (!form.agreePolicy.checked) {
        //     err.agreePolicy = "Privacy Policy & Terms Agreement is required !";
        // } else {
        //     err.agreePolicy = "";
        // }

        if (
            err.ward ||
            err.district ||
            err.street ||
            err.numberOfRoom ||
            err.description ||
            err.contactName ||
            err.email ||
            err.hotelName
        ) {
            setValidateError(err);
            return false;
        }
        return true;
    };
    function isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    const handleChange = (e) => {
        e.preventDefault();
        const err = { ...validateError };

        if (e.target.type !== "checkbox") {
            if (!e.target.value) {
                err[e.target.name] = `${getName(e.target.name)} is required !`;
            } else {
                err[e.target.name] = "";
            }
        } else {
            if (!e.target.checked) {
                err[e.target.name] = `${getName(e.target.name)} is required !`;
            } else {
                err[e.target.name] = "";
            }
        }

        if (e.target.name === "email" && e.target.value) {
            let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!regex.test(e.target.value)) {
                err.email = "Email is invalid.";
            } else {
                err.email = "";
            }
        }
        if (e.target.name === "phone" && e.target.value) {
            if (!isNumeric(e.target.value)) {
                err.phone = "Phone only number.";
            } else {
                err.phone = "";
            }
        }
        if (e.target.name === "numberOfRoom" && e.target.value) {
            if (!isNumeric(e.target.value)) {
                err.numberOfRoom = "Number of room only number.";
            } else if (e.target.value > 15) {
                err.numberOfRoom = "Can't input greater than 15 room";
            } else {
                err.numberOfRoom = "";
            }
        }

        setValidateError(err);
    };
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
                props.province?.data?.find(
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

    const uploadFiles = (event) => {
        var files = [];
        for (let size = 0; size < event.target.files.length; size++) {
            files.push(event.target.files[size]);
        }
        setFiles(files);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData();
        if (validateForm(e)) {
            formData.append("hotelName", form.hotelName.value);
            formData.append("email", form.email.value);
            formData.append("phone", form.phone.value);
            formData.append("contactName", form.contactName.value);
            formData.append("contactTitle", form.contactTitle.value);
            formData.append("description", form.description.value);
            formData.append("street", form.street.value);
            formData.append("numberOfRoom", parseInt(form.numberOfRoom.value));
            formData.append("province", selectProvince);
            formData.append("district", selectDistrict);
            formData.append("ward", selectWard);
            // formData.append("account", queryParam.get("userId"));
            if (files.length > 0 && files != []) {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    formData.append("files", file);
                }
            } else {
                formData.append("files", []);
            }

            createPartner(formData);
            setIsRequest(true);
        }
    };


    useEffect(() => {
        var mount = false;
        importAll();
        props.getProvince();

        return () => {
            mount = true;
        };
    }, []);


    return (
        
            <body>
                <Header />
                <div className="main-cont">
                    <form onSubmit={handleSignupSubmit}>
                        <div className="body-wrapper" style={{ paddingTop: "150px" }}>
                            <div className="wrapper-padding wrapper-padding-custom">
                                <h2 style={{ textAlign: "center", fontSize: "23px" }}>
                                    Hotel Register
                                </h2>
                                <p style={{ textAlign: "center", marginBottom: "20px" }}>
                                    Register for Your Account
                                </p>
                                <div className="booking-form">
                                    <div>
                                        <div className="booking-form-i">
                                            <label className="custom-lbl">Contact Name*:</label>
                                            <div
                                                className={`input ${validateError.contactName ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <input type="text" name="contactName" onChange={handleChange} />
                                            </div>
                                            <div className="booking-error-input">
                                                {validateError.contactName}
                                            </div>
                                        </div>
                                        <div className="booking-form-i">
                                            <label className="custom-lbl">Contact Title*:</label>
                                            <div
                                                className={`input ${validateError.contactTitle ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <input type="text" name="contactTitle" onChange={handleChange} />
                                            </div>
                                            <div className="booking-error-input">
                                                {validateError.contactTitle}
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div>
                                        <div className="booking-form-i">
                                            <label className="custom-lbl">Phone*:</label>
                                            <div
                                                className={`input ${validateError.phone ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <input type="text" name="phone" onChange={handleChange} />
                                            </div>
                                            <div className="booking-error-input">
                                                {validateError.phone}
                                            </div>
                                        </div>

                                        <div className="booking-form-i">
                                            <label className="custom-lbl">Email*:</label>
                                            <div
                                                className={`input ${validateError.email ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <input type="text" name="email" onChange={handleChange} />
                                            </div>
                                            <div className="booking-error-input">
                                                {validateError.email}
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div>
                                        <div className="booking-form-i">
                                            <label className="custom-lbl">Hotel Name*:</label>
                                            <div
                                                className={`input ${validateError.hotelName ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <input type="text" name="hotelName" onChange={handleChange} />
                                            </div>
                                            <div className="booking-error-input">
                                                {validateError.hotelName}
                                            </div>
                                        </div>
                                        <div className="booking-form-i">
                                            <label className="custom-lbl">Number Of Room*:</label>
                                            <div
                                                className={`input ${validateError.numberOfRoom ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <input type="text" name="numberOfRoom" onChange={handleChange} />
                                            </div>
                                            <div className="booking-error-input">
                                                {validateError.numberOfRoom}
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Street*:</label>
                                        <div
                                            className={`input ${validateError.street ? "is-invalid" : ""
                                                }`}
                                        >
                                            <input type="text" name="street" />
                                        </div>
                                        <div className="booking-error-input">
                                            {validateError.street}
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                    <div>
                                        <div className="srch-tab-line no-margin-bottom">
                                            <div className="srch-tab-3c">
                                                <label>Province*</label>
                                                <div className="select-wrapper">
                                                    <select
                                                        onChange={onChangeProvince}
                                                        className="custom-select"
                                                        name="province"
                                                        id="province"
                                                    // defaultValue={hotel.location.province.id}
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
                                                <label>District*</label>
                                                <div className="select-wrapper">
                                                    <select
                                                        onChange={onChangeDistrict}
                                                        className="custom-select"
                                                        name="district"
                                                        id="district"
                                                    // defaultValue={hotel?.location.district.id}
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
                                                <label>Ward*</label>
                                                <div className="select-wrapper">
                                                    <select
                                                        className="custom-select"
                                                        name="ward"
                                                        id="ward"
                                                        // defaultValue={hotel?.location.ward.id}
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
                                    <div
                                        className="booking-form-i textarea"
                                        style={{ paddingTop: "10px" }}
                                    >
                                        <label>Message*:</label>
                                        <div
                                            className={
                                                !validateError.description
                                                    ? "textarea-wrapper"
                                                    : "textarea-wrapper is-invalid"
                                            }
                                        >
                                            <textarea name="message"></textarea>
                                        </div>
                                        <div className="booking-error-input">
                                            {validateError.description}
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Input image:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="files"
                                            onChange={uploadFiles}
                                        />
                                    </div>
                                    <div className="clear"></div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" value="" />I want to receive
                                            Sparrow news in the future
                                        </label>
                                        <div className="booking-error-input"></div>
                                    </div>
                                    <div className="booking-devider"></div>
                                </div>
                                <div className="booking-complete" style={{ float: "left" }}>
                                    <button
                                        className="booking-complete-btn"
                                        type="submit"
                                        style={{ marginTop: "0" }}
                                    >
                                        REGISTER
                                    </button>
                                </div>
                                <div
                                    className={`${statusSignup
                                        ? "booking-success-input"
                                        : "booking-error-input"
                                        }`}
                                    style={{
                                        float: "left",
                                        marginLeft: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {messageSignup}
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </form>
                </div>
                <Footer />
            </body>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        province: state.province,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPartner: (data) => {
            dispatch(createPartner(data));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HotelPartnerRegister);
