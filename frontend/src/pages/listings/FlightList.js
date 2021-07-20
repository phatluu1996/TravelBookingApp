import React, { useEffect, useState } from 'react';
import {FiRefreshCw} from "react-icons/fi";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import PlaceListing from "../../components/places/PlaceListing";
import ListingListSidebar from "../../components/sidebars/ListingListSidebar";
import Button from "../../components/common/Button";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import GenericHeader from "../../components/common/GenericHeader";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import FlightListing from '../../components/places/FlightListing';
import { fetchFlight } from '../../actions/actionFlight';

const breadcrump = {
    breadcrumbimg: breadcrumbimg,
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function FlightList(props) {
    const history = useHistory(); 
    // const [flights, setFlights] = useState([]);   
    let query = useQuery();
    let param = useParams();

    useEffect(() => {
        var mount = false;
        if(!query.get("from") && !query.get("to") && !query.get("departureDay")){
            history.push("/index3");
        }else{
            props.getFlight(query.get("from"), query.get("to"), query.get("departureDay"));    
        }            
        return () => {
            mount = true;
        }
    }, [])
    
    return (
        <main className="listing-list">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="Listing List" MenuPgTitle="Listings" img={breadcrump.breadcrumbimg} />

            {/* Place List */}
            <section className="card-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <GenericHeader />
                        </div>

                        {/* <div className="col-lg-2">
                            <ListingListSidebar />
                        </div> */}

                        <div className="col-lg-12">
                            <FlightListing listitems={props.flights.data} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="button-shared text-center">
                                <Button text="load more" url="#" className="border-0">
                                    <span className="d-inline-block">
                                        <FiRefreshCw />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />

            {/* Footer */}
            <Footer />

            <ScrollTopBtn />
        </main>
    );
}


const mapStateToProps = (state, ownProps) => {
    return {
        flights : state.flight,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight : (from, to, ddate) => {
            dispatch(fetchFlight(from, to, ddate))    
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
