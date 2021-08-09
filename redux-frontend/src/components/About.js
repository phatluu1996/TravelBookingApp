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
                            <div className="page-title">About</div>
                            <div className="breadcrumbs">
                                <Link to="/">Home</Link> / <span>About</span>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>

                    <div className="about-content">
                        <div className="content-wrapper">
                            <header className="page-lbl fly-in">
                                <div className="offer-slider-lbl">about our company</div>
                                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit</p>
                            </header>
                            <div className="tree-colls fly-in">
                                <div className="tree-colls-i about-text">
                                    <p><span className="paragraph">Q</span>erspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lauda erspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et</p>
                                </div>
                                <div className="tree-colls-i about-text">
                                    <p>doloremque laudantium, totam rem. Aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.</p>
                                </div>
                                <div className="tree-colls-i about-text">
                                    <div className="about-percent">
                                        <label>tours - 87%</label>
                                        <div data-percentage="87" className="about-percent-a"><span></span></div>
                                    </div>
                                    <div className="about-percent">
                                        <label>work with clients - 47%</label>
                                        <div data-percentage="47" className="about-percent-a"><span></span></div>
                                    </div>
                                    <div className="about-percent">
                                        <label>hotels - 70%</label>
                                        <div data-percentage="70" className="about-percent-a"><span></span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="about-us-devider fly-in"></div>

                        <div className="counters fly-in">
                            <div className="content-wrapper">

                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='4560' data-delay='3' data-increment="15">0</b>
                                    <span>tours</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='190' data-delay='3' data-increment="2">0</b>
                                    <span>happy clients</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='842' data-delay='2' data-increment="3">0</b>
                                    <span>holes reviews</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='98' data-delay='3' data-increment="2">0</b>
                                    <span>company offices</span>
                                </div>


                                <div className="counters-i">
                                    <b className="numscroller" data-slno='1' data-min='0' data-max='452' data-delay='3' data-increment="2">0</b>
                                    <span>awwards win</span>
                                </div>

                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="testimonials-flat about-ts">
                            <div className="testimonials-holder fly-in">
                                <div id="testimonials-slider">

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
                                        <div className="testimonials-d">Albert Dowson, Company Director</div>
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
                                        <div className="testimonials-d">Albert Dowson, Company Director</div>
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
                                                <img alt="" src="img/about-01.jpg" />
                                            </div>
                                            <div className="about-photo-lbl">Mark jonson</div>
                                            <div className="about-photo-sublbl">Director</div>
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
                                                <img alt="" src="img/about-02.jpg" />
                                            </div>
                                            <div className="about-photo-lbl">sara lee</div>
                                            <div className="about-photo-sublbl">Manager</div>
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
                                                <img alt="" src="img/about-03.jpg" />
                                            </div>
                                            <div className="about-photo-lbl">Stiven Fox</div>
                                            <div className="about-photo-sublbl">Manager</div>
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
                                            <div className="why-we-lbl">Excellent trip planning</div>
                                            <div className="why-we-txt">Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.</div>
                                        </div>
                                    </div>
                                    <div className="tree-colls-i">
                                        <div className="about-percent why-we-item">
                                            <div className="why-we-img"><img alt="" src="img/why-we-02.png" /></div>
                                            <div className="why-we-lbl">Best tour pricing</div>
                                            <div className="why-we-txt">Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.</div>
                                        </div>
                                    </div>
                                    <div className="tree-colls-i">
                                        <div className="about-percent why-we-item">
                                            <div className="why-we-img"><img alt="" src="img/why-we-03.png" /></div>
                                            <div className="why-we-lbl">We love our clients</div>
                                            <div className="why-we-txt">Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui. voluptatem sequi nesciunt.</div>
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
