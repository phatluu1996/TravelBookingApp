import React from 'react';
import GeneralHeader from "../components/common/GeneralHeader";
import LoginBreadcrumb from "../components/common/LoginBreadcrumb";
import LoginBox from "../components/other/account/LoginBox";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from '../assets/images/bread-bg.jpg'
import sectiondata from "../store/store";

const state = {
    breadcrumbimg: breadcrumbimg,
}
function Login() {
    return (
        <main className="login-page">
            {/* Header */}
            <GeneralHeader className="mb-5"/>

            {/* Breadcrumb */}
            {/* <LoginBreadcrumb CurrentPgTitle="Login" img={"https://besthqwallpapers.com/Uploads/17-12-2017/33761/thumb2-halong-bay-4k-ocean-summer-vietnam.jpg"} /> */}

            <section className="form-shared padding-bottom-80px padding-top-100px margin-top-80px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <LoginBox title="Login" subtitle="with your account and enjoy the service." />
                        </div>
                    </div>
                </div>
            </section>

            {/* NewsLetter */}
            <NewsLetter newsLetterContent={sectiondata.calltoactions.newsletters} />            

            {/* Footer */}
            <Footer />

            <ScrollTopBtn />

        </main>
    );
}

export default Login;
