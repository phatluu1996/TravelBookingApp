import React from 'react';
import SignInOptions from "./SignInOptions";
import {Link} from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegEnvelope } from 'react-icons/fa'
import { FiLock } from 'react-icons/fi'

function SignUpBox({title, subtitle}) {
    return (
        <>
            <div className="billing-form-item mb-0">
                <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
                    <h3 className="widget-title font-size-28 pb-0">
                        {title}
                    </h3>
                    <p className="font-size-16 font-weight-medium">
                        {subtitle}
                    </p>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action text-left">
                        <form method="post">
                            <div className="row">

                                <SignInOptions />

                                <div className="col-lg-12">
                                    <div className="account-assist mt-4 mb-4 text-center">
                                        <p className="account__desc">أو</p>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">الاسم الاول</label>
                                        <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser />
                                                </span>
                                            <input className="form-control" type="text" name="text" placeholder="الاسم الاول" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">الكنية</label>
                                        <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser />
                                                </span>
                                            <input className="form-control" type="text" name="text" placeholder="الكنية" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">اسم المستخدم</label>
                                        <div className="form-group">
                                                <span className="form-icon">
                                                    <AiOutlineUser />
                                                </span>
                                            <input className="form-control" type="text" name="text" placeholder="اسم المستخدم" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">البريد الإلكتروني</label>
                                        <div className="form-group">
                                            <span className="form-icon">
                                                <FaRegEnvelope />
                                            </span>
                                            <input className="form-control" type="email" name="text" placeholder="أدخل البريد الإلكتروني" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">كلمه السر</label>
                                        <div className="form-group">
                                            <span className="form-icon">
                                                <FiLock />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="كلمه السر" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="input-box">
                                        <label className="label-text">تأكيد كلمة المرور</label>
                                        <div className="form-group">
                                            <span className="form-icon">
                                                <FiLock />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="تأكيد كلمة المرور" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="custom-checkbox d-block mr-0">
                                            <input type="checkbox" id="chb13" />
                                            <label htmlFor="chb13">أنا أتفق مع كما سبق <Link to="#" className="color-text">سياسة خاصة</Link></label>
                                        </div>
                                        <div className="custom-checkbox d-block mr-0">
                                            <input type="checkbox" id="chb14" />
                                            <label htmlFor="chb14">أنا أتفق مع كما سبق <Link to="#" className="color-text">شروط الخدمة</Link></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="btn-box margin-top-20px margin-bottom-20px">
                                        <button className="theme-btn border-0" type="submit">
                                            تسجيل حساب
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <p className="font-weight-medium">
                                        هل لديك حساب؟ <Link to="/login" className="color-text">تسجيل الدخول</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUpBox;