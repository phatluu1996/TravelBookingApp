import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { importAll, numScroller } from '../utils/JqueryImport'
import Footer from './Layout/Footer'
import Header from './Layout/Header'

const About = () => {
    
    useEffect(() => {
        importAll(); 
        numScroller();       
    }, [])

    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="inner-page">
                    <div className="inner-breadcrumbs">
                        <div className="content-wrapper">
                            <div className="page-title">About Us</div>
                            <div className="breadcrumbs">
                                <Link to="/">Home</Link> / <span>About us</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>

                    <div className="about-content">
                        <div className="content-wrapper">
                            <header className="page-lbl fly-in">
                                <div className="offer-slider-lbl">About our website</div>
                                <p>for those who were too busy to go to ticket office!</p>
                            </header>
                            <div className="tree-colls fly-in">
                                <div className="tree-colls-i about-text">
                                    <p><span className="paragraph">D</span>uring the period of information technology and computer development people can search and find anything at home vie internet connection and use online services. Therefore, we are developing a service “Book any flight, any hotel online with more conveniences” named Travel Booking App. Travel Booking App is a group of people who wants to</p>

                                </div>
                                <div className="tree-colls-i about-text">
                                    <p>develop an online site where the users who are too busy to think of how they can purchase ticket online for traveling and this is also a marketing channel for hotels and airlines who will supply products for sale. It will provide users and suppliers the following features.</p>
                                </div>
                                <div className="tree-colls-i about-text">
                                    <div className="about-percent">
                                        <label>Hotels - 87%</label>
                                        <div data-percentage="87" className="about-percent-a"><span style={{width:"87%"}}></span></div>
                                    </div>
                                    <div className="about-percent">
                                        <label>Fly with us - 80%</label>
                                        <div data-percentage="80%" className="about-percent-a"><span style={{width:"80%"}}></span></div>
                                    </div>
                                    <div className="about-percent">
                                        <label>Happy with us - 96%</label>
                                        <div data-percentage="96" className="about-percent-a"><span style={{width:"96%"}}></span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="about-us-devider fly-in"></div>

                        <div className="counters fly-in">
                            <div className="content-wrapper">

                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='4560' data-delay='3' data-increment="1">0</b>
                                    <span>Happy clients</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='190' data-delay='3' data-increment="1">0</b>
                                    <span>Total bookings</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='842' data-delay='2' data-increment="1">0</b>
                                    <span>Reviews</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='98' data-delay='3' data-increment="1">0</b>
                                    <span>Hotels Partner</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='5' data-delay='1' data-increment="1">0</b>
                                    <span>Airlines Partner</span>
                                </div>

                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="testimonials-flat about-ts">
                            <div className="testimonials-holder fly-in">
                                <div id="testimonials-slider">

                                    <div className="testimonials-i">
                                        <div className="testimonials-a"><img alt="" src="img/aboutus/p2.jpg" style={{height:'60px',width:'60px',borderRadius:'30px'}} /></div>
                                        <div className="testimonials-b" style={{color:'black',fontWeight:'30px'}}>"Qerspeciatis unde omnis iste natus doxes sit voluptatem accusantium doloremque laudantium, totam aperiam<br />eaque ipsa quae ab illo inventore veritatis et quasi architecto"</div>
                                        <div className="testimonials-c">
                                            <nav>
                                                <ul>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="testimonials-d">Phat Luu, Team Leader</div>
                                    </div>
                                    <div className="testimonials-i">
                                        <div className="testimonials-a"><img alt="" src="img/testimonials-02.png" /></div>
                                        <div className="testimonials-b">"Qerspeciatis unde omnis iste natus doxes sit voluptatem accusantium doloremque laudantium, totam aperiam<br />eaque ipsa quae ab illo inventore veritatis et quasi architecto"</div>
                                        <div className="testimonials-c">
                                            <nav>
                                                <ul>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                    <li><a ><img alt="" src="img/ts-star-a.png" /></a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="testimonials-d">Phat Luu, Team Leaderr</div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="our-team">
                            <header className="page-lbl fly-in">
                                <div className="offer-slider-lbl">Our team</div>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit</p>
                            </header>
                            <div className="content-wrapper">

                                <div className="tree-colls three-team fly-in">
                                    <div className="tree-colls-i">
                                        <div className="about-percent about-photo">
                                            <div className="about-photo-image">
                                                <div className="team-more-h">
                                                    <div className="team-more">
                                                        <div className="team-more-a">
                                                            Sit amet, consectetur adipiscing elit. In maximus ligula semper metus pellentesque mattis. Maecenas volutpat, diam enim.
                                                            <div className="team-more-social">
                                                                <a  className="team-fb"></a>
                                                                <a  className="team-tw"></a>
                                                                <a  className="team-gp"></a>
                                                                <a  className="team-inst"></a>
                                                                <a  className="team-pint"></a>
                                                                <a  className="team-vk"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img alt="" src="img/aboutus/bach.jpg" />
                                            </div>
                                            <div className="about-photo-lbl">Bach Pham</div>
                                            <div className="about-photo-sublbl">Sub Leader</div>
                                        </div>
                                    </div>
                                    <div className="tree-colls-i">
                                        <div className="about-percent about-photo">
                                            <div className="about-photo-image">
                                                <div className="team-more-h">
                                                    <div className="team-more">
                                                        <div className="team-more-a">
                                                            Sit amet, consectetur adipiscing elit. In maximus ligula semper metus pellentesque mattis. Maecenas volutpat, diam enim.
                                                            <div className="team-more-social">
                                                                <a  className="team-fb"></a>
                                                                <a  className="team-tw"></a>
                                                                <a  className="team-gp"></a>
                                                                <a  className="team-inst"></a>
                                                                <a  className="team-pint"></a>
                                                                <a  className="team-vk"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img alt="" src="img/aboutus/ngoc.jpg" />
                                            </div>
                                            <div className="about-photo-lbl">Ngoc Le</div>
                                            <div className="about-photo-sublbl">Team member</div>
                                        </div>
                                    </div>
                                    <div className="tree-colls-i">
                                        <div className="about-percent about-photo">
                                            <div className="about-photo-image">
                                                <div className="team-more-h">
                                                    <div className="team-more">
                                                        <div className="team-more-a">
                                                            Sit amet, consectetur adipiscing elit. In maximus ligula semper metus pellentesque mattis. Maecenas volutpat, diam enim.
                                                            <div className="team-more-social">
                                                                <a  className="team-fb"></a>
                                                                <a  className="team-tw"></a>
                                                                <a  className="team-gp"></a>
                                                                <a  className="team-inst"></a>
                                                                <a  className="team-pint"></a>
                                                                <a  className="team-vk"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img alt="" src="img/aboutus/hoa.jpg" />
                                            </div>
                                            <div className="about-photo-lbl">Hoa Nguyen</div>
                                            <div className="about-photo-sublbl">Team Member</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="about-us-devider fly-in"></div>

                        <div className="why-we">
                            <div className="content-wrapper">
                                <header className="page-lbl fly-in">
                                    <div className="offer-slider-lbl">WHY CHOOSE US?</div>
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit</p>
                                </header>

                                <div className="tree-colls fly-in">
                                    <div className="tree-colls-i">
                                        <div className="about-percent why-we-item">
                                            <div className="why-we-img"><img alt="" src="img/why-we-01.png" /></div>
                                            <div className="why-we-lbl">Awesome design </div>
                                            <div className="why-we-txt">We always tried our best to provide you with the best services.</div>
                                        </div>
                                    </div>
                                    <div className="tree-colls-i">
                                        <div className="about-percent why-we-item">
                                            <div className="why-we-img"><img alt="" src="img/why-we-02.png" /></div>
                                            <div className="why-we-lbl">Easy Booking</div>
                                            <div className="why-we-txt">Search and compare flights from dosmetic airlines with many routes in Viet Nam.</div>
                                        </div>
                                    </div>
                                    <div className="tree-colls-i">
                                        <div className="about-percent why-we-item">
                                            <div className="why-we-img"><img alt="" src="img/why-we-03.png" /></div>
                                            <div className="why-we-lbl">Customer support</div>
                                            <div className="why-we-txt">We are now carving our path to be the best Lifestyle WebApp for our users.</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default About
