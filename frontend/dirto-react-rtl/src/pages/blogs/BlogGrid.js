import React  from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import BlogGridItems from "../../components/blogs/BlogGridItems";
import Pagination from "../../components/blogs/Pagination";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";

const state = {
    breadcrumbimg: breadcrumbimg,
}
function BlogGrid() {
    return (
        <main className="blog-grid-page">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="شبكة المدونة" MenuPgTitle="مدونة" img={state.breadcrumbimg} />

            {/* Blog grid */}
            <section className="blog-grid padding-top-40px padding-bottom-100px">
                <div className="container">
                    <BlogGridItems blitems={sectiondata.blogfullwidth.items} />

                    <div className="row">
                        <div className="col-lg-12">
                            <Pagination />
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

            {/* Scroll top button */}
            <ScrollTopBtn />

        </main>
    );
}

export default BlogGrid;
