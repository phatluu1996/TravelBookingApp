import React, { Component } from 'react';

const HeaderViewed = () => {
    return (<>
        <div className="header-viewed">
            <a href="#" className="header-viewed-btn">recently viewed</a>

            <div className="viewed-drop">
                <div className="viewed-drop-a">
                    <div className="viewed-item">
                        <div className="viewed-item-l">
                            <a href="#"><img alt="" src="img/v-item-01.jpg" /></a>
                        </div>
                        <div className="viewed-item-r">
                            <div className="viewed-item-lbl"><a href="#">Andrassy Thai Hotel</a></div>
                            <div className="viewed-item-cat">location: thailand</div>
                            <div className="viewed-price">152$</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="viewed-item">
                        <div className="viewed-item-l">
                            <a href="#"><img alt="" src="img/v-item-02.jpg" /></a>
                        </div>
                        <div className="viewed-item-r">
                            <div className="viewed-item-lbl"><a href="#">Ermin's Hotel</a></div>
                            <div className="viewed-item-cat">location: dubai</div>
                            <div className="viewed-price">300$</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="viewed-item">
                        <div className="viewed-item-l">
                            <a href="#"><img alt="" src="img/v-item-03.jpg" /></a>
                        </div>
                        <div className="viewed-item-r">
                            <div className="viewed-item-lbl"><a href="#">Best Western Hotel Reither</a></div>
                            <div className="viewed-item-cat">location: berlin</div>
                            <div className="viewed-price">2300$</div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default HeaderViewed;