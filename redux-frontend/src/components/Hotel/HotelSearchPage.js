import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { retrieveProvince } from "../../actions/actionLocation";
import { fetchHotel } from "../../actions/actionHotel";
import { importAll } from "../../utils/JqueryImport";
// import { useQuery } from "../../utils/QueryParam";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HotelSearchPage = (props) => {
  const history = useHistory();
  let queryParam = useQuery();
  const [queryFilter, setQueryFilter] = useState();
  const [selectProvince, setSelectProvince] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [selectWard, setSelectWard] = useState(null);
  const provinceLabel = (code) => {
    // return province.properties.find(item => item.value === code)?.label;
  };

  const onChangeProvince = (e) => {
    document
      .querySelector("#districts")
      .parentElement.querySelector(".customSelectInner").innerHTML = "--";
    document
      .querySelector("#wards")
      .parentElement.querySelector(".customSelectInner").innerHTML = "--";
    if (e.currentTarget.id === "0") {
      setSelectDistrict(null);
      setSelectProvince(null);
      setSelectWard(null);
    } else {
      setSelectProvince(
        props.provinces.data.find(
          (item) => item.id === parseInt(e.currentTarget.value)
        )
      );
    }
  };
  const onChangeDistrict = (e) => {
    document
      .querySelector("#wards")
      .parentElement.querySelector(".customSelectInner").innerHTML = "--";
    if (e.currentTarget.id === "0") {
      setSelectDistrict(null);
      setSelectWard(null);
    } else {
      setSelectDistrict(
        selectProvince.districts.find(
          (item) => item.id === parseInt(e.currentTarget.value)
        )
      );
    }
  };
  const onChangeWard = (e) => {
    setSelectWard(
      selectDistrict.wards.find(
        (item) => item.id === parseInt(e.currentTarget.value)
      )
    );
  };

  const getTimeDiff = (_startTime, _endTime, type) => {
    let startTime = new Date(_startTime.replace(/-/g, "/"));
    let endTime = new Date(_endTime.replace(/-/g, "/"));
    let diff = endTime.getTime() - startTime.getTime(); //Time difference in milliseconds
    let day = Math.floor(diff / (24 * 60 * 60 * 1000)); //day
    let hour = Math.floor(diff / (60 * 60 * 1000)) - day * 24; //Time
    let minute = Math.floor(diff / (60 * 1000)) - day * 24 * 60 - hour * 60; //Minute
    let second =
      Math.floor(diff / 1000) -
      day * 24 * 60 * 60 -
      hour * 60 * 60 -
      minute * 60; //second
    // console.log(day, hour, minute, second);
    switch (type) {
      case "h":
        return hour;
      case "m":
        return minute;
      default:
        return minute;
    }
  };

  const timeDiff = (time1, time2) => {
    let valuestart = time1 + ":00";
    let valuestop = time2 + ":00";
    let hours;
    let minutes;

    if (
      new Date("01/01/2007 " + valuestart) < new Date("01/01/2007 " + valuestop)
    ) {
      var diff = getTimeDiff(
        "01/01/2007 " + valuestart,
        "01/01/2007 " + valuestop,
        "m"
      );
      // hours = Math.floor((diff / 60));
      hours = getTimeDiff(
        "01/01/2007 " + valuestart,
        "01/01/2007 " + valuestop,
        "h"
      );
      minutes = diff % 60;
    } else {
      var diff1 = getTimeDiff(
        "01/01/2007 " + "24:00",
        "01/01/2007 " + valuestart,
        "m"
      );
      var diff2 = getTimeDiff(
        "01/01/2007 " + valuestop,
        "01/01/2007 " + "00:00",
        "m"
      );
      var totalDiff = diff1 + diff2;
      hours = Math.floor(totalDiff / 60);
      minutes = totalDiff % 60;
    }

    return hours + "H " + minutes + "M";
  };

  useEffect(() => {
    let mount = false;

    importAll();
    console.log(props.getProvince());
    // (province,district,ward,numberAdult,numberChildren,checkInDate,numRoom)
    if (
      !queryParam.get("province") &&
      !queryParam.get("district") &&
      !queryParam.get("ward") &&
      !queryParam.get("numberAdult") &&
      !queryParam.get("numberChildren") &&
      !queryParam.get("checkInDate") &&
      !queryParam.get("numRoom")
    ) {
      document.location.href = "/";
    } else {
      if (!props.hotel) {
        props.getHotels(
          queryParam.get("province"),
          queryParam.get("district"),
          queryParam.get("ward"),
          queryParam.get("numberAdult"),
          queryParam.get("numberChildren"),
          queryParam.get("checkInDate"),
          queryParam.get("numRoom")
        );
        // console.log(props.getHotels());
      }
      let filter = {
        province: queryParam.get("province"),
        district: queryParam.get("district"),
        ward: queryParam.get("ward"),
        numberAdult: queryParam.get("numberAdult"),
        numberChildren: queryParam.get("numberChildren"),
        checkInDate: queryParam.get("checkInDate"),
        numRoom: queryParam.get("numRoom"),
      };
      setQueryFilter(filter);
    }
    return () => {
      mount = true;
    };
  }, []);

  const getNextDate = (e) => {
    const tomorrow = new Date(e);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(tomorrow);
    return date;
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(props.hotels);
    var form = e.target;
    const today = new Date();
    
    props.getHotels(
      form.provinces.value,
      form.districts.value,
      form.wards.value,
      form.numAdult.value,
      form.numChildren.value,
      form.checkInDate.value == "" ? getNextDate(today) : form.checkInDate.value,
      form.numRoom.value
    );
  };

  return (
    <>
      <Header></Header>
      <div className="main-cont">
        <div className="body-wrapper">
          <div className="wrapper-padding">
            <div className="page-head">
              <div className="page-title">
                Hotels - <span>detail style</span>
              </div>
              <div className="breadcrumbs">
                <a href="#">Home</a> / <a href="#">Hotel</a> /{" "}
                <span>detail style</span>
              </div>
              <div className="clear"></div>
            </div>
            <div className="two-colls">
              <div className="two-colls-left">
                <div className="srch-results-lbl fly-in">
                  <span>{props.hotels?.data?.length} results found.</span>
                </div>

                <div className="side-block fly-in">
                  <form className="side-block-search" onSubmit={handleSubmit}>
                    <div className="page-search-p">
                      <div className="srch-tab-line">
                        <div className="rsch-tab-line no-margin-bottom">
                          <div className="srch-tab-3c">
                            <label>Provinces</label>
                            <div className="select-wrapper">
                              <select
                                onChange={onChangeProvince}
                                className="custom-select"
                                name="provinces"
                                id="provinces"
                                defaultValue={queryParam.get("province")}
                              >
                                <option key={0} value={0}>
                                  --
                                </option>
                                {props.provinces?.data?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="srch-tab-3c">
                            <label>Districts</label>
                            <div className="select-wrapper">
                              <select
                                onChange={onChangeDistrict}
                                className="custom-select"
                                name="districts"
                                id="districts"
                                defaultValue={queryParam.get("district")}
                              >
                                <option key={0} value={0}>
                                  --
                                </option>
                                {selectProvince?.districts?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="srch-tab-3c">
                            <label>Wards</label>
                            <div className="select-wrapper">
                              <select
                                onChange={onChangeWard}
                                className="custom-select"
                                name="wards"
                                id="wards"
                                defaultValue={queryParam.get("ward")}
                              >
                                <option key={0} value={0}>
                                  --
                                </option>
                                {selectDistrict?.wards?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                      </div>

                      <div className="srch-tab-line">
                        <div className="srch-tab-left">
                          <label>Check in date</label>
                          <div className="input-a">
                            <input
                              id="checkInDate"
                              name="checkInDate"
                              type="text"
                              className="date-inpt"
                              placeholder="mm/dd/yy"
                              defaultValue={queryParam.get("checkInDate")}
                            />{" "}
                            <span className="date-icon"></span>
                          </div>
                        </div>
                        <div className="srch-tab-right">
                          <label>Check out date</label>
                          <div className="input-a">
                            <input
                              id="checkOutDate"
                              name="checkOutDate"
                              type="text"
                              className="date-inpt"
                              placeholder="mm/dd/yy"
                              defaultValue={queryParam.get("checkOutDate")}
                            />{" "}
                            <span className="date-icon"></span>
                          </div>
                        </div>
                        <div className="clear"></div>
                      </div>

                      <div className="srch-tab-line no-margin-bottom">
                        <div className="srch-tab-3c">
                          <label>Adults</label>
                          <div className="input-a">
                            <input
                              id="numAdult"
                              name="numAdult"
                              type="number"
                              defaultValue={queryParam.get("numberAdult")}
                              min="0"
                              max="6"
                            />
                          </div>
                        </div>
                        <div className="srch-tab-3c">
                          <label>Children</label>
                          <div className="input-a">
                            <input
                              id="numChildren"
                              name="numChildren"
                              type="number"
                              defaultValue={queryParam.get("numberChildren")}
                              max="6"
                            />
                          </div>
                        </div>
                        <div className="srch-tab-3c">
                          <label>Room</label>
                          <div className="input-a">
                            <input
                              name="numRoom"
                              type="number"
                              defaultValue={queryParam.get("numRoom")}
                              min="1"
                              max="30"
                            />
                          </div>
                        </div>
                        <div className="clear"></div>
                      </div>

                      <button type="submit" className="srch-btn">
                        Search
                      </button>
                    </div>
                  </form>
                </div>

                <div className="side-block fly-in">
                  <div className="side-price">
                    <div className="side-padding">
                      <div className="side-lbl">Price</div>
                      <div className="price-ranger">
                        <div id="slider-range"></div>
                      </div>
                      <div className="price-ammounts">
                        <input type="text" id="ammount-from" readOnly />
                        <input type="text" id="ammount-to" readOnly />
                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="side-block fly-in">
                  <div className="side-stars">
                    <div className="side-padding">
                      <div className="side-lbl">Star rating</div>
                      <div className="star-rating-l">Choose Rating</div>
                      <div className="star-rating-r">
                        {/* <a href="#"><img alt="" src="img/rating-b.png"></a>
                <a href="#"><img alt="" src="img/rating-b.png"></a>
                <a href="#"><img alt="" src="img/rating-b.png"></a>
                <a href="#"><img alt="" src="img/rating-b.png"></a>
                <a href="#"><img alt="" src="img/rating-a.png"></a> */}
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>

                <div className="side-block fly-in">
                  <div className="side-stars">
                    <div className="side-padding">
                      <div className="side-lbl">Accomodation type</div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          All (823)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Hotel (326)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Resort (141)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Residence (241)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Villas (324)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Apartment (214)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="side-block fly-in">
                  <div className="side-stars">
                    <div className="side-padding">
                      <div className="side-lbl">Preferences</div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Bathroom (823)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Cable TV (326)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Bed & breakfast (141)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Apartment (241)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Mini bar (324)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Wi - fi (214)
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" value="" />
                          Pets allowed (64)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="two-colls-right">
                <div className="two-colls-right-b">
                  <div className="padding">
                    <div className="catalog-head large fly-in">
                      <label>Sorting results by:</label>
                      <div className="search-select">
                        <select>
                          <option>Price</option>
                          <option>Price</option>
                          <option>Price</option>
                          <option>Price</option>
                          <option>Price</option>
                        </select>
                      </div>
                      <div className="search-select">
                        <select>
                          <option>Rating</option>
                          <option>Rating</option>
                          <option>Rating</option>
                          <option>Rating</option>
                          <option>Rating</option>
                        </select>
                      </div>
                      {/* <a href="#" className="show-list"></a>
                      <a href="#" className="show-table"></a> */}
                      <a href="#" className="show-thumbs chosen"></a>
                      <div className="clear"></div>
                    </div>

                    <div className="catalog-row with-text">
                      {/* Hotel List  */}
                      {props.hotels?.data?.map((hotel) => (
                       
                        <div className="offer-slider-i catalog-i fly-in">
                          <a href="#" className="offer-slider-img">
                            <img alt="" src="img/catalog-09.jpg" />
                            <span className="offer-slider-overlay">
                              <span className="offer-slider-btn">view details</span>
                              <span></span>
                            </span>
                          </a>
                          <div className="offer-slider-txt">
                            <div className="offer-slider-link">
                              <a href="#">{hotel.hotelName}</a>
                            </div>
                            <div className="offer-slider-l">
                              <div className="offer-slider-location">
                                {/* {hotel.location.map((location) =>(
                                        
                                ))} */}
                              </div>
                              <nav className="stars">
                                <ul>
                                  <li>
                                    <a href="#">
                                      <img alt="" src="img/star-b.png" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <img alt="" src="img/star-b.png" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <img alt="" src="img/star-b.png" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <img alt="" src="img/star-b.png" />
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <img alt="" src="img/star-a.png" />
                                    </a>
                                  </li>
                                </ul>
                                <div className="clear"></div>
                              </nav>
                            </div>
                            <div className="offer-slider-r">
                              <b>
                                {hotel.rooms[0].price}$   
                                </b>
                              <span>avg/night</span>
                            </div>
                            <div className="offer-slider-devider"></div>
                            <div className="clear"></div>
                            <div className="offer-slider-lead">
                               {hotel.rooms[0].roomType}
                            </div>
                            <a className="cat-list-btn" href="#">
                              Book now
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="clear"></div>

                    <div className="pagination">
                      <a className="active" href="#">
                        1
                      </a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
                <br className="clear" />
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    hotels: state.hotels,
    provinces: state.province,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotels: (
      province,
      district,
      ward,
      numberAdult,
      numberChildren,
      checkInDate,
      numRoom
    ) => {
      dispatch(
        fetchHotel(
          province,
          district,
          ward,
          numberAdult,
          numberChildren,
          checkInDate,
          numRoom
        )
      );
    },
    getProvince: () => {
      dispatch(retrieveProvince());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchPage);
