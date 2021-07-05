import React from 'react';
import  { FiSearch } from 'react-icons/fi'
import  { FaDollarSign } from 'react-icons/fa'
import SelectCountry from "../../common/SelectCountry";
import Select from "react-select";


const state = {
    selectedPropertyOp: null,
    properties: [
        {
            value: 0,
            label: 'نوع الملكية'
        },
        {
            value: 1,
            label: 'كل الفئات'
        },
        {
            value: 2,
            label: 'شقق سكنية'
        },
        {
            value: 3,
            label: 'منازل فاخرة'
        },
        {
            value: 4,
            label: 'شقق حديثة'
        },
        {
            value: 5,
            label: 'منازل أنيقة'
        },
        {
            value: 6,
            label: 'منازل أنيقة'
        },
        {
            value: 7,
            label: 'منازل الطبيعة'
        },
        {
            value: 8,
            label: 'كوخ'
        },
        {
            value: 9,
            label: 'مسطحة'
        },
    ]
}

function BannerThreeSearchInput3() {
    return (
        <>
            <div className="main-search-input">
                <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                                <span className="form-icon">
                                    <FiSearch />
                                </span>
                                <input className="form-control" type="text" placeholder="عما تبحث؟" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="main-search-input-item location text-left">
                    <SelectCountry />
                </div>
                <div className="main-search-input-item category text-left">
                    <Select
                        placeholder="نوع الملكية"
                        options={state.properties}
                    />
                </div>
                <div className="main-search-input-item">
                    <div className="contact-form-action">
                        <form action="#">
                            <div className="form-group mb-0">
                                <span className="form-icon">
                                    <FaDollarSign />
                                </span>
                                <input type="number" className="form-control" placeholder="تصفية حسب السعر" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="main-search-input-btn">
                    <button className="button theme-btn" type="submit">بحث</button>
                </div>
            </div>
        </>
    );
}

export default BannerThreeSearchInput3;
