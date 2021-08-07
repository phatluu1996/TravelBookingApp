import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { retrieveProvince } from "../../actions/actionLocation";
import { fetchHotel } from "../../actions/actionHotel";
import { importAll } from "../../utils/JqueryImport";
import Pagination from "./Pagination";
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
  const [itemsList, setItemsList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [sortDir, setSortDir] = useState("asc");

  const [selectWard, setSelectWard] = useState(null);
  const provinceLabel = (code) => {
    // return province.properties.find(item => item.value === code)?.label;
  };

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

  useEffect(() => {
    let mount = false;

    importAll();
    props.getProvince();

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
      }
      setPage(1);
      let filter = {
        province: queryParam.get("province"),
        district: queryParam.get("district"),
        ward: queryParam.get("ward"),
        numberAdult: queryParam.get("numberAdult"),
        numberChildren: queryParam.get("numberChildren"),
        checkInDate: queryParam.get("checkInDate"),
        numRoom: queryParam.get("numRoom"),
      };
      // setListItem(getPagination(props.hotels.data));
      setQueryFilter(filter);
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
        document.querySelector("#provinces").parentElement.querySelector(".customSelectInner").innerHTML = _province.name;
        document.querySelector("#provinces").value = queryParam.get("province");
        setSelectProvince(_province);
      }


      if (_district) {
        document.querySelector("#districts").parentElement.querySelector(".customSelectInner").innerHTML = _district.name;
        document.querySelector("#districts").value = queryParam.get("district");
        setSelectDistrict(_district)
      }


      if (_ward) {
        document.querySelector("#wards").parentElement.querySelector(".customSelectInner").innerHTML = _ward.name;
        document.querySelector("#wards").value = queryParam.get("ward");
        setSelectWard(_ward);
      }
    }

    return () => {
      mount = true;
    }
  }, [props.provinces.data])

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
      form.checkInDate.value == ""
        ? getNextDate(today)
        : form.checkInDate.value,
      form.numRoom.value
    );
    setPage(1);
  };



  const totalPages = () => {
    return Math.ceil(props?.hotels?.data?.length / itemsPerPage);
  }

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
                  <form className="side-block-search" onSubmit={handleSubmit} autoComplete="off">
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
                      {getPagination(
                        props.hotels.data,
                        page,
                        itemsPerPage,
                        sortBy,
                        sortDir
                      ).map((hotel) => (
                        <div  className="offer-slider-i catalog-i fly-in">
                          {/* <input hidden='true' name="hotelId" defaultValue={hotel.id} /> */}
                          <a href="#" className="offer-slider-img">
                            <img alt="" name="hotelImage" src="img/catalog-09.jpg" />
                            <span className="offer-slider-overlay">
                              <span className="offer-slider-btn">
                                view details
                              </span>
                              <span></span>
                            </span>
                          </a>
                          <div className="offer-slider-txt">
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
                              {/* {hotel.rooms[0].roomType} */}
                            </div>
                            <a onClick={() =>
                              history.push({
                                pathname: "/hotel-detail",
                                state: {
                                  hotel: hotel
                                }
                              })
                            } className="cat-list-btn" >
                              Book now
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="clear"></div>
                    {/* <Pagination
                      itemsPerPage={itemsPerPage}
                      listItem={props.hotels?.data?.length}
                      setPageNum={setPage}
                    /> */}
                    {props.hotels.data && (<div className="pagination">
                      {
                        page == 1 ? (<>
                          <a className="active">1</a>
                          {totalPages() >= 2 && <a onClick={(e) => setPage(2)}>2</a>}
                          {totalPages() >= 3 && <a onClick={(e) => setPage(3)}>3</a>}
                          <a onClick={(e) => setPage(page + 1)}>{">"}</a></>)
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
                    </div>)}
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
