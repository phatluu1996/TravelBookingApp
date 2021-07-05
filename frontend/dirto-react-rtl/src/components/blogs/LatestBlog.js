import React  from 'react';
import { Link } from "react-router-dom";

function LatestBlog({items}) {
    return (
        <>
            <div className="row mt-5">
                {items.map((item, index) => {
                    return (
                        <div className="col-lg-4 column-td-6" key={index}>
                            <div className="card-item blog-card">
                                <Link to={item.cardUrl} className="card-image-wrap">
                                    <div className="card-image">
                                        <img src={item.img} alt="Blog" className="card__img" />
                                    </div>
                                </Link>
                                <div className="card-content pl-0 pr-0 text-left">
                                    <Link to={item.cardUrl} className="card-title">
                                        {item.title}
                                    </Link>
                                    <ul className="card-meta pl-0 d-flex justify-content-between align-items-center mt-2">
                                        <li>{item.date} - <Link to={item.cardUrl} className="tag__text">نصائح وخدع</Link></li>
                                        <li><Link to="#" >{item.likeNum} الإعجابات</Link></li>
                                    </ul>
                                    <p className="card-sub mt-3">
                                        {item.description}
                                    </p>
                                    <ul className="post-author d-flex align-items-center justify-content-between mt-3">
                                        <li>
                                            <img src={item.authorImg} alt="Author" />
                                            <span className="by__text"> بواسطة </span>
                                            <span> {item.author}</span>
                                        </li>
                                        <li>
                                            <Link to={item.cardUrl} className="blog__btn">
                                                اقرأ أكثر
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default LatestBlog;
