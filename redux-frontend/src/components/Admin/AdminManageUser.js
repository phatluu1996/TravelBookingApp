import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AdminFooter from './Layout/AdminFooter';
import AdminNavbar from './Layout/AdminNavbar';
import AdminSidebar from './Layout/AdminSidebar';
import { getAllUsers } from '../../actions/actionUser';
import { importAll } from '../../utils/JqueryImport';
import DataTable, { createTheme } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminManageUser = (props) => {

  // createTheme('solarized', {
  //   text: {
  //     primary: '#268bd2',
  //     secondary: '#2aa198',
  //   },
  //   background: {
  //     default: 'rgba(0, 0, 0, 0.125)',
  //   },
  //   context: {
  //     background: '#cb4b16',
  //     text: '#FFFFFF',
  //   },
  //   divider: {
  //     default: '#073642',
  //   },
  //   action: {
  //     button: 'rgba(0,0,0,.54)',
  //     hover: 'rgba(0,0,0,.08)',
  //     disabled: 'rgba(0,0,0,.12)',
  //   },
  // });

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

  const header = [
    {
      name: 'USER',
      selector: 'account.userName',
      sortable: true,
    },
    {
      name: 'FIRST NAME',
      selector: 'firstName',
      sortable: true,
    },
    {
      name: 'LAST NAME',
      selector: 'lastName',
      sortable: true,
    },
    {
      name: 'GENDER',
      selector: 'gender',
      sortable: true,
    },
    {
      name: 'BIRTH DAY',
      selector: 'dateOfBirth',
      sortable: true,
    },
    {
      name: 'EMAIL',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'PHONE NUMBER',
      selector: 'phoneNumber',
      sortable: true,
    },
    {
      name: 'ACTIONS',
      // cell: flight => <div data-tag="allowRowEvents"><div style={{ fontWeight: bold }}>{row.title}</div>{row.summary}</div>,
      cell: user => <>
        <Link className="list-btn-sm mr-1" to={`/update-user-detail?id=${user.account.id}`}><FontAwesomeIcon className="list-btn-sm-icon" icon={faEdit}></FontAwesomeIcon> </Link>

        <Link className="list-btn-sm"><FontAwesomeIcon className="list-btn-sm-icon" icon={faTrash}></FontAwesomeIcon></Link></>,

    }
  ];

  const customStyles = {
    // rows: {
    //   style: {
    //     minHeight: '72px', // override the row height
    //   }
    // },
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
        // backgroundColor: '#ff7200',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        // borderTopColor: '#ff7200',

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
    // cells: {
    //   style: {
    //     paddingLeft: '8px', // override the cell padding for data cells
    //     paddingRight: '8px',
    //   },
    // },
  };



  useEffect(() => {
    props.getAllUsers();
  }, []);

  return (
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
                    <h4 className="card-title">List User</h4>
                    <div className="table-responsive">
                      <DataTable
                        className="table-a"
                        columns={header}
                        progressPending={!props.users.data}
                        data={props.users.data ? props.users.data : []}
                        pagination paginationPerPage={5}
                        theme="solarized"
                        customStyles={customStyles} />
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
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManageUser);