import React from 'react';
import SectionsHeading from "../../common/SectionsHeading";
import Banner3Tab from "./Banner3Tab";
import BannerParticle from "../../other/BannerParticle";
import SearchCategoryBanner from './SearchCategoryBanner';

function SearchBanner({bgImg, herotitle, herocontent}) {
    return (
        <>
            <section className="hero-wrapper3 homepage-bgimage-flight" id="home"  >
                {/* <BannerParticle /> */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* <div className="hero-heading">
                                <SectionsHeading title={herotitle} desc={herocontent} />
                            </div> */}
                            <SearchCategoryBanner/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
} 

export default SearchBanner;
// style={{backgroundImage: 'url('+ bgImg +')', backgroundPositionY : 'center',backgroundRepeat : 'no-repeat',backgroundSize : 'contain'}}