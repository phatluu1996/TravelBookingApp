import React from 'react';
import { BsFileEarmarkCode } from 'react-icons/bs'

function WidgetBookingSummary({title, date, hour, adults, children, total}) {
    return (
        <>
            <div className="billing-form-item text-left">
                {title ? (
                    <div className="billing-title-wrap">
                        <h3 className="widget-title pb-0">{title}</h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                ) : ''}
                <div className="billing-content">
                    <div className="booking-summary">
                        <ul className="booking-list">
                            {date ? (
                                <li className="d-flex align-items-center justify-content-between">تاريخ: <span>{date}</span></li>
                            ) : ''}
                            {hour ? (
                                <li className="d-flex align-items-center justify-content-between">ساعة: <span>{hour}</span></li>
                            ) : ''}
                            {adults ? (
                                <li className="d-flex align-items-center justify-content-between">الكبار: <span>{adults}</span></li>
                            ) : ''}
                            {children ? (
                                <li className="d-flex align-items-center justify-content-between">الأطفال: <span>{children}</span></li>
                            ) : ''}
                        </ul>
                        <div className="section-block-2 mt-4"></div>
                        {total ? (
                            <ul className="booking-list total-list mt-4">
                                <li className="d-flex align-items-center justify-content-between">مجموع: <span className="color-text">{total}</span></li>
                            </ul>
                        ) : ''}
                        <div className="coupon-widget mt-4">
                            <div className="contact-form-action">
                                <form method="post">
                                    <div className="row">
                                        <div className="col-lg-8 pr-0">
                                            <div className="input-box">
                                                <div className="form-group mb-0">
                                                    <span className="la form-icon"><BsFileEarmarkCode /></span>
                                                    <input className="form-control" type="text" name="name" placeholder="أدخل رمز القسيمة" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="btn-box">
                                                <button className="theme-btn border-0" type="submit">تطبيق</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WidgetBookingSummary;