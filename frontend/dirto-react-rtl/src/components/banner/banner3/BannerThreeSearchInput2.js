import React from 'react'
import  { FiSearch } from 'react-icons/fi'
import SelectCountry from "../../common/SelectCountry";
import Select from "react-select";

const state = {
    selectedCatOp: null,
    categories: [
        {
            value: 0,
            label: 'اختر تصنيف'
        },
        {
            value: 1,
            label: 'الأنشطة في الهواء الطلق'
        },
        {
            value: 2,
            label: 'سينمات'
        },
        {
            value: 3,
            label: 'سهرات'
        },
        {
            value: 4,
            label: 'الحانات'
        },
        {
            value: 5,
            label: 'النوادي'
        },
    ]
}
export default function BannerOneSearchInput() {
    return (
        <>
            <div className="main-search-input">

                <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                            <span className="form-icon">
                                <FiSearch/>
                            </span>
                                <input className="form-control" type="text"
                                       placeholder="عما تبحث؟"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="main-search-input-item location text-left">
                    <SelectCountry/>
                </div>
                <div className="main-search-input-item category text-left">
                    <Select
                        placeholder="اختر تصنيف"
                        options={state.categories}
                    />
                </div>
                <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                            <span className="form-icon">
                                <FiSearch/>
                            </span>
                                <input className="date-range form-control" type="date" name="daterange"
                                       defaultValue="04/08/2019"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="main-search-input-btn">
                    <button className="button theme-btn" type="submit">بحث</button>
                </div>

            </div>
        </>
    )
}
