import React  from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import PopularCategories from "../../components/other/categories/PopularCategories";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import PopularCategoriesMore from "../../components/other/categories/PopularCategoriesMore";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";

const state = {
    breadcrumbImg: breadcrumbimg,
}
function AllCategories() {
    return (
        <main className="all-categories">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="جميع الفئات" MenuPgTitle="التصنيفات" img={state.breadcrumbImg} />

            {/* all categories */}
            <section className="cat-area padding-top-40px padding-bottom-80px">
                <div className="container">
                    <div className="row">
                        <PopularCategories catitems={sectiondata.popularcategories.categories} />
                        <PopularCategoriesMore catitems={sectiondata.popularcategories.morecats} />
                    </div>
                </div>
            </section>

            {/* NewsLetter */}
            <NewsLetter
                content={sectiondata.calltoactions.newsletters.content}
                title={sectiondata.calltoactions.newsletters.title}
                btntext={sectiondata.calltoactions.newsletters.btntext}
                inputplaceholder={sectiondata.calltoactions.newsletters.inputplaceholder} />

            {/* Footer */}
            <Footer />

            {/* Scroll top button */}
            <ScrollTopBtn />

        </main>
    );
}

export default AllCategories;
