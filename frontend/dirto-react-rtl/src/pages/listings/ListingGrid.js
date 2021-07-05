import React, { Component } from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import PlaceGrid from "../../components/places/PlaceGrid";
import Button from "../../components/common/Button";
import { FiRefreshCw } from "react-icons/fi";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import GenericHeader from "../../components/common/GenericHeader";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";

const state = {
    bdimg: breadcrumbimg,
}
function ListingGrid() {
    return (
        <main className="listing-grid">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="قائمة الشبكة" MenuPgTitle="القوائم" img={state.bdimg} />

            {/* Place Grid */}
            <section className="card-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <GenericHeader />
                        </div>
                    </div>

                    <div className="row">
                        <PlaceGrid griditems={sectiondata.placesgrid} />
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="button-shared mt-4 text-center">
                                <Button text="تحميل المزيد" url="#">
                                    <span className="la">
                                        <FiRefreshCw />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <NewsLetter
                content={sectiondata.calltoactions.newsletters.content}
                title={sectiondata.calltoactions.newsletters.title}
                btntext={sectiondata.calltoactions.newsletters.btntext}
                inputplaceholder={sectiondata.calltoactions.newsletters.inputplaceholder} />

            {/* Footer */}
            <Footer />

            {/* scroll top button */}
            <ScrollTopBtn />
        </main>
    );
}

export default ListingGrid;
