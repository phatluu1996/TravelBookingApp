import React, { Component } from 'react';

const PopupRegister = () => {
    return (<>
        <form className="autorize-tab-content">
            <div className="autorize-padding">
                <h6 className="autorize-lbl">Register for Your Account</h6>
                <div>
                    <div className="autorize-input-lbl">Username:</div>
                    <input type="text" placeholder="Name" />
                </div>
                <div>
                    <div className="autorize-input-lbl">Password:</div>
                    <input type="password" placeholder="Password" />
                </div>
                <div>
                    <div className="autorize-input-lbl">Confirm:</div>
                    <input type="password" placeholder="Password" />
                </div>
                <footer className="autorize-bottom">
                    <button className="authorize-btn" type="submit">Registration</button>
                    <div className="clear"></div>
                </footer>
            </div>
        </form>
    </>);
}
export default PopupRegister;