import React  from 'react';
import Logo from "../Logo";
import SocialProfile from "../../other/account/SocialProfile";

function FooterLeftWidget({footerlogo, footerdesc, footersocial}) {
    return (
        <>
            <div className="col-lg-3 column-td-6">
                <div className="footer-item text-left">
                    <div className="logo">
                        <Logo url={footerlogo} className="foot-logo" />
                        <p className="footer__desc">
                            {footerdesc}
                        </p>
                        <SocialProfile socials={footersocial} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FooterLeftWidget;
