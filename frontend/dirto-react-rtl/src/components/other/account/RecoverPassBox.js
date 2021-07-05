import React from 'react';
import {Link} from "react-router-dom";
import { FaRegEnvelope } from 'react-icons/fa'

function RecoverPassBox() {
    return (
        <>
            <section className="form-shared padding-top-40px padding-bottom-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="billing-form-item mb-0 text-left">
                                <div className="billing-title-wrap">
                                    <h3 className="widget-title font-size-28">إستعادة كلمة المرور!</h3>
                                    <p className="font-size-16 font-weight-medium">
                                        أدخل البريد الإلكتروني لحسابك لإعادة تعيين كلمة المرور. بعد ذلك ستتلقى رابطًا بالبريد الإلكتروني لإعادة تعيين كلمة المرور إذا كان لديك أي مشكلة حول إعادة تعيين كلمة المرور
                                        <Link to="/contact" className="color-text">اتصل بنا</Link>
                                    </p>
                                </div>
                                <div className="billing-content">
                                    <div className="contact-form-action">
                                        <form method="post">
                                            <div className="input-box">
                                                <label className="label-text">بريدك الالكتروني</label>
                                                <div className="form-group">
                                                    <span className="la form-icon"><FaRegEnvelope /></span>
                                                    <input className="form-control" type="email" name="text" placeholder="أدخل عنوان البريد الالكتروني" />
                                                </div>
                                            </div>
                                            <div className="btn-box margin-top-20px margin-bottom-20px">
                                                <button className="theme-btn border-0" type="submit">
                                                    إعادة تعيين كلمة المرور
                                                </button>
                                            </div>
                                            <p className="font-weight-medium">
                                                <Link to="/login" className="color-text">تسجيل الدخول </Link>
                                                أو
                                                <Link to="/sign-up" className="color-text"> تسجيل</Link>
                                            </p>
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

export default RecoverPassBox;
