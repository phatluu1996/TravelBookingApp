import React  from 'react';
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { RiReplyLine } from 'react-icons/ri'
import Copyright from "../components/common/footer/Copyright";
import errorimg from '../assets/images/404-img.png'

const state = {
    img: errorimg
}
function Error() {
    return (
        <main className="error-page">
            <section className="error-area padding-top-140px">
                <div className="error-shape"></div>
                <div className="error-actions">
                    <ul>
                        <li><Link to="/">العودة إلى المنزل</Link></li>
                        <li><Link to="/faq">مساعدة</Link></li>
                    </ul>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="error-content text-center">
                                <img src={state.img} alt="error" className="w-100" />
                                <div className="section-heading padding-top-30px">
                                    <h3 className="sec__title pt-0 before-none">وجه الفتاة! الصفحة غير موجودة.</h3>
                                    <p className="sec__desc">
                                        ربما تمت إزالة الصفحة التي تبحث عنها أو تم تغيير اسمها أو أنها غير متاحة مؤقتًا. يمكنك التحقق من موقعنا <Link to="/faq" className="color-text">مركز المساعدة</Link>
                                    </p>
                                </div>
                                <div className="or-box margin-top-30px margin-bottom-35px">
                                    <span>أو</span>
                                </div>
                                <div className="btn-box">
                                    <Button text="العودة إلى المنزل" url="/">
                                        <span className="la"><RiReplyLine /></span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* copyright */}
                    <Copyright />
                </div>
            </section>
        </main>
    );
}

export default Error;
