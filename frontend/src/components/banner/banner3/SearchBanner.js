import React from 'react';
import HomePageHeading from "../../common/HomePageHeading";
import Banner3Tab from "./Banner3Tab";
import BannerParticle from "../../other/BannerParticle";
import SearchCategoryBanner from './SearchCategoryBanner';
import { FiChevronDown } from 'react-icons/fi';

function SearchBanner() {
    return (
        <>
            <section className="hero-wrapper4 homepage-bgimage-flight" id="home">
                <div className="hero-overlay"></div>
                
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="hero-heading mb-3">
                                <HomePageHeading desc={"Log in or Register to enjoy"} descClass={"text-white"}/>
                            </div>
                            <SearchCategoryBanner/>
                        </div>
                    </div>
                </div>
                <div className="hero-svg-content text-center">
                    <i>
                        <FiChevronDown />
                    </i>
                </div>
            </section>
        </>
    );
} 

export default SearchBanner;
// style={{backgroundImage: 'url('+ bgImg +')', backgroundPositionY : 'center',backgroundRepeat : 'no-repeat',backgroundSize : 'contain'}}