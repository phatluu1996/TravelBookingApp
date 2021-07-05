import React, {Component} from 'react';
import { BsPencilSquare, BsQuestion, BsPencil } from 'react-icons/bs'
import { AiOutlineTags } from 'react-icons/ai'
import Select from "react-select";

const state = {
    title: 'معلومات عامة',
    selectedCatOp: null,
    categories: [
        {
            value: 0,
            label: 'اختر تصنيف'
        },
        {
            value: 2,
            label: 'محلات'
        },
        {
            value: 3,
            label: 'الفنادق'
        },
        {
            value: 4,
            label: 'مطاعم'
        },
        {
            value: 5,
            label: 'اللياقه البدنيه'
        },
        {
            value: 6,
            label: 'السفر'
        },
        {
            value: 7,
            label: 'صالونات'
        },
        {
            value: 8,
            label: 'حدث'
        },
        {
            value: 9,
            label: 'اعمال'
        },
    ]
}
class GeneralInfo extends Component {
    render() {
        return (
            <>
                <div className="billing-form-item">
                    <div className="billing-title-wrap">
                        <h3 className="widget-title pb-0">{state.title}</h3>
                        <div className="title-shape margin-top-10px"></div>
                    </div>
                    <div className="billing-content">
                        <div className="contact-form-action">
                            <form method="post">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text">عنوان القائمة</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <BsPencilSquare />
                                                </span>
                                                <input className="form-control" type="text" name="name" placeholder="أدخل عنوان قائمتك" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="input-box">
                                            <label className="label-text d-flex align-items-center ">الكلمات الدالة
                                                <i className="la tip ml-1" data-toggle="tooltip" data-placement="top" title="بحد أقصى 15 كلمة رئيسية مرتبطة بعملك">
                                                    <BsQuestion />
                                                </i>
                                            </label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <AiOutlineTags />
                                                </span>
                                                <input className="form-control" type="text" name="name" placeholder="يجب فصل الكلمات الرئيسية بفاصلات" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-box">
                                            <label className="label-text">وصف</label>
                                            <div className="form-group">
                                                <span className="la form-icon">
                                                    <BsPencil />
                                                </span>
                                                <textarea className="message-control form-control" name="message" placeholder="اكتب وصف قائمتك"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="input-box">
                                            <label className="label-text">الفئة</label>
                                            <div className="form-group mb-0">
                                                <Select
                                                    placeholder="اختر تصنيف"
                                                    options={state.categories}
                                                />
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
}

export default GeneralInfo;
