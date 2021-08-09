import React, { useEffect, useState } from "react";
import { importAll } from "../../../utils/JqueryImport";
import { retrieveAirline } from "../../../actions/actionAirline";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";

const UpdateAirline = (props) => {
  const dispatch = useDispatch();

  const airlineId = props.airlineId;

  const airline = useSelector((state) => state.airline);

  const [error, setError] = useState({
    airlineName: "",
    phone: "",
    fax: "",
    homepage: "",
    contactName: "",
    contactTitle: "",
    mobile: "",
    email: "",
    location: "",
  });

  const validateForm = (e) => {
    var form = e.target;
    const err = { ...error };

    if (!form.airlineName.value) {
      err.airlineName = "Airline Name is required.";
    } else {
      err.airlineName = "";
    }

    if (!form.phone.value) {
      err.phone = "Phone is required.";
    } else {
      err.phone = "";
    }

    if (!form.fax.value) {
      err.fax = "Fax is required.";
    } else {
      err.fax = "";
    }

    if (!form.homepage.value) {
      err.homepage = "Homepage is required.";
    } else {
      err.homepage = "";
    }

    if (!form.contactName.value) {
      err.contactName = "Contact Name is required.";
    } else {
      err.contactName = "";
    }

    if (!form.contactTitle.value) {
      err.contactTitle = "Contact Title is required.";
    } else {
      err.contactTitle = "";
    }

    if (!form.mobile.value) {
      err.mobile = "Mobile is required.";
    } else {
      err.mobile = "";
    }

    if (!form.email.value) {
      err.email = "Email is required.";
    } else {
      err.email = "";
    }

    if (
      err.airlineName ||
      err.phone ||
      err.fax ||
      err.homepage ||
      err.contactName ||
      err.contactTitle ||
      err.mobile ||
      err.email
    ) {
      setError(err);
      return false;
    }
    return true;
  };

  const getAirline = (id) => {
    dispatch(retrieveAirline(id));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const err = { ...error };
    if (e.target.value) {
      err[e.target.name] = "";
    } else {
      err[e.target.name] = "Required!";
    }

    setError(err);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var form = e.target;
    if (validateForm(e)) {
      var data = airline.airline;
      data.airlineName = form.airlineName.value;
      data.phone = form.phone.value;
      data.fax = form.fax.value;
      data.homepage = form.homepage.value;
      data.contactName = form.contactName.value;
      data.contactTitle = form.contactTitle.value;
      data.mobile = form.mobile.value;
      data.email = form.email.value;
      // editAirline(parseInt(airlineId), data);

      props.onUpdateAirline(parseInt(airlineId), data);
      closeModal();
    }
  };

  const closeModal = () => {
    $(".update-form-popup").animate({ top: "-300px" }, 300, function () {
      $(".overlay2").fadeOut();
    });
  };

  useEffect(() => {
    var mount = false;
    importAll(); 
    getAirline(airlineId);
    return () => {
      mount = true;
    };
  }, []);

  return (
    <>
      <div className="overlay2"></div>
      <div className="update-form-popup">
        <div className="update-tabs">
          <a href="#" className="update-tab-a">
            Update Form
          </a>
          <a href="#" className="update-close"></a>
          <div className="clear"></div>
        </div>
        <form className="update-tab-content" onSubmit={handleSubmit}>
          <div
            className="update-padding"
            style={{ margin: "5px 10px 20px 5px" }}
          >
            <h5 className="update-lbl">Update Airline Infomation:</h5>
            <div>
              <div>
                <div className="update-input-lbl">Airline Name<span style={{color:"red",fontSize:"12px"}}>*</span></div>
                <div className="validate-update-error">{error.airlineName}</div>
              </div>
              <div>
                <input
                  type="text"
                  name="airlineName"
                  onChange={handleChange}
                  defaultValue={airline?.airline.airlineName}
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div className="update-input-lbl">Phone<span style={{color:"red",fontSize:"12px"}}>*</span></div>
              <div className="validate-update-error">{error.phone}</div>
              <div>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  defaultValue={airline?.airline.phone}
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div className="update-input-lbl">Fax Number<span style={{color:"red",fontSize:"12px"}}>*</span> </div>
              <div className="validate-update-error">{error.fax}</div>
              <div>
                <input
                  type="text"
                  name="fax"
                  onChange={handleChange}
                  defaultValue={airline?.airline.fax}
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div className="update-input-lbl">Homepage<span style={{color:"red",fontSize:"12px"}}>*</span> </div>
              <div className="validate-update-error">{error.homepage}</div>
              <div>
                <input
                  type="text"
                  name="homepage"
                  onChange={handleChange}
                  defaultValue={airline?.airline.homepage}
                  className="form-control"
                />
              </div>
            </div>
            <h5 className="update-lbl" style={{ marginTop: "6px" }}>
              Update Contact Infomation:
            </h5>
            <div>
              <div className="update-input-lbl">ContactName<span style={{color:"red",fontSize:"12px"}}>*</span> </div>
              <div className="validate-update-error">{error.contactName}</div>
              <div>
                <input
                  type="text"
                  name="contactName"
                  onChange={handleChange}
                  defaultValue={airline?.airline.contactName}
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div className="update-input-lbl">Contact Title<span style={{color:"red",fontSize:"12px"}}>*</span> </div>
              <div className="validate-update-error">{error.contactTitle}</div>
              <div>
                <input
                  type="text"
                  name="contactTitle"
                  onChange={handleChange}
                  defaultValue={airline?.airline.contactTitle}
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div className="update-input-lbl">Mobile<span style={{color:"red",fontSize:"12px"}}>*</span> </div>
              <div className="validate-update-error">{error.mobile}</div>
              <div>
                <input
                  type="text"
                  name="mobile"
                  onChange={handleChange}
                  defaultValue={airline?.airline.mobile}
                  className="form-control"
                />
              </div>
            </div>
            <div>
              <div className="update-input-lbl">Email<span style={{color:"red",fontSize:"12px"}}>*</span> </div>
              <div className="validate-update-error">{error.email}</div>
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  defaultValue={airline?.airline.email}
                  className="form-control"
                />
              </div>
            </div>
            <footer className="update-bottom">
              <button className="update-btn" type="submit">
                Update!
              </button>
              <p className="update-forget-pass">
                Make sure with your changed data!
              </p>
              <div className="clear"></div>
            </footer>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateAirline;
