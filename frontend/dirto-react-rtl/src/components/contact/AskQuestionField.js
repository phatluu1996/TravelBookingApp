import React from 'react';
import { AiOutlineUser } from 'react-icons/ai'
import { FaRegEnvelope } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'
import { RiSendPlane2Line } from 'react-icons/ri'

function AskQuestionField({title}) {
    return (
        <>
            <div className="faq-forum text-left">
                <div className="billing-form-item">
                    {title ? (
                        <div className="billing-title-wrap">
                            <h3 className="widget-title pb-0">{title}</h3>
                            <div className="title-shape margin-top-10px"></div>
                        </div>
                    ) : ''}
                    <div className="billing-content">
                        <div className="contact-form-action">
                            <form method="post">
                                <div className="input-box">
                                    <label className="label-text">اسمك</label>
                                    <div className="form-group">
                                        <span className="form-icon"><AiOutlineUser /></span>
                                        <input className="form-control" type="text" name="text" placeholder="اسمك" />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <label className="label-text">بريدك الالكتروني</label>
                                    <div className="form-group">
                                        <span className="form-icon"><FaRegEnvelope /></span>
                                        <input className="form-control" type="text" name="name" placeholder="عنوان البريد الإلكتروني" />
                                    </div>
                                </div>
                                <div className="input-box">
                                    <label className="label-text">رسالة</label>
                                    <div className="form-group">
                                        <span className="form-icon"><BsPencil /></span>
                                        <textarea className="message-control form-control" name="message" placeholder="اكتب رسالة"></textarea>
                                    </div>
                                </div>
                                <div className="btn-box">
                                    <button type="button" className="theme-btn border-0">
                                        <i><RiSendPlane2Line /></i> إرسال رسالة
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AskQuestionField;