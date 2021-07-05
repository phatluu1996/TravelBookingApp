import React  from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import BlogSidebar from "../../components/sidebars/BlogSidebar";
import BlogFullWidthItems from "../../components/blogs/BlogFullWidthItems";
import Pagination from "../../components/blogs/Pagination";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import breadcrumbimg from '../../assets/images/bread-bg.jpg'
import sectiondata from "../../store/store";

const state = {
    breadcrumbimg: breadcrumbimg,
}
function BlogFullWidth() {
    return (
        <main className="blog-fullwidth-page">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="العرض الكامل للمدونة" MenuPgTitle="مدونة" img={state.breadcrumbimg} />

            {/* Blog */}
            <section className="blog-grid padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <BlogFullWidthItems blitems={sectiondata.blogfullwidth.items} />
                        </div>
                        <div className="col-lg-4">
                            <BlogSidebar />
                        </div>
                    </div>
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

            {/* Scroll Top button */}
            <ScrollTopBtn />

        </main>
    );
}

export default BlogFullWidth;
