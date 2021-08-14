import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { retrieveProvince } from "../../actions/actionLocation";
import { fetchHotel } from "../../actions/actionHotel";
import $ from 'jquery';
import { importAll } from "../../utils/JqueryImport";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HotelSearchPage = (props) => {
  const history = useHistory();
  let queryParam = useQuery();
  const queryString = require('query-string');
  const [filter, setFilter] = useState(queryString.parse(props.location.search));
  const [selectProvince, setSelectProvince] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc");

  const [selectWard, setSelectWard] = useState(null);

  const [errHlt, setErrHlt] = useState({
    province: '',
    checkin: '',
    checkout: ''
  })

  const [preferences, setPreferences] = useState({
    swimmingPool: false,
    hotTub: false,
    internet: false,
    freeParking: false,
    entertainment: false,
    gym: false
  });

  const onChangePreferences = (e, attribute) => {
    var pref = { ...preferences };
    pref[attribute] = !pref[attribute];
    setPreferences(pref);
  }

  const onChangeProvince = (e) => {
    document.querySelector("#districts").parentElement.querySelector(".customSelectInner").innerHTML = "--";
    document.querySelector("#districts").value = 0;
    document.querySelector("#wards").parentElement.querySelector(".customSelectInner").innerHTML = "--";
    document.querySelector("#wards").value = 0;
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
    document.querySelector("#wards").parentElement.querySelector(".customSelectInner").innerHTML = "--";
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

  const toQueryString = (obj) => {
    return new URLSearchParams(obj).toString();
  }

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

  const getPagination = (list = [], page, itemsPerPage, by, dir) => {
    if (!Array.isArray(list) || list.length === 0) {
      return [];
    }

    if (preferences.entertainment) {
      list = list.filter(item => item.entertaiment);
    }

    if (preferences.freeParking) {
      list = list.filter(item => item.freeParking);
    }

    if (preferences.gym) {
      list = list.filter(item => item.gym);
    }

    if (preferences.hotTub) {
      list = list.filter(item => item.hotTub);
    }

    if (preferences.internet) {
      list = list.filter(item => item.highSpeedInternet);
    }

    if (preferences.swimmingPool) {
      list = list.filter(item => item.swimmingPool);
    }

    var sortList = list.sort((a, b) => {
      switch (by) {
        case "rating":
          return dir === "desc"
            ? b.hotelRating - a.hotelRating
            : a.hotelRating - b.hotelRating;
        case "price":
          return dir === "desc"
            ? avgPrice(b) - avgPrice(a)
            : avgPrice(a) - avgPrice(b);
        case "name":
          if (dir === "desc") {
            if (b.hotelName > a.hotelName) {
              return 1;
            } else if (b.hotelName < a.hotelName) {
              return -1;
            }
            return 0;
          } else {
            if (b.hotelName < a.hotelName) {
              return 1;
            } else if (b.hotelName > a.hotelName) {
              return -1;
            }
            return 0;
          }
        case "province":
          if (dir === "desc") {
            if (b.location.province.name > a.location.province.name) {
              return 1;
            } else if (b.location.province.name < a.location.province.name) {
              return -1;
            }
            return 0;
          } else {
            if (b.location.province.name < a.location.province.name) {
              return 1;
            } else if (b.location.province.name > a.location.province.name) {
              return -1;
            }
            return 0;
          }
      }
    });

    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage - 1 + 1;

    return sortList.slice(startIdx, endIdx);
  };

  const avgPrice = (hotel) => {
    var sum = 0;
    hotel?.rooms?.forEach((room) => {
      sum = sum + parseInt(room.price);
    });
    return (sum / parseInt(hotel.rooms.length)).toFixed(2);
  };

  const onchangeSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const onchangeSortDir = (e) => {
    setSortDir(e.target.value);
  };

  const dateConvert = (date) => {
    var st = date.replace("/", ".");
    var pattern = /(\d{2}).(\d{2}).(\d{4})/;
    var dt = new Date(st.replace(pattern, '$3-$2-$1'));
    return dt;
  }

  useEffect(() => {
    let mount = false;
    importAll();
    props.getProvince();

    // (province,district,ward,numberAdult,numberChildren,checkInDate,numRoom)
    if (queryParam.toString().length == 0) {
      history.push("/");
    } else {
      setPage(1);
      if (!props.hotel) {
        performSearch(filter);
      }
    }
    return () => {
      mount = true;
    };
  }, []);



  useEffect(() => {
    let mount = false;
    if (props.provinces.data) {
      var _province = props.provinces.data.find(item => item.id == queryParam.get("province"));
      var _district = _province ? _province.districts.find(item => item.id == queryParam.get("district")) : null;
      var _ward = _district ? _district.wards.find(item => item.id == queryParam.get("ward")) : null;

      if (_province) {
        if (document.querySelector("#provinces").parentElement.querySelector(".customSelectInner")) {
          document.querySelector("#provinces").parentElement.querySelector(".customSelectInner").innerHTML = _province.name;
        }
        document.querySelector("#provinces").value = queryParam.get("province");
        setSelectProvince(_province);
      }


      if (_district) {
        if (document.querySelector("#districts").parentElement.querySelector(".customSelectInner")) {
          document.querySelector("#districts").parentElement.querySelector(".customSelectInner").innerHTML = _district.name;
        }
        document.querySelector("#districts").value = queryParam.get("district");
        setSelectDistrict(_district)
      }


      if (_ward) {
        if (document.querySelector("#wards").parentElement.querySelector(".customSelectInner")) {
          document.querySelector("#wards").parentElement.querySelector(".customSelectInner").innerHTML = _ward.name;
        }

        document.querySelector("#wards").value = queryParam.get("ward");
        setSelectWard(_ward);
      }
    }

    return () => {
      mount = true;
    }
  }, [props.provinces.data])

  const performSearch = (filter, shouldSetState = false) => {
    if (shouldSetState) {
      setFilter(filter)
    }
    props.getHotels(filter.province, filter.district, filter.ward, filter.numberAdult, filter.numberChildren, filter.checkInDate, filter.numRoom);
    window.history.pushState({}, null, `/hotel-list?${toQueryString(filter)}`);
  }

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

    var form = e.target;

    if (validateHtl(form, "hotel-flight-search")) {
      const today = new Date();
      var filter = { ...props.filter };
      filter.province = form.provinces.value;
      filter.district = form.districts.value;
      filter.ward = form.wards.value;
      filter.numberAdult = form.numAdult.value;
      filter.numberChildren = form.numChildren.value;
      filter.checkInDate = form.checkInDate.value;
      filter.checkOutDate = queryParam.get("checkOutDate");
      filter.numRoom = queryParam.get("numRoom");
      performSearch(filter, true);
    }

  };

  const handleSelectHotel = (hotel) => {
    history.push(`/hotel-detail?id=${hotel.id}&checkInDate=${filter.checkInDate}&checkOutDate=${filter.checkOutDate}&numberAdult=${filter.numberAdult}&numberChildren=${filter.numberChildren}`)
  }


  const totalPages = () => {
    return Math.ceil(props?.hotels?.data?.length / itemsPerPage);
  }

  const validateHtl = (form, formSelector) => {
    var err = { ...errHlt }
    if (form.provinces.value === "0") {
      err.province = 'Province cannot be empty';
      form.provinces.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
      $(`.${formSelector} #province-error`)[0].innerText = err.province;
    } else {
      err.province = '';
      form.provinces.parentElement.getElementsByTagName("span")[0].classList.remove("is-invalid");
      $(`.${formSelector} #province-error`)[0].innerText = err.province;
    }

    if (!form.checkInDate.value) {
      err.checkin = 'Checkin date cannot be empty';
      form.checkInDate.parentElement.classList.add("is-invalid");
      $(`.${formSelector} #checkin-error`)[0].innerText = err.checkin;
    } else {
      err.checkin = '';
      form.checkInDate.parentElement.classList.remove("is-invalid");
      $(`.${formSelector} #checkin-error`)[0].innerText = err.checkin;
    }

    if (!form.checkOutDate.value) {
      err.checkout = 'Checkout date cannot be empty';
      form.checkOutDate.parentElement.classList.add("is-invalid");
      $(`.${formSelector} #checkout-error`)[0].innerText = err.checkout;
    } else {
      err.checkout = '';
      form.checkOutDate.parentElement.classList.remove("is-invalid");
      $(`.${formSelector} #checkout-error`)[0].innerText = err.checkout;
    }

    if (form.checkInDate.value && form.checkOutDate.value) {
      if (form.checkInDate.value >= form.checkOutDate.value) {
        err.checkin = 'Check in date must be smaller than check out date';
        form.checkInDate.parentElement.classList.add("is-invalid");
        $(`.${formSelector} #checkin-error`)[0].innerText = err.checkin;

        err.checkout = 'Check out date must be larger than check in date';
        form.checkOutDate.parentElement.classList.add("is-invalid");
        $(`.${formSelector} #checkout-error`)[0].innerText = err.checkout;
      } else {
        err.checkin = '';
        form.checkInDate.parentElement.classList.remove("is-invalid");
        $(`.${formSelector} #checkin-error`)[0].innerText = err.checkin;
        err.checkout = '';
        form.checkOutDate.parentElement.classList.remove("is-invalid");
        $(`.${formSelector} #checkout-error`)[0].innerText = err.checkout;
      }
    }

    if (err.province || err.checkin || err.checkout) {
      setErrHlt(err);
      return false;
    }
    return true;
  }

  return (
    <>
      <Header></Header>
      <div className="main-cont">
        <div className="body-wrapper">
          <div className="wrapper-padding">
            <div className="page-head">
              <div className="page-title">Hotel - <span>Hotel Select</span></div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link> / <span>Hotel Search Result</span>
              </div>
              <div className="clear"></div>
            </div>
            <div className="two-colls">
              <div className="two-colls-left">
                <div className="srch-results-lbl fly-in">
                  <span>{props.hotels?.data?.length} results found.</span>
                </div>

                <div className="side-block fly-in">
                  <form className="hotel-flight-search side-block-search" onSubmit={handleSubmit} autoComplete="off">
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
                              <div className="booking-error-input" id="province-error"></div>
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
                          <div className="booking-error-input" id="checkin-error"></div>
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
                          <div className="booking-error-input" id="checkout-error"></div>
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
                              max="7"
                              onKeyPress={(e) => e.preventDefault()}
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
                              max="7"
                              onKeyPress={(e) => e.preventDefault()}
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
                              onKeyPress={(e) => e.preventDefault()}
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
                  <div className="side-stars">
                    <div className="side-padding">
                      <div className="side-lbl">Preferences</div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" onChange={(e) => onChangePreferences(e, "swimmingPool")} />
                          Swimming pool
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" onChange={(e) => onChangePreferences(e, "hotTub")} />
                          Hot Tub
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" onChange={(e) => onChangePreferences(e, "internet")} />
                          High speed internet
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" onChange={(e) => onChangePreferences(e, "freeParking")} />
                          Free Parking
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" onChange={(e) => onChangePreferences(e, "entertainment")} />
                          Entertainments
                        </label>
                      </div>
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" onChange={(e) => onChangePreferences(e, "gym")} />
                          Gym
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
                        <select defaultValue={sortBy} onChange={onchangeSortBy}>
                          <option value="price">AVG PRICE</option>
                          <option value="name">NAME</option>
                          <option value="rating">RATING</option>
                          <option value="province">PROVINCE</option>
                        </select>
                      </div>
                      <div className="search-select">
                        <select
                          defaultValue={sortDir}
                          onChange={onchangeSortDir}
                        >
                          <option value="asc">ASC</option>
                          <option value="desc">DESC</option>
                        </select>
                      </div>
                      {/* <a href="#" className="show-list"></a>
                      <a href="#" className="show-table"></a> */}
                      <a href="#" className="show-thumbs chosen"></a>
                      <div className="clear"></div>
                    </div>

                    <div className="catalog-row with-text">
                      {getPagination(props.hotels.data, page, itemsPerPage, sortBy, sortDir).map((hotel) => (
                        <div key={hotel.id} className="offer-slider-i catalog-i fly-in">
                          <a className={hotel.id == props.selectHotel?.id ? "offer-slider-img selected" : "offer-slider-img"}>
                            <img alt="" name="hotelImage" src={hotel?.images[0]?.imagePath} />
                            <span className="offer-slider-overlay">
                              <span className="offer-slider-btn">
                                view details
                              </span>
                              <span></span>
                            </span>
                          </a>
                          <div className={hotel.id == props.selectHotel?.id ? "offer-slider-txt selected" : "offer-slider-txt"}>
                            <div className="offer-slider-link">
                              <a href="#" name="hotelName" >{hotel.hotelName}</a>
                            </div>
                            <div className="offer-slider-l">
                              <div className="offer-slider-location" name="hotelLocation">
                                {hotel.location.province.name}
                              </div>
                              <nav className="stars">
                                <ul>
                                  {[...Array(5)].map(
                                    (item, index) =>
                                      // {
                                      index + 1 >
                                        Math.ceil(hotel.hotelRating) ? (
                                        <li key={index}>
                                          <a>
                                            <img alt="" src="img/star-a.png" />
                                          </a>
                                        </li>
                                      ) : (
                                        <li key={index}>
                                          <a>
                                            <img alt="" src="img/star-b.png" />
                                          </a>
                                        </li>
                                      )
                                    // }
                                  )}
                                </ul>
                                <div className="clear"></div>
                              </nav>
                            </div>
                            <div className="offer-slider-r">
                              <b >{avgPrice(hotel)}$</b>
                              <span>avg/night</span>
                            </div>
                            <div className="offer-slider-devider"></div>
                            <div className="clear"></div>
                            <div className="offer-slider-lead">
                            </div>
                            <a onClick={() => handleSelectHotel(hotel)} className="cat-list-btn" >
                              SELECT
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="clear"></div>
                    {getPagination(props.hotels.data, page, itemsPerPage, sortBy, sortDir)?.length > 0 ? (<div className="pagination">
                      {
                        page == 1 ? (<>
                          <a className="active">1</a>
                          {totalPages() >= 2 && <a onClick={(e) => setPage(2)}>2</a>}
                          {totalPages() >= 3 && <a onClick={(e) => setPage(3)}>3</a>}
                          {totalPages() >= 2 && <a onClick={(e) => setPage(page + 1)}>{">"}</a>}</>)
                          : page == totalPages() ? (<>
                            <a onClick={(e) => setPage(page - 1)}>{"<"}</a>
                            {totalPages() >= 3 && <a onClick={(e) => setPage(totalPages() - 2)}>{totalPages() - 2}</a>}
                            {totalPages() >= 2 && <a onClick={(e) => setPage(totalPages() - 1)}>{totalPages() - 1}</a>}
                            <a className="active">{totalPages()}</a></>)
                            : (<>
                              <a onClick={(e) => setPage(page - 1)}>{"<"}</a>
                              <a onClick={(e) => setPage(page - 1)}>{page - 1}</a>
                              <a className="active">{page}</a>
                              <a onClick={(e) => setPage(page + 1)}>{page + 1}</a>
                              <a onClick={(e) => setPage(page + 1)}>{">"}</a></>)
                      }
                      <div className="clear"></div>
                    </div>) : (
                      <h1 className="text-center">NO RESULTS FOUND</h1>
                    )}
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
