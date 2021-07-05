import React, {Component} from 'react';
import ModalVideo from "react-modal-video";
import {Link} from "react-router-dom";

class Banner5 extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
        this.openModal = this.openModal.bind(this)
    }
    openModal() {
        this.setState({ isOpen: true })
    }
    render() {
        return (
            <>
                <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='R2kiP9Qu7Pc' onClose={() => this.setState({ isOpen: false })} />
                <section className="breadcrumb-area about-breadcrumb">
                    <div className="breadcrumb-wrap">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="breadcrumb-content">
                                        <h2 className="breadcrumb__title mb-0"> غتنم كل يوم فرصة لتصبح مسلمًا أفضل.<br /> كما يربط الناس مع محلية رائعة <br /> الأعمال</h2>
                                    </div>
                                </div>
                                <div className="col-lg-4 text-right">
                                    <div className="video-play-btn">
                                        <Link
                                            className="mfp-iframe video-popup-btn"
                                            onClick={this.openModal}
                                           to="#" title="شغل الفيديو">
                                            لعب
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bread-svg">
                        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
                            <path d="M-4.22,89.30 C280.19,26.14 324.21,125.81 511.00,41.94 L500.00,150.00 L0.00,150.00 Z" />
                        </svg>
                    </div>
                </section>
            </>
        );
    }
}

export default Banner5;