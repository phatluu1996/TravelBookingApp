import React  from 'react';
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegEnvelope } from 'react-icons/fa'
import { FiPhone } from 'react-icons/fi'
import { BsPencil } from 'react-icons/bs'
import { Link } from "react-router-dom";
import payment1 from '../../../assets/images/payment-img.png'
import payment2 from '../../../assets/images/paypal.png'

const state = {
    paymentImg: payment1,
    paypalImg: payment2,
}
function PersonalInfo() {
    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap text-left">
                    <h3 className="widget-title pb-0">معلومات شخصية</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content text-left">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">الاسم الاول</label>
                                        <div className="form-group">
                                            <span className="la form-icon"><AiOutlineUser /></span>
                                            <input className="form-control" type="text" name="text" placeholder="الاسم الاول" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">الكنية</label>
                                        <div className="form-group">
                                            <span className="la form-icon"><AiOutlineUser /></span>
                                            <input className="form-control" type="text" name="text" placeholder="الكنية" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">البريد الإلكتروني</label>
                                        <div className="form-group mb-0">
                                            <span className="la form-icon"><FaRegEnvelope /></span>
                                            <input className="form-control" type="email" name="text" placeholder="أدخل عنوان البريد الالكتروني" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">هاتف</label>
                                        <div className="form-group mb-0">
                                            <span className="la form-icon"><FiPhone /></span>
                                            <input className="form-control" type="text" name="text" placeholder="رقم" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="payment-option">
                    <div className="billing-title-wrap pt-0 text-left">
                        <h3 className="widget-title pb-0">طريقة الدفع او السداد</h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="payment-method-wrap p-4">
                        <div className="payment-tab">
                            <div className="payment-trigger">
                                <label className="payment-radio text-left">
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                    <span>تحويل مصرفي مباشر</span>
                                    <div className="payment-content payment-active mt-2">
                                        <div className="section-heading">
                                            <p className="sec__desc font-size-15 line-height-24">
                                                قم بالدفع مباشرة إلى حسابنا المصرفي. الرجاء استخدام معرف الطلب الخاص بك كمرجع الدفع. لن يتم شحن طلبك حتى يتم تصفية الأموال في حسابنا.
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="payment-tab">
                            <div className="payment-trigger">
                                <label className="payment-radio text-left">
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                    <span>بطاقة الائتمان / الخصم</span>
                                    <span className="card-icon float-left">
                                        <img src={state.paymentImg} alt="Payment" />
                                    </span>
                                    <div className="payment-content payment-active mt-3">
                                        <div className="contact-form-action text-left">
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="input-box">
                                                            <label className="label-text">الاسم على البطاقة</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil /></span>
                                                                <input className="form-control" placeholder="اسم البطاقة" type="text" name="text" required="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="input-box">
                                                            <label className="label-text">رقم البطاقة</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil /></span>
                                                                <input className="form-control" name="text" placeholder="1234  5678  9876  5432" required="" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="input-box">
                                                            <label className="label-text">شهر انتهاء الصلاحية</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil /></span>
                                                                <input className="form-control" placeholder="MM" required="" name="text" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="input-box">
                                                            <label className="label-text">سنة انتهاء الصلاحية</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil /></span>
                                                                <input className="form-control" placeholder="YY" required="" name="text" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <div className="input-box">
                                                            <label className="label-text">CVV</label>
                                                            <div className="form-group">
                                                                <span className="la form-icon"><BsPencil /></span>
                                                                <input className="form-control" placeholder="CVV" required="" name="text" type="text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="payment-tab">
                            <div className="payment-trigger">
                                <label className="payment-radio text-left paypal-option">
                                    <input type="radio" name="radio" />
                                    <span className="checkmark"></span>
                                    <span>باي بال</span>
                                    <span className="card-icon float-left">
                                        <img src={state.paypalImg} alt="Paypal" />
                                    </span>
                                    <div className="payment-content payment-active mt-2">
                                        <div className="section-heading">
                                            <p className="sec__desc font-size-15 line-height-24">
                                                ستتم إعادة توجيهك إلى باي بال لإتمام الدفع.
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="section-block-2 mt-4"></div>
                        <div className="btn-box mt-4 text-left">
                            <div className="custom-checkbox">
                                <input type="checkbox" id="chb1" />
                                <label htmlFor="chb1">
                                    لقد قرأت وقبلت <Link to="#" className="color-text">البنود و الظروف</Link>
                                </label>
                            </div>
                            <button type="submit" className="theme-btn border-0 mt-3">
                                أكد الطلب
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PersonalInfo;
