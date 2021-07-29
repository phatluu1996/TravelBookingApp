import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';

const Home = () => {
    const handleSubmit = () => {

    }

    return (<>
        <Header></Header>
        <div className="main-cont">
            <div className="mp-slider search-only">

                <div className="mp-slider-row slim-slider">
                    <div className="swiper-container">
                        <a href="#" className="arrow-left"></a>
                        <a href="#" className="arrow-right"></a>
                        <div className="swiper-pagination"></div>
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="slide-section" style={{ background: 'url(img/sider-01.jpg) center top no-repeat' }}>
                                    <div className="mp-slider-lbl">Great journey begins with a small step</div>
                                    <div className="mp-slider-lbl-a">Make Your Life Better and Bright! You must trip with Us!
                                    </div>
                                    <div className="mp-slider-btn"><a href="#" className="btn-a">Learn more</a></div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="slide-section slide-b"
                                    style={{ background: "url(img/sider-02.jpg) center top no-repeat" }}>
                                    <div className="mp-slider-lbl">Relax with us. we love our clients</div>
                                    <div className="mp-slider-lbl-a">Make Your Life Better and Bright! You must trip with Us!
                                    </div>
                                    <div className="mp-slider-btn"><a href="#" className="btn-a">Learn more</a></div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="slide-section slide-b"
                                    style={{ background: "url(img/sider-03.jpg) center top no-repeat" }}>
                                    <div className="mp-slider-lbl">Planning trip with your friends</div>
                                    <div className="mp-slider-lbl-a">Make Your Life Better and Bright! You must trip with Us!
                                    </div>
                                    <div className="mp-slider-btn"><a href="#" className="btn-a">Learn more</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div className="wrapper-a-holder full-width-search">
                <div className="wrapper-a">


                    <div className="page-search full-width-search search-type-b">
                        <div className="search-type-padding">
                            <nav className="page-search-tabs">
                                <div className="search-tab active">Hotels</div>        
                                <div className="search-tab ">FLights</div>
                                <div className="clear"></div>
                            </nav>
                            <div className="page-search-content">


                                <form className="search-tab-content">
                                    <div className="page-search-p">

                                        <div className="search-large-i">

                                            <div className="srch-tab-line no-margin-bottom">
                                                <label>Place / hotel name</label>
                                                <div className="input-a"><input type="text"
                                                    placeholder="Example:france" /></div>
                                            </div>

                                        </div>


                                        <div className="search-large-i">

                                            <div className="srch-tab-line no-margin-bottom">
                                                <div className="srch-tab-left">
                                                    <label>Check in</label>
                                                    <div className="input-a"><input type="text" className="date-inpt"
                                                        placeholder="mm/dd/yy" /> <span className="date-icon"></span></div>
                                                </div>
                                                <div className="srch-tab-right">
                                                    <label>Check out</label>
                                                    <div className="input-a"><input type="text" className="date-inpt"
                                                        placeholder="mm/dd/yy" /> <span className="date-icon"></span></div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                        </div>


                                        <div className="search-large-i">

                                            <div className="srch-tab-line no-margin-bottom">
                                                <div className="srch-tab-3c">
                                                    <label>Rooms</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="srch-tab-3c">
                                                    <label>adult</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="srch-tab-3c">
                                                    <label>Child</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                        </div>

                                        <div className="clear"></div>


                                        <div className="search-asvanced">

                                            <div className="search-large-i">

                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-left">
                                                        <label>hotel stars</label>
                                                        <div className="input-a"><input type="text" placeholder="--" />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-right">
                                                        <label>Price</label>
                                                        <div className="input-a"><input type="text" placeholder="--" />
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>

                                            </div>


                                            <div className="search-large-i">

                                                <div className="srch-tab-line no-margin-bottom">
                                                    <label>Property type</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="search-large-i">

                                                <div className="srch-tab-line no-margin-bottom">
                                                    <label>Rating</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="clear"></div>
                                        </div>

                                    </div>
                                    <footer className="search-footer">
                                        <button className="srch-btn">Search</button>
                                        <span className="srch-lbl">Advanced Search options</span>
                                        <div className="clear"></div>
                                    </footer>
                                </form>

                                <form onSubmit={handleSubmit} className="search-tab-content">
                                    <div className="page-search-p">

                                        <div className="search-large-i">

                                            <div className="srch-tab-line no-margin-bottom">
                                                <div className="srch-tab-left">
                                                    <label>From</label>
                                                    <div className="input-a"><input type="text"
                                                        placeholder="Austria, vienna" /></div>
                                                </div>
                                                <div className="srch-tab-right">
                                                    <label>to</label>
                                                    <div className="input-a"><input type="text" placeholder="--" /></div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                        </div>


                                        <div className="search-large-i">

                                            <div className="srch-tab-line no-margin-bottom">
                                                <div className="srch-tab-left">
                                                    <label>Departure</label>
                                                    <div className="input-a"><input type="text" className="date-inpt"
                                                        placeholder="mm/dd/yy" /> <span className="date-icon"></span></div>
                                                </div>
                                                <div className="srch-tab-right">
                                                    <label>arrivals</label>
                                                    <div className="input-a"><input type="text" className="date-inpt"
                                                        placeholder="mm/dd/yy" /> <span className="date-icon"></span></div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                        </div>


                                        <div className="search-large-i">

                                            <div className="srch-tab-line no-margin-bottom">
                                                <div className="srch-tab-left transformed">
                                                    <label>Peoples</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="srch-tab-right transformed">
                                                    <label>className </label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                        </div>

                                        <div className="clear"></div>

                                        <div className="search-asvanced">

                                            <div className="search-large-i">

                                                <div className="srch-tab-line no-margin-bottom">
                                                    <label>Price</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="search-large-i">

                                                <div className="srch-tab-line no-margin-bottom">
                                                    <label>Air company</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>


                                            <div className="search-large-i">

                                                <div className="srch-tab-line no-margin-bottom">
                                                    <label>Rating</label>
                                                    <div className="select-wrapper">
                                                        <select className="custom-select">
                                                            <option>--</option>
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="clear"></div>
                                        </div>

                                    </div>
                                    <footer className="search-footer">
                                        <button className="srch-btn">Search</button>
                                        <span className="srch-lbl">Advanced Search options</span>
                                        <div className="clear"></div>
                                    </footer>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>

            <div className="mp-pop">
                <div className="wrapper-padding-a">
                    <div className="popular-slider">
                        <header className="fly-in page-lbl">
                            <b>We are Offering the hottest offers</b>
                            <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                                magni<br />dolores eos qui.</p>
                        </header>
                        <div className="fly-in offer-slider-c">
                            <div id="offers" className="owl-slider">

                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-01.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Andrassy Thai Hotel</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">Location: Thailand </div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>756$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-02.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Campanile Cracovie</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">location: poland</div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>900$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-03.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Park Plaza Westminster</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">Location: Thailand </div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>850$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-04.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Ermin's Hotel</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">location: england</div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>630$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-01.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Andrassy Thai Hotel</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">Location: Thailand </div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>756$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-02.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Campanile Cracovie</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">location: poland</div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>900$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-03.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Park Plaza Westminster</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">Location: Thailand </div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>850$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>


                                <div className="offer-slider-i">
                                    <a className="offer-slider-img" href="#">
                                        <img alt="" src="img/slide-04.jpg" />
                                        <span className="offer-slider-overlay">
                                            <span className="offer-slider-btn">view details</span>
                                        </span>
                                    </a>
                                    <div className="offer-slider-txt">
                                        <div className="offer-slider-link"><a href="#">Ermin's Hotel</a></div>
                                        <div className="offer-slider-l">
                                            <div className="offer-slider-location">location: england</div>
                                            <nav className="stars">
                                                <ul>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                                    <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                                </ul>
                                                <div className="clear"></div>
                                            </nav>
                                        </div>
                                        <div className="offer-slider-r">
                                            <b>630$</b>
                                            <span>avg/night</span>
                                        </div>
                                        <div className="offer-slider-devider"></div>
                                        <div className="clear"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mp-popular">
                        <header className="fly-in">
                            <b>Our travel Agency</b>
                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                        </header>
                        <div className="fly-in advantages-row flat">
                            <div className="flat-adv">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/adv-a-01.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">Awesome design</div>
                                            <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-adv">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/adv-a-02.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">carefully handcrafted</div>
                                            <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-adv">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/adv-a-03.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">fully responsive</div>
                                            <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-adv">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/adv-a-04.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">customer support</div>
                                            <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>

                </div>
            </div>

            <div className="testimonials-flat">
                <div className="testimonials-holder fly-in">
                    <div id="testimonials-slider">

                        <div className="testimonials-i">
                            <div className="testimonials-a"><img alt="" src="img/testimonials-02.png" /></div>
                            <div className="testimonials-b">"Qerspeciatis unde omnis iste natus doxes sit voluptatem accusantium
                                doloremque laudantium, totam aperiam<br />eaque ipsa quae ab illo inventore veritatis et
                                quasi architecto"</div>
                            <div className="testimonials-c">
                                <nav>
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="testimonials-d">Albert Dowson, Company Director</div>
                        </div>


                        <div className="testimonials-i">
                            <div className="testimonials-a"><img alt="" src="img/testimonials-02.png" /></div>
                            <div className="testimonials-b">"Qerspeciatis unde omnis iste natus doxes sit voluptatem accusantium
                                doloremque laudantium, totam aperiam<br />eaque ipsa quae ab illo inventore veritatis et
                                quasi architecto"</div>
                            <div className="testimonials-c">
                                <nav>
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/ts-star-a.png" /></a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="testimonials-d">Albert Dowson, Company Director</div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="inform-block">
                <div className="wrapper-padding">
                    <header className="fly-in page-lbl">
                        <b>helpful information</b>
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                    </header>
                    <div className="fly-in advantages-row flat">
                        <div className="flat-adv large">
                            <div className="flat-adv-a">
                                <div className="flat-adv-l">
                                    <img alt="" src="img/info-c-01.png" />
                                </div>
                                <div className="flat-adv-r">
                                    <div className="flat-adv-rb">
                                        <div className="flat-adv-b">how to choose a tour</div>
                                        <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                            accusantium doloremque la dantiumeaque ipsa.</div>
                                        <a className="flat-adv-btn" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flat-adv large">
                            <div className="flat-adv-a">
                                <div className="flat-adv-l">
                                    <img alt="" src="img/info-c-02.png" />
                                </div>
                                <div className="flat-adv-r">
                                    <div className="flat-adv-rb">
                                        <div className="flat-adv-b">booking of tickets</div>
                                        <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                            accusantium doloremque la dantiumeaque ipsa.</div>
                                        <a className="flat-adv-btn" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flat-adv large">
                            <div className="flat-adv-a">
                                <div className="flat-adv-l">
                                    <img alt="" src="img/info-c-03.png" />
                                </div>
                                <div className="flat-adv-r">
                                    <div className="flat-adv-rb">
                                        <div className="flat-adv-b">weekend getaway</div>
                                        <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                            accusantium doloremque la dantiumeaque ipsa.</div>
                                        <a className="flat-adv-btn" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flat-adv large">
                            <div className="flat-adv-a">
                                <div className="flat-adv-l">
                                    <img alt="" src="img/info-c-04.png" />
                                </div>
                                <div className="flat-adv-r">
                                    <div className="flat-adv-rb">
                                        <div className="flat-adv-b">Traveling with family</div>
                                        <div className="flat-adv-c">Perspiciatis unde omnis iste natus doxes sit voluptatem
                                            accusantium doloremque la dantiumeaque ipsa.</div>
                                        <a className="flat-adv-btn" href="#">Read more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>

            <div className="pop-destinations">
                <header className="fly-in page-lbl">
                    <b>Popular Destinations</b>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                </header>
                <div className="mp-popular-row popular-flat">

                    <div className="fly-in offer-slider-i">
                        <a className="offer-slider-img" href="#">
                            <img alt="" src="img/offer-big-04.jpg" />
                            <span className="offer-slider-overlay">
                                <span className="offer-slider-btn">view details</span>
                            </span>
                        </a>
                        <div className="offer-slider-txt">
                            <div className="offer-slider-link"><a href="#">The Hotel 1060 Vienna</a></div>
                            <div className="offer-slider-l">
                                <div className="offer-slider-location">11 NOV 2014 - 22 NOV 2014</div>
                                <nav className="stars">
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                            </div>
                            <div className="offer-slider-r align-right">
                                <b>1200$</b>
                                <span>price</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>


                    <div className="fly-in offer-slider-i">
                        <a className="offer-slider-img" href="#">
                            <img alt="" src="img/offer-big-05.jpg" />
                            <span className="offer-slider-overlay">
                                <span className="offer-slider-btn">view details</span>
                            </span>
                        </a>
                        <div className="offer-slider-txt">
                            <div className="offer-slider-link"><a href="#">Pension Dr. Geissler</a></div>
                            <div className="offer-slider-l">
                                <div className="offer-slider-location">11 NOV 2014 - 22 NOV 2014</div>
                                <nav className="stars">
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                            </div>
                            <div className="offer-slider-r align-right">
                                <b>1400$</b>
                                <span>price</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>


                    <div className="fly-in offer-slider-i">
                        <a className="offer-slider-img" href="#">
                            <img alt="" src="img/offer-big-06.jpg" />
                            <span className="offer-slider-overlay">
                                <span className="offer-slider-btn">view details</span>
                            </span>
                        </a>
                        <div className="offer-slider-txt">
                            <div className="offer-slider-link"><a href="#">Hotel Mailberger Hof</a></div>
                            <div className="offer-slider-l">
                                <div className="offer-slider-location">11 NOV 2014 - 22 NOV 2014</div>
                                <nav className="stars">
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                            </div>
                            <div className="offer-slider-r align-right">
                                <b>2200$</b>
                                <span>price</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>


                    <div className="fly-in offer-slider-i">
                        <a className="offer-slider-img" href="#">
                            <img alt="" src="img/offer-big-07.jpg" />
                            <span className="offer-slider-overlay">
                                <span className="offer-slider-btn">view details</span>
                            </span>
                        </a>
                        <div className="offer-slider-txt">
                            <div className="offer-slider-link"><a href="#">Hotel Bellevue Wien</a></div>
                            <div className="offer-slider-l">
                                <div className="offer-slider-location">11 NOV 2014 - 22 NOV 2014</div>
                                <nav className="stars">
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                            </div>
                            <div className="offer-slider-r align-right">
                                <b>3500$</b>
                                <span>price</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>


                    <div className="fly-in offer-slider-i">
                        <a className="offer-slider-img" href="#">
                            <img alt="" src="img/offer-big-08.jpg" />
                            <span className="offer-slider-overlay">
                                <span className="offer-slider-btn">view details</span>
                            </span>
                        </a>
                        <div className="offer-slider-txt">
                            <div className="offer-slider-link"><a href="#">Manesol Boutique Lamartine </a></div>
                            <div className="offer-slider-l">
                                <div className="offer-slider-location">11 NOV 2014 - 22 NOV 2014</div>
                                <nav className="stars">
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                            </div>
                            <div className="offer-slider-r align-right">
                                <b>1700$</b>
                                <span>price</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>


                    <div className="fly-in offer-slider-i">
                        <a className="offer-slider-img" href="#">
                            <img alt="" src="img/offer-big-09.jpg" />
                            <span className="offer-slider-overlay">
                                <span className="offer-slider-btn">view details</span>
                            </span>
                        </a>
                        <div className="offer-slider-txt">
                            <div className="offer-slider-link"><a href="#">The Empress Theodora Hotel</a></div>
                            <div className="offer-slider-l">
                                <div className="offer-slider-location">11 NOV 2014 - 22 NOV 2014</div>
                                <nav className="stars">
                                    <ul>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-b.png" /></a></li>
                                        <li><a href="#"><img alt="" src="img/star-a.png" /></a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                            </div>
                            <div className="offer-slider-r align-right">
                                <b>1400$</b>
                                <span>price</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>

                </div>
                <div className="clear"></div>
            </div>

            <div className="partners-wrapper">
                <header className="fly-in page-lbl">
                    <b>Our parthners</b>
                    <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni<br />dolores
                        eos qui.</p>
                </header>
                <div className="partners fly-in">
                    <a href="#"><img alt="" src="img/partner-01.png" /></a>
                    <a href="#"><img alt="" src="img/partner-02.png" /></a>
                    <a href="#"><img alt="" src="img/partner-03.png" /></a>
                    <a href="#"><img alt="" src="img/partner-04.png" /></a>
                    <a href="#"><img alt="" src="img/partner-05.png" /></a>
                    <a href="#"><img alt="" src="img/partner-06.png" /></a>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
    );
};

export default Home;