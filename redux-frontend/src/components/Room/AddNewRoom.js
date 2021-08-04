import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { getUpdate } from "../../actions/actionHotel";
import { updateLocation } from "../../actions/actionLocation";
import { importAll } from "../../utils/JqueryImport";

const AddNewRoom = (props) => {
    // const hotel = props.dataHotel;
    // const provinces = props.province.data;

    // const [selectProvince, setSelectProvince] = useState(hotel.location.province);
    // const [selectDistrict, setSelectDistrict] = useState(hotel.location.district);
    // const [selectWard, setSelectWard] = useState(hotel.location.ward);
    // const [allDistrict, setAllDistrict] = useState(null);

    // const [allWard, setAllWard] = useState(null);
    // const [statusSignup, setStatuSignup] = useState(false);
    // const [messageSignup, setMessageSignup] = useState("");
    // const [isRequest, setIsRequest] = useState(false);

    const [validateError, setValidateError] = useState({
        hotelName: "",
        email: "",
        phone: "",
        contactName: "",
        contactTitle: "",
        address: "",
        numberOfRoom: "",
        avgPriceAtNight: "",
    });

    const handelSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        if (handleChange(form)) {
            // let data = {
            //     ...props.dataHotel
            // }
            //     data.hotelName = form.hotelName.value;
            //     data.email= form.email.value;
            //     data.phone= form.phone.value;
            //     data.contactName= form.contactName.value;
            //     data.contactTitle= form.contactTitle.value;
            //     data.address = form.address.value;
            //     data.numberOfRoom= parseInt(form.numOfRoom.value);
            //     data.avgPriceAtNight= parseFloat(form.avgPriceAtNight.value);
            //     data.location.street = form.address.value;
            //     data.location.province = selectProvince;
            //     data.location.district = selectDistrict;
            //     data.location.ward = selectWard;

            //     props.getUpdate(hotel.id,data);
        }
    };
    const handleChange = (e) => {

        const form = e;
        const err = { ...validateError };
        const pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(form.email.value);

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
        if (!form.address.value) {
            err.address = " Address is required ";
        } else {
            err.address = "";
        }
        if (!form.numOfRoom.value) {
            err.numberOfRoom = " Room quantity is required ";
        } else {
            err.numberOfRoom = "";
        }
        if (!form.avgPriceAtNight.value) {
            err.avgPriceAtNight = " Avg Price is required ";
        } else {
            err.avgPriceAtNight = "";
        }
        if (
            err.hotelName ||
            err.email ||
            err.phone ||
            err.contactName ||
            err.contactTitle ||
            err.address ||
            err.numberOfRoom ||
            err.avgPriceAtNight
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

    // const onChangeProvince = (e) => {
    //     document
    //         .querySelector("#districts")
    //         .parentElement.querySelector(".customSelectInner").innerHTML = "--";
    //     document
    //         .querySelector("#wards")
    //         .parentElement.querySelector(".customSelectInner").innerHTML = "--";
    //     if (e.currentTarget.id === "0") {
    //         setSelectDistrict(null);
    //         setSelectProvince(null);
    //         setSelectWard(null);
    //     } else {
    //         // if (!props.province.data) {
    //             setSelectProvince(
    //                 props.province.data.find((item) => item.id === parseInt(e.currentTarget.value))
    //             );
    //         // }
    //     }
    // };
    // const onChangeDistrict = (e) => {
    //     document
    //         .querySelector("#wards")
    //         .parentElement.querySelector(".customSelectInner").innerHTML = "--";
    //     if (e.currentTarget.id === "0") {
    //         setSelectDistrict(null);
    //         setSelectWard(null);
    //     } else {
    //         setSelectDistrict(
    //             selectProvince.districts.find(
    //                 (item) => item.id === parseInt(e.currentTarget.value)
    //             )
    //         );
    //     }
    // };
    // const onChangeWard = (e) => {
    //     setSelectWard(
    //         selectDistrict.wards.find(
    //             (item) => item.id === parseInt(e.currentTarget.value)
    //         )
    //     );
    // };

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <div className="booking-form">
                    <div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">Hotel Name:</label>
                            <div
                                className={`input ${validateError.hotelName ? "is-invalid" : ""
                                    }`}
                            >
                                <input
                                    type="text"
                                    name="hotelName"
                                    // defaultValue={hotel ? hotel.hotelName : ""}
                                />
                            </div>
                            <div className="booking-error-input">
                                {validateError.hotelName}
                            </div>
                        </div>
                        <div className="booking-form-i">
                            <label>Phone number:</label>
                            <div className="input">
                                <input
                                    type="text"
                                    name="phone"
                                    // defaultValue={hotel ? hotel.phone : ""}
                                />
                            </div>
                        </div>

                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i booking-form-i-custom ">
                            <label className="custom-lbl">Email:</label>
                            <div
                                className={`input ${validateError.email ? "is-invalid" : ""}`}
                            >
                                <input
                                    type="text"
                                    name="email"
                                    // defaultValue={hotel ? hotel.email : ""}
                                />
                            </div>
                            <div className="booking-error-input">{validateError.email}</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">Contact Name:</label>
                            <div
                                className={`input ${validateError.contactName ? "is-invalid" : ""
                                    }`}
                            >
                                <input
                                    type="text"
                                    name="contactName"
                                    // defaultValue={hotel ? hotel.contactName : ""}
                                />
                            </div>
                            <div className="booking-error-input">
                                {validateError.contactName}
                            </div>
                        </div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">Contact Title:</label>
                            <div
                                className={`input ${validateError.contactTitle ? "is-invalid" : ""
                                    }`}
                            >
                                <input
                                    type="text"
                                    name="contactTitle"
                                    // defaultValue={hotel ? hotel.contactTitle : ""}
                                />
                            </div>
                            <div className="booking-error-input">
                                {validateError.contactTitle}
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">Number Of Room:</label>
                            <div
                                className={`input ${validateError.numberOfRoom ? "is-invalid" : ""
                                    }`}
                            >
                                <input
                                    type="text"
                                    name="numOfRoom"
                                    // defaultValue={hotel ? hotel.numberOfRoom : ""}
                                />
                            </div>
                            <div className="booking-error-input">
                                {validateError.numberOfRoom}
                            </div>
                        </div>
                        <div className="booking-form-i">
                            <label className="custom-lbl">Avg Price:</label>
                            <div
                                className={`input ${validateError.avgPriceAtNight ? "is-invalid" : ""
                                    }`}
                            >
                                <input
                                    type="text"
                                    name="avgPriceAtNight"
                                    // defaultValue={hotel ? hotel.avgPriceAtNight : ""}
                                />
                            </div>
                            <div className="booking-error-input">
                                {validateError.avgPriceAtNight}
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div style={{ color: "grey", marginBottom: "10px" }}>
                            <i>*Please enter address</i>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div
                            className="booking-form-i booking-form-i-custom"
                            style={{ marginBottom: "10px" }}
                        >
                            <label className="custom-lbl">Address:</label>
                            <div
                                className={`input ${validateError.address ? "is-invalid" : ""}`}
                            >
                                <input
                                    type="text"
                                    name="address"
                                    // defaultValue={hotel ? hotel.location.street : ""}
                                />
                            </div>
                            <div className="booking-error-input">{validateError.address}</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div style={{ marginBottom: "10px", color: "grey" }}>
                        <i>*Please enter location</i>
                    </div>
                    <div>
                        <div className="srch-tab-line no-margin-bottom">
                            {/* <div className="srch-tab-3c">
                                <label>Province</label>
                                <div className="select-wrapper">
                                    <select
                                        onChange={onChangeProvince}
                                        className="custom-select"
                                        name="provinces"
                                        id="provinces"
                                        defaultValue={hotel.location.province.id}
                                    >
                                        <option key={0} value={0}>
                                            --
                                        </option>
                                        {props.province.data?.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}
                            {/* <div className="srch-tab-3c">
                                <label>District</label>
                                <div className="select-wrapper">
                                    <select
                                        onChange={onChangeDistrict}
                                        className="custom-select"
                                        name="districts"
                                        id="districts"
                                        defaultValue={hotel?.location.district.id}
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
                            </div> */}
                            {/* <div className="srch-tab-3c">
                                <label>Ward</label>
                                <div className="select-wrapper">
                                    <select
                                        className="custom-select"
                                        name="wards"
                                        id="wards"
                                        defaultValue={hotel?.location.ward.id}
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
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="booking-complete" style={{ float: "left" }}>
                    <button
                        className="booking-complete-btn"
                        type="submit"
                        style={{ marginTop: "20px" }}
                    >
                        Update
                    </button>
                </div>
                <div className="clear"></div>
            </form>
        </div>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUpdate: (id, data) => {
            dispatch(getUpdate(id, data));
        },
        getUpdateLocation: (id, data) => {
            dispatch(updateLocation(id, data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewRoom);
