import React  from 'react';
import GeneralHeader from "../components/common/GeneralHeader";
import Breadcrumb from "../components/common/Breadcrumb";
import RecoverPassBox from "../components/other/account/RecoverPassBox";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import breadcrumbimg from '../assets/images/bread-bg.jpg'
import sectiondata from "../store/store";

const state = {
    breadcrumbimg: breadcrumbimg,
}
function RecoverPassword() {
    return (
        <main className="recover-pass-page">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="إستعادة كلمة المرور" MenuPgTitle="الصفحات" img={state.breadcrumbimg} />

            {/* recover password */}
            <RecoverPassBox />

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

export default RecoverPassword;
