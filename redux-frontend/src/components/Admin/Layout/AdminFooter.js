import React from 'react';

const AdminFooter = (props) => {
    return (
        <div>
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © team3.sparrow.com 2021</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> Made by<a href="#" target="_blank"> Our team</a> with ♥ </span>
                </div>
            </footer>
        </div>
    );
};

export default AdminFooter;