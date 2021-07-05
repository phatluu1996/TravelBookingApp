import React from 'react';
import { AiOutlineUser, AiOutlineFacebook, AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai'
import { FaRegEnvelope } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { BsLink45Deg, BsPencil } from 'react-icons/bs'
import { TiSocialGooglePlus } from 'react-icons/ti'

function AddFullDetails() {
    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">تفاصيل كاملة</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">اسم المالك</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <AiOutlineUser />
                                            </span>
                                            <input className="form-control" type="text" name="name" placeholder="اسم" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">البريد الإلكتروني</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <FaRegEnvelope />
                                            </span>
                                            <input className="form-control" type="email" name="email" placeholder="عنوان البريد الإلكتروني" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">هاتف <span className="text-muted">(اختياري)</span></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <FiPhone />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="رقم" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">موقع الكتروني <span className="text-muted">(اختياري)</span></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <BsLink45Deg />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="https://techydevs.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">رابط الفيسبوك <span className="text-muted">(اختياري)</span></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <AiOutlineFacebook />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="https://www.facebook.com/" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">رابط تويتر <span className="text-muted">(اختياري)</span></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <AiOutlineTwitter />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="https://www.twitter.com/" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">جوجل بلس <span className="text-muted">(اختياري)</span></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <TiSocialGooglePlus />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="https://plus.google.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">لينكد إن لينك <span className="text-muted">(اختياري)</span></label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <AiOutlineLinkedin />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="https://linkedin.com" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">وصف</label>
                                        <div className="form-group mb-0">
                                            <span className="la form-icon">
                                                <BsPencil />
                                            </span>
                                            <textarea className="message-control form-control" name="message" placeholder="اكتب الوصف"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddFullDetails;
