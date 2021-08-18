import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { confirmAccount } from '../../actions/actionAuth';
import { importAll } from '../../utils/JqueryImport';
import Footer from './Footer';
import Header from './Header';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ConfirmRegister = (props) => {
    let queryParam = useQuery();
    let history = useHistory();

    useEffect(() => {
        var mount = false;
        importAll();
        
        if (queryParam.get("id")) {
            props.confirmAccount(queryParam.get("id"));
        } else {
            history.push("/");
        }

        return () => {
            mount = true;
        }
    },[]);

    useEffect(() => {
        var mount = false;
        importAll();
        
        if (props.auth.confirmAccount?.message && !props.auth.confirmAccount?.success && props.auth.form === "confirmAcount") {
            alert(props.auth.confirmAccount.message + "Please check your email.");
            history.push("/");
        }
        
        return () => {
            mount = true;
        }
    });
    
    return (
        <div>
            <Header />
            <div className="main-cont">
                <div class="inner-page" style={{height:"50vh"}}>
                    <header class="page-lbl fly-in" style={{marginTop:"100px"}}>
                        <div class="offer-slider-lbl">Thank You!</div>
                        <p>Your account was activated. Go back to <Link to="/">Home page</Link>.</p>
                    </header>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        confirmAccount: (id) =>{
            dispatch(confirmAccount(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegister);