import React, {useEffect, useState}  from 'react';
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";
import { BsListCheck, BsBookmark, BsPencil } from 'react-icons/bs'
import { FaGlobeAmericas, FaRegEnvelope } from 'react-icons/fa'
import { GiPositionMarker } from 'react-icons/gi'
import { FiPhone, FiEdit } from 'react-icons/fi'
import { AiOutlineUser, AiOutlinePlusCircle, AiOutlinePoweroff, AiOutlineYoutube, AiOutlineExclamationCircle } from 'react-icons/ai'
import Button from "../../components/common/Button";
import NewsLetter from "../../components/other/cta/NewsLetter";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import sectiondata from "../../store/store";

function Dashboard() {
    const [isOpenForm, setIsOpenForm] = useState(false)

    useEffect(() => {
        const body = document.querySelector('body')

        function showDeleteAcntModal(e) {
            body.classList.add('modal-open')
            body.style.paddingRight = '17px'
            e.preventDefault()
        }
        document.addEventListener('click', function (e) {
                for (
                    let target = e.target;
                    target && target !== this;
                    target = target.parentNode
                ) {
                    if (target.matches('.delete-account-info .delete-account, .card-item .card-content-wrap .delete-btn')) {
                        showDeleteAcntModal.call(target, e)
                        break
                    }
                }
            },false
        )
        function hideDeleteAcntModal(e) {
            body.classList.remove('modal-open')
            body.style.paddingRight = '0'
            e.preventDefault()
        }
        document.addEventListener('click', function (e) {
                for (
                    let target = e.target;
                    target && target !== this;
                    target = target.parentNode
                ) {
                    if (target.matches('.account-delete-modal .modal-bg, .account-delete-modal .modal-dialog .btn-box .theme-btn')) {
                        hideDeleteAcntModal.call(target, e)
                        break
                    }
                }
            }, false
        )
    })
    return (
        <main className="dashboard-page">
            {/* Header */}
            <GeneralHeader />

            {/* Breadcrumb */}
            <Breadcrumb CurrentPgTitle="لوحة القيادة" MenuPgTitle="الصفحات" img={sectiondata.dashboard.breadcrumbimg} />

            {/* dashboard */}
            <section className="dashboard-area padding-top-40px padding-bottom-90px">
                <div className="container">
                    <Tabs>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                                    <TabList className="nav nav-tabs border-0" id="nav-tab">
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                                                <span className="la"><BsListCheck /></span> القوائم
                                            </div>
                                        </Tab>
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                                                <span className="la"><AiOutlineUser /></span> الملف الشخصي
                                            </div>
                                        </Tab>
                                        <Tab>
                                            <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                                                <span className="la"><BsBookmark /></span> المرجعية
                                            </div>
                                        </Tab>
                                    </TabList>
                                    <div className="btn-box">
                                        <Link to="/add-listing/new" className="theme-btn"><span className="la"><AiOutlinePlusCircle /></span> إنشاء قائمة</Link>
                                        <Link to="/" className="theme-btn ml-1"><span className="la"><AiOutlinePoweroff /></span> خروج</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="tab-content" id="nav-tabContent">
                                    <TabPanel>
                                        <div className="row">

                                            {sectiondata.dashboard.cards.map((item, i) => {
                                                return (
                                                    <div key={i} className="col-lg-4 column-td-6">
                                                        <div className="card-item">
                                                            <Link to={item.cardLink} className="card-image-wrap">
                                                                <div className="card-image">
                                                                    <img src={item.img} className="card__img" alt="بطاقة" />
                                                                </div>
                                                            </Link>
                                                            <div className="card-content-wrap">
                                                                <div className="card-content text-left">
                                                                    <Link to={item.cardLink}>
                                                                        <h4 className="card-title mt-0">{item.title}</h4>
                                                                        <p className="card-sub">{item.subtitle}</p>
                                                                    </Link>
                                                                </div>
                                                                <div className="rating-row">
                                                                    <div className="edit-info-box">
                                                                        <button type="button" className="theme-btn button-success border-0 mr-1">
                                                                            <span className="la">{item.editIcon}</span> {item.editTxt}
                                                                        </button>
                                                                        <button type="button" className="theme-btn delete-btn border-0" data-toggle="modal" data-target=".product-delete-modal">
                                                                            <span className="la">{item.deleteIcon}</span> {item.deleteTxt}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="user-profile-action">
                                                    <div className="user-pro-img mb-4">
                                                        <img src={sectiondata.dashboard.userImg} alt="المستعمل" />
                                                        <div className="dropdown">
                                                            <button
                                                                className="theme-btn edit-btn dropdown-toggle border-0 after-none"
                                                                type="button" id="editImageMenu">
                                                                <i className="la la-photo"></i> تعديل
                                                            </button>
                                                            <div className="dropdown-menu"
                                                                aria-labelledby="editImageMenu">
                                                                <div className="upload-btn-box">
                                                                    <form>
                                                                        <input type="file" name="files[]" id="filer_input" multiple="multiple" />
                                                                        <button className="theme-btn border-0 w-100 button-success" type="submit" value="submit">
                                                                            احفظ التغييرات
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                                <div className="btn-box mt-3">
                                                                    <button className="theme-btn border-0 w-100">
                                                                        إزالة الصورة
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="user-details text-left">
                                                        <h2 className="user__name widget-title pb-2">
                                                            {sectiondata.dashboard.userName}
                                                        </h2>
                                                        <div className="section-heading">
                                                            <p className="sec__desc font-size-15 line-height-24">
                                                                {sectiondata.dashboard.userbio}
                                                            </p>
                                                        </div>
                                                        <ul className="list-items mt-3">
                                                            <li>
                                                                <span className="la d-inline-block"><GiPositionMarker /></span> {sectiondata.dashboard.address}
                                                            </li>
                                                            <li className="text-lowercase">
                                                                <span className="la d-inline-block"><FiPhone /></span> {sectiondata.dashboard.phoneNum}
                                                            </li>
                                                            <li className="text-lowercase">
                                                                <span className="la d-inline-block"><FaGlobeAmericas /></span> {sectiondata.dashboard.website}
                                                            </li>
                                                        </ul>
                                                        <div className="user-edit-form mt-4">
                                                            <div className={isOpenForm ? 'dropdown show' : 'dropdown'}>
                                                                <button
                                                                    className="theme-btn edit-form-btn shadow-none w-100 dropdown-toggle after-none"
                                                                    type="button"
                                                                    onClick={() => setIsOpenForm(!isOpenForm)}>
                                                                    <i className="la"><FiEdit /></i> تعديل
                                                                </button>
                                                                <div className={isOpenForm ? 'dropdown-menu show' : 'dropdown-menu'}>
                                                                    <div className="contact-form-action">
                                                                        <div className="input-box">
                                                                            <label className="label-text">اسم</label>
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><AiOutlineUser /></span>
                                                                                <input className="form-control" type="text" name="name" placeholder="أدخل أسمك" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <label className="label-text">البيانات الحيوية</label>
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><BsPencil /></span>
                                                                                <textarea className="message-control form-control" name="message" placeholder="أضف السيرة الذاتية"></textarea>
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><GiPositionMarker /></span>
                                                                                <input className="form-control" type="text" name="location" placeholder="موقعك" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><FiPhone /></span>
                                                                                <input className="form-control" type="text" name="number" placeholder="رقم" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><FaRegEnvelope /></span>
                                                                                <input className="form-control" type="email" name="email" placeholder="عنوان البريد الإلكتروني" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><AiOutlineYoutube /></span>
                                                                                <input className="form-control" type="text" name="youtube" placeholder="رابط يوتيوب" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="input-box">
                                                                            <div className="form-group">
                                                                                <span className="la form-icon"><FaGlobeAmericas /></span>
                                                                                <input className="form-control" type="text" name="website" placeholder="موقع الكتروني" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="btn-box">
                                                                            <button type="button" className="theme-btn border-0 button-success mr-1">
                                                                                احفظ التغييرات
                                                                            </button>
                                                                            <button type="button" className="theme-btn border-0">
                                                                                إلغاء
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-8 text-left">
                                                <div className="user-form-action">
                                                    <div className="billing-form-item">
                                                        <div className="billing-title-wrap">
                                                            <h3 className="widget-title pb-0">تغيير كلمة المرور</h3>
                                                            <div className="title-shape margin-top-10px"></div>
                                                        </div>
                                                        <div className="billing-content">
                                                            <div className="contact-form-action">
                                                                <form>
                                                                    <div className="input-box">
                                                                        <label className="label-text">كلمة السر الحالية</label>
                                                                        <div className="form-group">
                                                                            <span className="la form-icon"><BsPencil /></span>
                                                                            <input className="form-control" type="text" name="text" placeholder="كلمة السر الحالية" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-box">
                                                                        <label className="label-text">كلمة مرور جديدة</label>
                                                                        <div className="form-group">
                                                                            <span className="la form-icon"><BsPencil /></span>
                                                                            <input className="form-control" type="text" name="text" placeholder="كلمة مرور جديدة" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="input-box">
                                                                        <label className="label-text">تأكيد كلمة المرور الجديدة</label>
                                                                        <div className="form-group">
                                                                            <span className="la form-icon"><BsPencil /></span>
                                                                            <input className="form-control" type="text" name="text" placeholder="تأكيد كلمة المرور الجديدة" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="btn-box">
                                                                        <button className="theme-btn button-success border-0">
                                                                            تحديث كلمة المرور
                                                                        </button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="delete-account-info">
                                                    <div className="billing-form-item">
                                                        <div className="billing-title-wrap">
                                                            <h3 className="widget-title pb-0 color-text">حذف الحساب</h3>
                                                            <div className="title-shape margin-top-10px"></div>
                                                        </div>
                                                        <div className="delete-info-content p-4">
                                                            <p className="mb-3">
                                                                <span className="text-warning">تحذير:</span> بمجرد حذف حسابك ، لن يكون هناك عودة. يرجى التأكد.
                                                            </p>
                                                            <Button text="احذف حسابي" url="#" className="delete-account border-0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="row">
                                            {sectiondata.dashboard.cards.map((item, i) => {
                                                return (
                                                    <div key={i} className="col-lg-4 column-td-6">
                                                        <div className="card-item">
                                                            <Link to={item.cardLink} className="card-image-wrap">
                                                                <div className="card-image">
                                                                    <img src={item.img} className="card__img" alt="Card" />
                                                                </div>
                                                            </Link>
                                                            <div className="card-content-wrap">
                                                                <div className="card-content text-left">
                                                                    <Link to={item.cardLink}>
                                                                        <h4 className="card-title mt-0">{item.title}</h4>
                                                                        <p className="card-sub">{item.subtitle}</p>
                                                                    </Link>
                                                                </div>
                                                                <div className="rating-row">
                                                                    <div className="edit-info-box">
                                                                        <button type="button" className="theme-btn delete-btn border-0" data-toggle="modal" data-target=".product-delete-modal">
                                                                            <span className="la">{item.deleteIcon}</span> {item.deleteTxt}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </section>

            {/* Newsletter */}
            <NewsLetter
                content={sectiondata.calltoactions.newsletters.content}
                title={sectiondata.calltoactions.newsletters.title}
                btntext={sectiondata.calltoactions.newsletters.btntext}
                inputplaceholder={sectiondata.calltoactions.newsletters.inputplaceholder} />

            {/* Footer */}
            <Footer />

            {/* scroll top button */}
            <ScrollTopBtn />

            {/* Modal */}
            <div className="modal-form text-center">
                <div className="modal fade account-delete-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                    <div className="modal-bg"></div>
                    <div className="modal-dialog modal-sm" role="document">
                        <div className="modal-content p-4">
                            <div className="modal-top border-0 mb-4 p-0">
                                <div className="alert-content">
                                    <span className="la warning-icon"><AiOutlineExclamationCircle /></span>
                                    <h4 className="modal-title mt-2 mb-1">سيتم حذف حسابك بشكل دائم!</h4>
                                    <p className="modal-sub">هل أنت متأكد من المضي قدما.</p>
                                </div>
                            </div>
                            <div className="btn-box">
                                <button type="button" className="theme-btn border-0 button-success mr-1" data-dismiss="modal">
                                    إلغاء
                                </button>
                                <button type="button" className="theme-btn border-0 button-danger">
                                    حذف!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Dashboard;
