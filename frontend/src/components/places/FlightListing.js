import React from 'react';
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";
import { FiHeart, FiPhone } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import _ from 'lodash';
import { Table } from 'react-bootstrap';

const province = [
    {
        value: 'SGN',
        label: 'TP.HCM'
    }, {
        value: 'HAN',
        label: 'Hà Nội'
    }, {
        value: 'DAD',
        label: 'Đà Nẵng'
    }, {
        value: 'CXR',
        label: 'Nha Trang'
    }, {
        value: 'DLI',
        label: 'Đà Lạt'
    }, {
        value: 'PQC',
        label: 'Phú Quốc'
    }, {
        value: 'VCA',
        label: 'Cần Thơ'
    }, {
        value: 'VCS',
        label: 'Côn Đảo'
    }, {
        value: 'VKG',
        label: 'Rạch Giá'
    }, {
        value: 'CAH',
        label: 'Cà Mau'
    }, {
        value: 'BMV',
        label: 'Buôn Ma Thuộc'
    }, {
        value: 'UIH',
        label: 'Quy Nhơn'
    }, {
        value: 'THD',
        label: 'Thanh Hóa'
    }, {
        value: 'VII',
        label: 'Vinh'
    }, {
        value: 'HUI',
        label: 'Huế'
    }, {
        value: 'VDH',
        label: 'Đồng Hới'
    }, {
        value: 'TBB',
        label: 'Tuy Hòa'
    }, {
        value: 'VCL',
        label: 'Chu Lai'
    }, {
        value: 'PXU',
        label: 'Pleiku'
    }, {
        value: 'HPH',
        label: 'Hải Phòng'
    }, {
        value: 'DIN',
        label: 'Điện Biên'
    }, {
        value: 'VDO',
        label: 'Vân Đồn'
    }
];

function FlightListing({ listitems }) {
    const formatDurationMinutes = (start, end) => {
        let timeStart = _.split(start, ":");
        let timeEnd = _.split(end, ":");
        let diffMin = _.parseInt(timeEnd[1]) - _.parseInt(timeStart[1]);
        let diffHour = diffMin < 0 ? _.parseInt(timeEnd[0]) - _.parseInt(timeStart[0]) - 1 : _.parseInt(timeEnd[0]) - _.parseInt(timeStart[0]);

        return diffHour + "h " + Math.abs(diffMin) + "m"
    }

    return (
        <>
            {listitems?.map((item, index) => {
                return (
                    <div className="card-item card-listing d-flex" key={index}>
                        <div className="card-content-wrap">
                            <div className="card-content">
                                <Table borderless="true">
                                    <tr>
                                        <td className="card-title">
                                            <b>{item.airline.airlineName}</b>
                                        </td>
                                        <td>
                                            {item.departureTime}
                                        </td>
                                        <td>
                                            <img src="https://d1785e74lyxkqq.cloudfront.net/godwit/lib/_/_/node_modules/@traveloka/web-components/svg/16/ic_flight_route_16px-2a29aa4dcda893738069caa1c12beaad.svg" width="32" height="12" />
                                        </td>
                                        <td>
                                            {item.arrivalTime}
                                        </td>
                                        <td>
                                            {formatDurationMinutes(item.departureTime, item.arrivalTime)}
                                        </td>
                                        <td>
                                            {item.economyPrice * 23000} VNĐ/khách
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {_.split(item.description, ",")[0]}
                                        </td>
                                        <td>
                                            {province.find(prv => prv.value == item.departureCity).label}
                                            <br />
                                            ({item.departureCity})
                                        </td>
                                        <td></td>
                                        <td>
                                            {province.find(prv => prv.value == item.arrivalCity).label}
                                            <br />
                                            ({item.arrivalCity})
                                        </td>
                                        <td>Bay thẳng</td>
                                        <td>
                                            <div className="main-search-input-btn">
                                                <button className="button theme-btn" type="submit">Xúc !</button>
                                            </div>
                                        </td>
                                    </tr>
                                </Table>
                                {/* <div className="col-md-4">
                                    
                                </div>
                                <div className="col-md-4">
                                    
                                </div>
                                <div className="col-md-4">
                                    
                                </div>
                                <div className="col-md-4">
                                    {}
                                </div> */}
                            </div>
                        </div>

                        {/* <Link to={item.titleUrl} className="card-image-wrap">
                            <div className="card-image">
                                <img src={item.image} className="card__img" alt="Place" />
                                <span className={item.titleIcon ? 'badge': 'badge badge-closed' }>{item.bedge}</span>
                                <span className="badge-toggle" data-toggle="tooltip" data-placement="bottom" title="22 Likes">
                                    <FiHeart />
                                </span>
                            </div>
                        </Link> 
                        <div className="card-content-wrap">
                            <div className="card-content">*/}
                        {/* <Link> 
                                    <h5 className="card-meta">
                                        <span>{item.cardTypeIcon}</span> {item.cardType}
                                    </h5>
                                    <h4 className="card-title">{item.airline.airlineName}</h4>
                                    <p className="card-sub">
                                        {item.stitle}
                                    </p>
                                </Link>                                
                                <ul className="info-list padding-top-20px">
                                    <li><span className="la d-inline-block"><FiPhone /></span> {item.number}</li>
                                    <li><span className="la d-inline-block"><IoIosLink /></span>  <a href={item.websiteUrl}>
                                        {item.website}
                                    </a>
                                    </li>
                                    <li>
                                        <span className="la d-inline-block"><FaRegCalendarCheck /></span> {item.date}
                                    </li>
                                </ul> 
                            </div>*/}
                        {/* <div className="rating-row">
                                <div className="rating-rating">
                                    {item.ratings.map((rating, index) => {
                                        return (
                                            <span key={index}>{rating}</span>
                                        )
                                    })}
                                    <span className="rating-count">{item.ratingNum}</span>
                                </div>
                                <div className="listing-info">
                                    <ul>
                                        <li>
                                            <span className="info__count"><AiOutlineEye /></span> {item.view}
                                        </li>
                                        <li>
                                            <span className="info__save" data-toggle="tooltip" data-placement="top" title="Bookmark">
                                                <FiHeart />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div> 
                        </div>*/}
                    </div>
                )
            })}
        </>
    );
}

export default FlightListing;
