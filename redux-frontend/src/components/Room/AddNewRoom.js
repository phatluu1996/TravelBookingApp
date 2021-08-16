import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { createRoom, updateRoom } from "../../actions/actionRoom";
import { updateLocation } from "../../actions/actionLocation";
import { importAll } from "../../utils/JqueryImport";
import AdminFooter from '../Admin/Layout/AdminFooter';
import AdminNavbar from '../Admin/Layout/AdminNavbar';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";


const AddNewRoom = ({ closeModal, componentStatus, room, hotel }) => {

    // const [room,setRoom] = useState(room);
    const [isSubmit, setIsSubmit] = useState(false);
    const [status, setStatus] = useState(false);
    const [selectItem,setSelectItem] = useState([]);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const [validateError, setValidateError] = useState({
        roomNumber: "",
        roomType: "",
        price: "",
        maxAdult: "",
        maxChildren: ""
    });

    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',

                color: 'white',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
            activeSortStyle: {
                color: '#ff7200',
                '&:focus': {
                    outline: 'none',
                },
                '&:hover:not(:focus)': {
                    color: '#ff7200',
                },
            },
            inactiveSortStyle: {
                '&:focus': {
                    outline: 'none',
                    color: '#ff7200',
                },
                '&:hover': {
                    color: '#ff7200',
                },
            },
        },
        pagination: {
            style: {
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                minHeight: '56px',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',

            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
                transition: '0.4s',
                color: '#007bff',
                fill: '#007bff',
                backgroundColor: 'transparent',
                '&:disabled': {
                    cursor: 'unset',
                    color: '#007bff',
                    fill: 'white',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: 'white',
                },
                '&:focus': {
                    outline: 'white',
                    backgroundColor: 'white',
                },
            },
        },
    };

    const imageHeader = [

        {
            name: 'Image Path',
            selector: 'imagePath',
            sortable: true
        },
        {
            name: 'Image Picture',
            cell: (image, index) =>
                <React.Fragment key={index}>
                    <img style={{ maxWidth: 94, maxHeight: 75 }} alt="" src={image?.imagePath} />
                </React.Fragment>
        }
    ];

    // const removeImage = image => {
    //     var arr = [...images];
    //     arr.sort(image);
    //     console.log(image);
    // }

    const roomCreate = (data) => { dispatch(createRoom(data)) };
    const roomUpdate = (id,data) => { dispatch(updateRoom(id,data))}

    const checkBoxHandel = (e) =>{
            setSelectItem(e.selectedRows);
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        let formData = new FormData();
        console.log('' + hotel.id);
        // byte[] bytes = images.f.read(file_upload .toPath());
        if (handleChange(form)) {
            formData.append('roomNumber', parseInt(form.roomNumber.value));
            formData.append('hotel', '' + hotel.id);
            formData.append('roomType', form.roomType.value);
            formData.append('price', parseInt(form.price.value));
            formData.append('maxAdult', parseInt(form.maxAdult.value));
            formData.append('maxChildren', parseInt(form.maxChildren.value));
            formData.append('roomStatus', 0);
            if(images.length > 0 || images != []){
                for (let index = 0; index < images.length; index++) {
                    const image = images[index];
                    formData.append('files', image);
                }
            }else{
                formData.append('files', []);
            }
            
            if(componentStatus === "Create Room"){
                roomCreate(formData);
            }else{
                roomUpdate(room.id,formData);
            }
            
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


    useEffect(() => {
        let mount = false;
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
                                    <h3 className="card-title ">{componentStatus}</h3>
                                </div>
                                <div className="col col-lg-4">
                                    <button type="submit" disabled={componentStatus === "View Room" ? true : false} onSubmit={handelSubmit} className="btn btn-success"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>
                                    <button onClick={e => closeModal(false)} className="btn btn-md btn-danger "><FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon></button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Room Number*</label>
                                        <input
                                            type="number" disabled={componentStatus === "View Room" ? true : false}
                                            className={formControlClass("roomNumber")} name="roomNumber"
                                            defaultValue={room ? room.roomNumber : ""}
                                        />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.roomNumber}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">RoomType*</label>
                                        <input type="text"
                                            disabled={componentStatus === "View Room" ? true : false}
                                            className={formControlClass("roomType")} name="roomType"
                                            defaultValue={room ? room.roomType : ""}
                                        />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.roomType}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Price*</label>
                                        <input type="number"
                                            disabled={componentStatus === "View Room" ? true : false}
                                            className={formControlClass("price")} name="price"
                                            defaultValue={room ? room.price : ""}
                                        />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.price}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Max Adult*</label>
                                        <input type="number" disabled={componentStatus === "View Room" ? true : false}
                                            className={formControlClass("maxAdult")} name="maxAdult"
                                            defaultValue={room ? room.maxAdult : ""}
                                        />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.maxAdult}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Max Children*</label>
                                        <input type="number" disabled={componentStatus === "View Room" ? true : false}
                                            className={formControlClass("maxChildren")} name="maxChildren"
                                            defaultValue={room ? room.maxChildren : ""}
                                        />
                                        <div className="valid-feedback"></div>
                                        <div className="invalid-feedback">{validateError.maxChildren}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-form-label">Add Image</label>
                                        <input className="form-control" disabled={componentStatus === "View Room" ? true : false} onChange={uploadFiles} type="file" id="files" name="files" multiple />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                    <div className="col-sm-10"></div>
                                        {/* <div className="col-sm-2">
                                        <button hidden={componentStatus === "View Room" ? true : false} className="btn btn-danger" 
                                            onClick={() => removeImage()}
                                        ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
                                        </div> */}
                                    </div>
                                </div>
                                {/* {
                                    componentStatus === "Create Room"
                                        ? <></> :
                                        <DataTable className="table"
                                            // overflowY
                                            onSelectedRowsChange={checkBoxHandel}
                                            selectableRows={componentStatus === "View Room" ? false : true}
                                            style={{ maxWidth: '500px' }}
                                            customStyles={customStyles}
                                            theme='solarized'
                                            progressPending={!room?.images}
                                            columns={imageHeader}
                                            data={room && room?.images.length> 0 && Array.isArray(room?.images)?room?.images:[]}
                                            pagination
                                            paginationPerPage={3}
                                        />
                                } */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNewRoom;


{/* <DataTable className="table"
customStyles={customStyles}
theme='solarized'
progressPending={!props.rooms?.data}
columns={roomHeader}
data={Array.isArray(props.rooms?.data) && props.rooms?.data.length > 0?props.rooms?.data:""}
pagination
paginationPerPage={5}
/> */}