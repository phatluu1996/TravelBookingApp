import { useEffect, setState, useState, Component } from "react";
import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";
import { retrieveAirline, updateAirline } from "../../actions/actionAirline";

import { useSelector, useDispatch } from "react-redux";
import UpdateAirline from "./Component/UpdateAirline";
import { getUserId } from "../../utils/Common";

const Airline = (props) => {
  // let query = useQuery();
  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);

  const flights = useSelector((state) => state.flights);

  const id = parseInt(getUserId());

  const getAirline = (id) => {
    dispatch(retrieveAirline(id));
  };

  const editAirline = (airlineid, data) =>{
    dispatch(updateAirline(airlineid, data));
  }

  const updateAirlineHandler= (id,data) =>{
    editAirline(id,data);
   }


  const fullAddress = (addr) => {
    return (
      addr?.street +
      ", " +
      addr?.ward.prefix +
      " " +
      addr?.ward.name +
      ", " +
      addr?.district.prefix +
      " " +
      addr?.district.name +
      ", " +
      addr?.province.name +
      ", " +
      addr?.postalCode
    );
  };
  useEffect(() => {
    var mount = false;
    importAll(); 
    getAirline(id);
    
    return () => {
      mount = true;
    };
  }, []);

  return (
    <>
      <Header />
      <UpdateAirline airlineId={id} onUpdateAirline={updateAirlineHandler}/>


      <div className="main-cont"  style={{backgroundColor:'#fff'}}>
        <div className="inner-page" >
          <div className="inner-breadcrumbs" >
            <div className="content-wrapper">
              <div className="page-title">
                Airline - <span>Profile</span>
              </div>
              <div className="breadcrumbs">
                <a href="/">Home</a> / <a href="#">Airline</a> /{" "}
                <span>Profile</span>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          <div className="content-wrapper" style={{ paddingBottom:'40px' }}>
            <div className="shortcodes-block" >
              <div className="p-item-page" >
                <div className="p-item-page-l">
                  <div className="p-item-page-lb">
                    <div className="p-item-padding">
                      <div id="p-item-slider">
                        <div className="p-item-slide">
                          <img
                            alt=""
                            src="img/p-slider-01.jpg"
                            style={{ width: "40%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br className="clear" />
                </div>
              </div>
              <div className="p-item-page-r">
                <div className="shortcodes-right" style={{ width: "100%" }}>
                  <div className="tabs-type-b tabs-block">
                    <div className="tabs-type-bi">
                      <div className="tabs-type-bi-a">
                        <div className="tabs-type-bi-l">
                          <nav className="tabs-nav">
                            <ul>
                              <li>
                                <a className="active" href="#">
                                  Information <span></span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  Contact details <span></span>
                                </a>
                              </li>
                            </ul>
                            <div className="clear"></div>
                          </nav>
                        </div>
                        <div className="tabs-type-bi-r">
                          <div className="tabs-type-bi-rb">
                            <div className="tabs-type-bi-p">
                              <div className="tabs-content">
                                <div className="tabs-content-i">
                                  <div className="p-item-details">
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Airline Name
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.airlineName}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Homepage
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.homepage}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Phone
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.phone}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Fax
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.fax}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Address
                                      </div>
                                      <div className="p-item-details-ir">
                                        {fullAddress(airline.airline?.location)}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="update-form">
                                       <a href="#" style={{float:'right'}}>Update </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="tabs-content-i">
                                  <div className="p-item-details">
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Contact Name
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.contactName}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Title
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.contactTitle}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Mobile
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.mobile}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Email
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.email}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                   
                    <div className="p-item-social">
                      <a className="team-fb" href="#"></a>
                      <a className="team-tw" href="#"></a>
                      <a className="team-gp" href="#"></a>
                      <a className="team-inst" href="#"></a>
                      <a className="team-pint" href="#"></a>
                    </div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
            </div>
            <h3>For some information this year</h3>
                    <div className="p-item-more">
                    The coronavirus epidemic has made a huge impact on the travel industry. 
                    Almost all governments around the world have ordered their borders to close and airlines to stop operating. 
                    This has resulted in many important local and international events, such as the world-famous travel expo, 
                    ITB Berlin and the Olympics in Japan to either get postponed or cancelled because of coronavirus fears. 
                    With more and more people losing their jobs and facing financial insecurity, it’s not surprising to see a 
                    large number of business and personal trips that people had scheduled to take in 2020 or even 2021 get cancelled.
                  <br/>
                    Most tour operators and travel agencies are experiencing a steep decline in revenue. The knock-on effect is the 
                    result of airlines being forced to ground flights, which also affects the hotels and restaurants negatively. 
                    This means significant revenue loss for the travel, tourism, hotel, hospitality and airline industry. 
                    Some travel companies have been left with no choice but to wait it out, despite struggling to stay open.
                    </div>
          </div>
          
        </div>
        <div className="about-content">
          <div className="content-wrapper">
            <header className="page-lbl fly-in">
              <div className="offer-slider-lbl">Additional Services</div>
              <p>
                Our sincere thanks to all valued customers and partners for your
                support!
              </p>
            </header>
            <div className="services fly-in">
              <div className="services-row">
                <div className="services-i">
                  <div className="services-img">
                    <img
                      alt=""
                      src="img/icon-bag.png"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                  <div className="services-lbl">Prepaid Baggage</div>
                  <div className="services-txt">
                    Don't get stuck at the airport - plan ahead to save time and
                    money on your baggage by purchasing prepaid excess baggage.
                  </div>
                </div>

                <div className="services-i">
                  <div className="services-img">
                    <img
                      alt=""
                      src="img/airplane-seat.png"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                  <div className="services-lbl">Advanced Seat Selection</div>
                  <div className="services-txt">
                    With advanced seat selection, passengers can enjoy more
                    space to stretch their legs or avoid sitting separately from
                    their friends or family.{" "}
                  </div>
                </div>

                <div className="services-i">
                  <div className="services-img">
                    <img
                      alt=""
                      src="img/insurance-icon.png"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                  <div className="services-lbl">Travel Insurance </div>
                  <div className="services-txt">
                    {" "}
                    Passengers can be fully assured with Medical Assistance and
                    Emergency Medical Services of AAI who is a consultant and
                    assistance provider working 24/7 in more than 200 countries
                    around the world.
                  </div>
                </div>

                <div className="services-i">
                  <div className="services-img">
                    <img
                      alt=""
                      src="img/upgrade-business.png"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                  <div className="services-lbl">Upgrade At Airport </div>
                  <div className="services-txt">
                    Have chances to experience our premium in-flight services
                    and enjoy more space for working or relaxation.{" "}
                  </div>
                </div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
         
        </div>

        <div className="about-us-devider fly-in"></div>

        <div className="solutions">
          <div className="content-wrapper">
            <header className="page-lbl fly-in">
              <div className="offer-slider-lbl">Highlight</div>
              <p>
                Subscribe to our newsletter and keep updated on the latest
                offers and news.
              </p>
            </header>
            <div className="solutions-row fly-in">
              <div className="solutions-i">
                <div className="solution-icon-a"></div>
                <div className="solutions-over">
                  <div className="solutions-over-a">
                    <div className="solutions-over-b">
                      <div className="solutions-over-c">
                        <i>
                          <img alt="" src="img/icon-complete.png" />
                        </i>
                        <div className="solution-lbl">Check-in Online</div>
                      </div>
                      <div className="solutions-over-d">
                        <i>
                          <img alt="" src="img/icon-complete.png" />
                        </i>
                        <div className="solution-txt">
                          Check-in Online, Skip the line!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="solutions-img">
                  <img
                    alt=""
                    src="img/checkin.jpg"
                    style={{ width: "346px", height: "254px" }}
                  />
                </div>
              </div>

              <div className="solutions-i">
                <div className="solution-icon-a"></div>
                <div className="solutions-over">
                  <div className="solutions-over-a">
                    <div className="solutions-over-b">
                      <div className="solutions-over-c">
                        <i>
                          <img alt="" src="img/icon-complete.png" />
                        </i>
                        <div className="solution-lbl">
                          Manage booking easily!
                        </div>
                      </div>
                      <div className="solutions-over-d">
                        <i>
                          <img alt="" src="img/icon-complete.png" />
                        </i>
                        <div className="solution-txt">
                          Rebook and reroute without fee. Cancel booking is
                          easily, too!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="solutions-img">
                  <img
                    alt=""
                    src="img/managebooking.jpg"
                    style={{ width: "346px", height: "254px" }}
                  />
                </div>
              </div>

              <div className="solutions-i">
                <div className="solution-icon-a"></div>
                <div className="solutions-over">
                  <div className="solutions-over-a">
                    <div className="solutions-over-b">
                      <div className="solutions-over-c">
                        <i>
                          <img alt="" src="img/icon-complete.png" />
                        </i>
                        <div className="solution-lbl">Fly safely</div>
                      </div>
                      <div className="solutions-over-d">
                        <i>
                          <img alt="" src="img/icon-complete.png" />
                        </i>
                        <div className="solution-txt">
                          Fly with us safely and enjoy our best services.{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="solutions-img">
                  <img
                    alt=""
                    src="img/flysafely.jpg"
                    style={{ width: "346px", height: "254px" }}
                  />
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Airline;
