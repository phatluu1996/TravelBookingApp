import React from 'react';
import {Link} from "react-router-dom";

function FooterCategoryWidget({title, items}) {
    return (
        <>
            <div className="col-lg-3 column-td-6">
                <div className="footer-item text-left">
                    <h4 className="footer__title">
                        {title}
                    </h4>
                    <ul className="list-items">
                        {items.map((link, index) => {
                            return (
                                <li key={index}>
                                    <Link to={link.path}>{link.text}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default FooterCategoryWidget;
