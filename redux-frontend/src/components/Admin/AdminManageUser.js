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

  createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: 'rgba(0, 0, 0, 0.125)',
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
                      <DataTable className="table-a" columns={header} data={props.users.data ? props.users.data : []} pagination paginationPerPage={5} theme="solarized" />
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