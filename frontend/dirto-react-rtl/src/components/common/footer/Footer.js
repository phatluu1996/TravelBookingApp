import React from 'react';
import Copyright from "./Copyright";
import FooterLeftWidget from "./FooterLeftWidget";
import FooterQuickLinkWidget from "./FooterQuickLinkWidget";
import FooterCategoryWidget from "./FooterCategoryWidget";
import FooterContactWidget from "./FooterContactWidget";
import sectiondata from "../../../store/store";

function Footer() {
    return (
        <>
            <section className="footer-area section-bg padding-top-140px">
                <div className="box-icon"></div>
                <div className="box-icon"></div>
                <div className="box-icon"></div>
                <div className="box-icon"></div>
                <div className="box-icon"></div>
                <div className="box-icon"></div>
                <div className="container">
                    <div className="row">
                        <FooterLeftWidget footerdesc={sectiondata.footerdata.footerdesc} footerlogo={sectiondata.footerdata.footerlogo} footersocial={sectiondata.footerdata.sociallinks} />
                        <FooterQuickLinkWidget title={sectiondata.footerdata.footerquicklinks.title} links={sectiondata.footerdata.footerquicklinks.links} />
                        <FooterCategoryWidget title={sectiondata.footerdata.footercategories.title} items={sectiondata.footerdata.footercategories.links} />
                        <FooterContactWidget title={sectiondata.footerdata.footercontact.title} lists={sectiondata.footerdata.footercontact.lists} />
                    </div>

                    {/* Copyright */}
                    <Copyright />
                </div>
            </section>
        </>
    );
}

export default Footer;
