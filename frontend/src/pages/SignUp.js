import React from 'react';
import SignUpBox from "../components/other/account/SignUpBox";
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from '../assets/images/bread-bg.jpg'
import sectiondata from "../store/store";
import LoginBreadcrumb from '../components/common/LoginBreadcrumb';

const state = {
    breadcrumbimg: breadcrumbimg,
}
function SignUp() {
    return (
        <main className="signup-page">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            {/* <Breadcrumb CurrentPgTitle="Sign Up" img={state.breadcrumbimg} /> */}
            <LoginBreadcrumb/>

            <section className="form-shared padding-top-20px padding-bottom-20px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <SignUpBox title="Create new user account !" subtitle="be our member." />
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

export default SignUp;
