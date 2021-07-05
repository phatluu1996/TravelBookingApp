import React from 'react';

function FooterContactWidget({title, lists}) {
    return (
        <>
            <div className="col-lg-3 column-td-6">
                <div className="footer-item text-left">
                    <h4 className="footer__title">
                        {title}
                    </h4>
                    <ul className="info-list contact-links">
                        {lists.map((list, index) => {
                            return (
                                <li key={index}>
                                    <span className="la">
                                        {list.icon}
                                    </span> {list.text}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default FooterContactWidget;
