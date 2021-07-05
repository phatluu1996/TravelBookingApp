import React from 'react';
import GeneralHeader from "../components/common/GeneralHeader";
import Banner6 from "../components/banner/banner6/Banner6";
import FaqCategories from "../components/other/categories/FaqCategories";
import AccordionList from "../components/other/AccordionList";
import SectionsHeading from "../components/common/SectionsHeading";
import AskQuestionField from "../components/contact/AskQuestionField";
import NewsLetter from "../components/other/cta/NewsLetter";
import Footer from "../components/common/footer/Footer";
import ScrollTopBtn from "../components/common/ScrollTopBtn";
import sectiondata from "../store/store";
import IconBoxTwo from "../components/other/iconboxes/IconBoxTwo";

function Faq() {
    return (
        <main className="faq-page">
            {/* Header */}
            <GeneralHeader />

            {/* Banner */}
            <Banner6 title="مرحبا كيف يمكننا مساعدتك؟" />

            {/* Category */}
            <section className="hiw-area section-bg padding-top-80px padding-bottom-50px after-none text-center">
                <div className="container">
                    <FaqCategories />
                </div>
            </section>

            {/* faq */}
            <section className="faq-area padding-top-100px padding-bottom-100px">
                <div className="container">
                    <div className="row section-title-width section-title-ml-mr-0">
                        <div className="col-lg-12">
                            <SectionsHeading title={sectiondata.accordions.sectitle} desc={sectiondata.accordions.seccontent} />
                        </div>
                    </div>
                    <div className="row margin-top-35px">
                        <div className="col-lg-8">
                            <AccordionList accordionItems={sectiondata.accordions.items} />
                        </div>
                        <div className="col-lg-4">
                            <AskQuestionField title="لا يزال لديك سؤال؟" />
                        </div>
                    </div>

                    <div className="section-block-2 margin-top-120px"></div>

                    <div className="row padding-top-100px">
                        <IconBoxTwo items={sectiondata.iconboxes.iconlist1} />
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

export default Faq;
