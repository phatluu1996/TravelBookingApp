import React from 'react';

function FooterQuickLinkWidget({title, links}) {
    return (
        <>
            <div className="col-lg-3 column-td-6">
                <div className="footer-item text-left">
                    <h4 className="footer__title">
                        {title}
                    </h4>
                    <ul className="list-items">
                        {links.map((link, index) => {
                            return (
                                <li key={index}>
                                    <a href={link.path}>{link.text}</a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default FooterQuickLinkWidget;
