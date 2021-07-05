import React from 'react';
import { FiEdit } from 'react-icons/fi'
import { FaDollarSign } from 'react-icons/fa'
import { BsPencil } from 'react-icons/bs'

function AddPrice() {
    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">التسعير</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content">
                    <div className="contact-form-action">
                        <form method="post">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">عنوان</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <FiEdit />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="عنوان" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="input-box">
                                        <label className="label-text">السعر</label>
                                        <div className="form-group">
                                            <span className="la form-icon">
                                                <FaDollarSign />
                                            </span>
                                            <input className="form-control" type="text" name="text" placeholder="السعر بالدولار الأمريكي" />
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

export default AddPrice;
