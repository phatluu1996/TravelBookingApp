import { faReply, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { clearFeedbackState, fetchFeedback } from '../../../actions/actionFeedback';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';

const AdminFeedback = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectFeedback, setSelectFeedback] = useState(null)

    createTheme('solarized', {
        text: {
            primary: 'white',
            secondary: '#2aa198',
        },
        background: {
            default: '#191c24',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
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

    const header = [
        {
            name: '#',
            selector: 'id',
            sortable: true,
            width: '5%'
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Subtitle',
            selector: 'subTitle',
            sortable: true
        },
        {
            name: 'Message',
            selector: 'message',
            sortable: true
        },
        {
            name: 'Actions',
            // cell: flight => <div data-tag="allowRowEvents"><div style={{ fontWeight: bold }}>{row.title}</div>{row.summary}</div>,
            cell: (feedback, index) => <>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#feedback-" + index} data-whatever="@mdo"><FontAwesomeIcon icon={faReply}></FontAwesomeIcon></button>
                <div class="modal fade" id={"feedback-" + index} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Feedback</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={(e) => handleSubmit(e, feedback.id)}>
                                    <div class="form-group">
                                        <label for="recipient-name" class="col-form-label">Recipient:</label>
                                        <input type="text" class="form-control" id="name" name="name" readOnly defaultValue={feedback.name} />
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Message:</label>
                                        <input type="text" class="form-control" id="mail" name="email" readOnly defaultValue={feedback.email} />
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Subtitle:</label>
                                        <input type="text" class="form-control" id="subtitle" name="subTitle" readOnly defaultValue={feedback.subTitle} />
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Message:</label>
                                        <textarea readOnly rows="7" class="form-control" id="message" name="message">{feedback.message}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="message-text" class="col-form-label">Reply:</label>
                                        <textarea required rows="7" class="form-control" id="reply" name="reply">{feedback.reply}</textarea>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-primary btn-sm mr-2" data-dismiss="modal">Reply</button>
                                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>                            
                        </div>
                    </div>
                </div>
            </>
        }
    ];

    useEffect(() => {
        props.getFeedbacks();
    }, [])

    const handleSubmit = (e, id) => {
        e.preventDefault();
        var form = e.target;
        if (id) {
            var data = {
                name: form.name.value,
                email: form.email.value,
                subtitle: form.subTitle.value,
                reply: form.reply.value,
                message: form.message.value
            }
            props.replyFeedback(id, data);
        }
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
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title">Feedbacks</h4>
                                            <div className="table-responsive">
                                                {props.feedback.data && <DataTable className="table"
                                                    customStyles={customStyles}
                                                    theme='solarized'
                                                    progressPending={!props.feedback.data}
                                                    columns={header}
                                                    data={props.feedback.data}
                                                    pagination
                                                    paginationPerPage={5}
                                                // subHeaderComponent={subHeader}
                                                />}
                                            </div>
                                            {props.feedback.requesting && <div class="spinner-border text-primary" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>}
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
        feedback: state.feedback
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFeedbacks: () => {
            dispatch(fetchFeedback());
        },
        replyFeedback: () => {
            dispatch()
        },
        clearState: () => {
            dispatch(clearFeedbackState());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminFeedback);
