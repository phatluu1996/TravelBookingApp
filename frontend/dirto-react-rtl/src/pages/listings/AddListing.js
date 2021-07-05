import React  from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import GeneralInfo from "../../components/addlisting/GeneralInfo";
import AddLocation from "../../components/addlisting/AddLocation";
import AddFullDetails from "../../components/addlisting/AddFullDetails";
import PhotoUploader from "../../components/addlisting/PhotoUploader";
import Amenities from "../../components/addlisting/Amenities";
import OpeningHours from "../../components/addlisting/OpeningHours";
import AddPrice from "../../components/addlisting/AddPrice";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import { Link } from "react-router-dom";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";

const states = {
    breadcrumbimg: breadcrumbimg
}
function AddListing() {
    return (
        <main className="add-listing">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="إضافة قائمة" MenuPgTitle="القوائم" img={states.breadcrumbimg} />

            {/* Add Listing */}
            <section className="add-listing-area padding-top-40px padding-bottom-100px text-left">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 mx-auto">
                            {/* general */}
                            <GeneralInfo />

                            {/* location */}
                            <AddLocation />

                            {/* details */}
                            <AddFullDetails />

                            {/* uploader */}
                            <PhotoUploader />

                            {/* amenities */}
                            <Amenities />

                            {/* hours */}
                            <OpeningHours />

                            {/* price */}
                            <AddPrice />

                            {/* billing */}
                            <div className="billing-form-item p-0 border-0 mb-0 shadow-none">
                                <div className="billing-content p-0">
                                    <div className="custom-checkbox d-block mr-0">
                                        <input type="checkbox" id="privacy" />
                                        <label htmlFor="privacy">أنا أتفق مع كما سبق <Link to="#" className="color-text">سياسة خاصة</Link></label>
                                    </div>
                                    <div className="custom-checkbox d-block mr-0">
                                        <input type="checkbox" id="terms" />
                                        <label htmlFor="terms">أنا أتفق مع كما سبق <Link to="#" className="color-text">شروط الخدمة</Link>
                                        </label>
                                    </div>
                                    <div className="btn-box mt-4">
                                        <button type="submit" className="theme-btn border-0">تقديم القائمة</button>
                                    </div>
                                </div>
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

export default AddListing;
