import React from 'react';

const states = {
    items: [
        {
            id: 1,
            title: 'كاميرات مراقبة'
        },
        {
            id: 2,
            title: 'مصعد في المبنى'
        },
        {
            id: 3,
            title: 'انترنت لاسلكي'
        },
        {
            id: 4,
            title: 'تسهيلات لدخول المعاقين'
        },
        {
            id: 5,
            title: 'غرفة الغسيل في المبنى'
        },
        {
            id: 6,
            title: 'نظام إنذار'
        },
        {
            id: 7,
            title: 'مسموح التدخين'
        },
        {
            id: 8,
            title: 'مواقف مجانية للسيارات في الشارع'
        },
        {
            id: 9,
            title: 'مساحة عمل ودية'
        },
        {
            id: 10,
            title: 'كهرباء'
        },
        {
            id: 11,
            title: 'جراج ملحق'
        },
        {
            id: 12,
            title: 'مواقف الدراجات'
        },
        {
            id: 13,
            title: 'هاتف'
        },
    ]
}
function Amenities() {
    return (
        <>
            <div className="billing-form-item">
                <div className="billing-title-wrap">
                    <h3 className="widget-title pb-0">وسائل الراحة</h3>
                    <div className="title-shape margin-top-10px"></div>
                </div>
                <div className="billing-content">

                    {states.items.map(item => {
                        return (
                            <div className="custom-checkbox" key={item.id}>
                                <input type="checkbox" id={'chb'+item.id} />
                                <label htmlFor={'chb'+item.id}> {item.title}</label>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    );
}

export default Amenities;
