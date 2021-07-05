import React  from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import PopularDestination from "../../components/places/PopularDestination";
import Button from "../../components/common/Button";
import { FiRefreshCw } from "react-icons/fi";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";

const state = {
    breadcrumbImg: breadcrumbimg,
}
function TopPlaces() {
    return (
        <main className="top-places">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="أفضل الأماكن" MenuPgTitle="التصنيفات" img={state.breadcrumbImg} />

            {/* Top Places */}
            <section className="cat-area destination-area padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <PopularDestination destinations={sectiondata.populardestination.destinations} />
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

            {/* Cta */}
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

export default TopPlaces;
