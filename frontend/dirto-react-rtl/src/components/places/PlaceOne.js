import React  from 'react';
import Slider from "react-slick";
import { IoIosLink } from 'react-icons/io'
import { AiOutlineEye } from 'react-icons/ai'
import { FiPhone, FiHeart } from 'react-icons/fi'
import { FaRegCalendarCheck } from 'react-icons/fa'


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const responsive = [
    {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
        }
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }
]
function PlaceOne({items}) {
    return (
        <div className="row mt-5">
            <div className="col-lg-12">
                <Slider className="places-carousel" dots={true} infinite={true} slidesToScroll={2} arrows={false} slidesToShow={3} centerMode={false} centerPadding="50px" autoplay={true} responsive={responsive}>
                    {items.map((item, index) => {
                        return (
                            <div className="card-item" key={index}>
                                <a href={item.titleUrl} className="card-image-wrap">
                                    <div className="card-image">
                                        <img src={item.image} className="card__img" alt="Place" />
                                        <span className={item.titleIcon ? 'badge' : 'badge badge-closed'}>{item.bedge}</span>
                                        <span className="badge-toggle" data-toggle="tooltip" data-placement="bottom" title="22 Likes">
                                            <FiHeart />
                                        </span>
                                    </div>
                                </a>
                                <div className="card-content-wrap">
                                    <div className="card-content">
                                        <a href={item.titleUrl}>
                                            <h5 className="card-meta">
                                                {item.cardType} <span>{item.cardTypeIcon}</span>
                                            </h5>
                                            <h4 className="card-title text-left"><i>{item.titleIcon}</i> {item.title}</h4>
                                            <p className="card-sub text-left">
                                                {item.stitle}
                                            </p>
                                        </a>
                                        <a href={item.authorUrl} className="author-img">
                                            <img src={item.author} alt="author-img" />
                                        </a>
                                        <ul className="info-list padding-top-20px text-left">
                                            <li>{item.number} <span className="la d-inline-block"><FiPhone /></span></li>
                                            <li><a href={item.websiteUrl}>
                                                {item.website}
                                            </a> <span className="la d-inline-block"><IoIosLink /></span>
                                            </li>
                                            <li>
                                                {item.date} <span className="la d-inline-block"><FaRegCalendarCheck /></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rating-row">
                                        <div className="listing-info">
                                            <ul>
                                                <li>
                                                    <span className="info__save" data-toggle="tooltip" data-placement="top" title="المرجعية">
                                                        <FiHeart />
                                                    </span>
                                                </li>
                                                <li><span className="info__count"><AiOutlineEye /></span> {item.view}</li>
                                            </ul>
                                        </div>
                                        <div className="rating-rating">
                                            {item.ratings.map((rating, index) => {
                                                return (
                                                    <span key={index}>{rating}</span>
                                                )
                                            })}
                                            <span className="rating-count">{item.ratingNum}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Slider>

            </div>
        </div>
    );
}

export default PlaceOne;
