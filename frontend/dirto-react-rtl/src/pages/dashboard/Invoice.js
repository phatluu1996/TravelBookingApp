import React  from 'react';
import { AiOutlinePrinter } from 'react-icons/ai'
import { RiReplyLine } from 'react-icons/ri'
import { Link } from "react-router-dom";
import logosrc from '../../assets/images/logo2.png'

const state = {
    logo: logosrc
}
function Invoice() {
    return (
        <main className="invoice-page">
            <section className="invoice-area padding-top-60px">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto text-left">
                            <div className="invoice-content">
                                <div className="invoice-title">
                                    <h2 className="widget-title text-center mb-5">شكرا لطلبك!</h2>
                                </div>
                                <div className="invoice-item">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="invoice-logo">
                                                <img src={state.logo} alt="شعار" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="invoice-details text-right">
                                                <li><strong>طلب:</strong> #00124</li>
                                                <li><strong>تاريخ:</strong> 20/07/2019</li>
                                                <li>تستحق 7 أيام من تاريخ الإصدار</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-item">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="invoice-title padding-top-40px padding-bottom-40px">
                                                <h2 className="widget-title">فاتورة</h2>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="invoice-info">
                                                <strong className="widget-title d-block pb-1">مؤلف:</strong>
                                                <ul className="invoice-details">
                                                    <li>ديتو المحدودة</li>
                                                    <li>36 شارع إدجووتر ، ملبورن ، أستراليا</li>
                                                    <li>أستراليا ، CF44 6ZL ، AU</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="invoice-info">
                                                <strong className="widget-title d-block pb-1">إلى:</strong>
                                                <ul className="invoice-details">
                                                    <li>مارك وينز</li>
                                                    <li>21 سانت أندروز لين ، لندن ، المملكة المتحدة</li>
                                                    <li>لندن ، CF44 6ZL ، المملكة المتحدة</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="invoice-item padding-top-40px">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="invoice-table table-responsive">
                                                <table className="table-bordered w-100">
                                                    <thead>
                                                        <tr>
                                                            <th>وصف</th>
                                                            <th>كمية</th>
                                                            <th>ضريبة القيمة المضافة</th>
                                                            <th>مجموع</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>ستيك جليزد تقطير اللحم البقري</td>
                                                            <td>1</td>
                                                            <td>$1.0</td>
                                                            <td>$8.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td>بريوش ستيك و جبنة ذائبة</td>
                                                            <td>1</td>
                                                            <td>$1.5</td>
                                                            <td>$8.00</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 ml-auto">
                                            <div className="invoice-table mt-3 table-responsive">
                                                <table className="w-100">
                                                    <tbody>
                                                        <tr>
                                                            <th className="pt-1 pb-0">المجموع الفرعي:</th>
                                                            <td className="pt-1 pr-0 text-right"><span>$16.00</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th className="pt-1 pb-0">خصم:</th>
                                                            <td className="pt-1 pr-0 text-right"><span>-2%</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th className="pt-1 pb-0">المبلغ الإجمالي:</th>
                                                            <td className="pt-1 pr-0 text-right"><span>$14.00</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="btn-box mt-4 text-center">
                                <a href="javascript:window.print()" className="theme-btn">
                                    <span className="la"><AiOutlinePrinter /></span> اطبع هذه الفاتورة
                                </a>
                                <Link to="/" className="theme-btn ml-2">
                                    <span className="la"><RiReplyLine /></span> العودة إلى المنزل
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Invoice;
