import React from 'react';
import CopyrightMenu from "./CopyrightMenu";
import { FiHeart } from 'react-icons/fi'
import sectiondata from "../../../store/store";

function Copyright() {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="copy-right margin-top-50px padding-top-40px padding-bottom-40px">
                        <p className="copy__desc">
                            Copyright Dirto 2020. Made with <span className="la"><FiHeart /></span> by <a href="https://themeforest.net/user/techydevs/portfolio">TechyDevs</a> &copy;
                        </p>

                        <CopyrightMenu languages={sectiondata.footerdata.copyright.languages} menus={sectiondata.footerdata.copyright.menus} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Copyright;
