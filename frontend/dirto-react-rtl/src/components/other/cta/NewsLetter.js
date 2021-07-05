import React from 'react';
import SectionsHeading from "../../common/SectionsHeading";
import { FaRegEnvelope } from 'react-icons/fa'

function NewsLetter({title, content, inputplaceholder, btntext}) {
    return (
        <>
            <section className="cta-area cta-area2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cta-box d-flex align-items-center">
                                <div className="col-lg-8">
                                    <SectionsHeading title={title} titleClass="text-white" desc={content} />
                                </div>
                                <div className="col-lg-4">
                                    <div className="contact-form-action">
                                        <form method="post">
                                            <div className="form-group mb-0">
                                                <span className="form-icon">
                                                    <FaRegEnvelope />
                                                </span>
                                                <input className="form-control" type="email" placeholder={inputplaceholder} />
                                                <button className="theme-btn" type="submit">{btntext}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default NewsLetter;
