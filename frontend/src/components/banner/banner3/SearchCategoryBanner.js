import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GiPositionMarker } from 'react-icons/gi'
import { IoMdMusicalNotes } from 'react-icons/io'
import { AiFillApi, AiOutlineHome } from 'react-icons/ai'
import { FaSearchPlus } from 'react-icons/fa'
import BannerOneSearchInput from "../banner1/BannerOneSearchInput";
import BannerThreeSearchInput2 from "./BannerThreeSearchInput2";
import BannerThreeSearchInput3 from "./BannerThreeSearchInput3";
import FlightBannerSearchInput from './FlightBannerSearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneArrival, faPlaneDeparture, faPlane, faHotel } from '@fortawesome/free-solid-svg-icons'


function SearchCategoryBanner() {
    const changeBg = (className) =>{
        document.querySelector("#home").className = className;
    }
    return (
        <>
            <Tabs>
                <div className="tab-shared">
                    <TabList className="nav nav-tabs" id="myTab">
                        <Tab>
                            <div className="nav-link theme-btn radius-rounded" onClick={(e) => changeBg("hero-wrapper3 homepage-bgimage-flight")}>
                                <FontAwesomeIcon icon={faPlane}/> Flights                           
                            </div>
                        </Tab>
                        <Tab>
                            <div className="nav-link theme-btn radius-rounded" onClick={(e) => changeBg("hero-wrapper3 homepage-bgimage-hotel")}>
                                <FontAwesomeIcon icon={faHotel}/> Hotels
                            </div>
                        </Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <FlightBannerSearchInput />
                </TabPanel>
                <TabPanel>
                    <FlightBannerSearchInput />
                </TabPanel>
                {/* TODO: Add Hotel BannerSearchInput */}
            </Tabs>
        </>
    );
}

export default SearchCategoryBanner;
