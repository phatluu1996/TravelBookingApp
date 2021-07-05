import React from 'react';
import {Link} from "react-router-dom";
import {BsGrid, BsListUl} from "react-icons/bs";
import Select from "react-select";

const state = {
    selectedCatOp: null,
    title: 'إظهار 1 إلى 6 من أصل 30 مُدخل',
    navs: [
        {
            path: '/listing-list',
            icon: <BsListUl />,
            active: false,
        },
        {
            path: '/listing-grid',
            icon: <BsGrid />,
            active: true,
        }
    ],
    shortby: [
        {
            value: 0,
            label: 'باختصار من قبل'
        },
        {
            value: 1,
            label: 'باختصار افتراضيًا'
        },
        {
            value: 2,
            label: 'تصنيف عالي'
        },
        {
            value: 3,
            label: 'الأكثر مراجعة'
        },
        {
            value: 4,
            label: 'قائمة شعبية'
        },
        {
            value: 5,
            label: 'أحدث قائمة'
        },
        {
            value: 6,
            label: 'قائمة أقدم'
        },
        {
            value: 7,
            label: 'السعر من الارخص للاعلى'
        },
        {
            value: 8,
            label: 'السعر الاعلى الى الادنى'
        },
        {
            value: 9,
            label: 'السعر الاعلى الى الادنى'
        },
        {
            value: 10,
            label: 'قائمة عشوائية'
        }
    ]
}

function GenericHeader() {
    return (
        <>
            <div className="generic-header margin-bottom-30px">
                <p className="showing__text text-left">
                    {state.title}
                </p>
                <div className="short-option mr-3 text-left">
                    <Select
                        placeholder="باختصار من قبل"
                        options={state.shortby}
                    />
                </div>
                <ul className="generic-nav">
                    {state.navs.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.path} className={ item.active ? 'active': ' '}>
                                    <span className="d-inline-block">
                                        {item.icon}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
}

export default GenericHeader;
