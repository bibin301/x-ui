import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import LocationSearch from "./LocationSearch";
import img_calender from "../../asset/images/calender.png";
import img_search from "../../asset/images/search.png";
import img_pakage from "../../asset/images/package.png";

const staticBounds = {
  "bounds": {
    "rectangle": {
        "bottomRight": {
            "lat": 50.178005,
            "long": 3.921267
        },
        "topLeft": {
            "lat": 50.64359,
            "long": 2.635867
        }
    }
},
}
export default class SearchTool extends Component {
  state = {
    activeTab: "hotels",
    searchPayload: null,
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment()
      .add(3, "days")
      .format("YYYY-MM-DD"),
    rating: '',
    price: ''
  };
  _tabs = [
    { value: "flights", lable: "FLIGHTS" },
    { value: "hotels", lable: "HOTELS" },
    { value: "cars", lable: "CARS" },
    { value: "activities", lable: "ACTIVITIES" },
    { value: "packages", lable: "PACKAGES", img: img_pakage }
  ];
  _guest = [
    { value: null, lable: "Guest" },
    { value: 1, lable: 1 },
    { value: 2, lable: 2 },
    { value: 3, lable: 3 },
    { value: 4, lable: 4 }
  ];
  _rating = [
    { value: null, lable: "Rating" },
    { value: 5, lable: 5 },
    { value: 4, lable: 4 },
    { value: 3, lable: 3 },
    { value: 2, lable: 2 },
    { value: 1, lable: 1 }
  ];
  _price = [
    { value: null, lable: "Price" },
    { value: 100, lable: "upto 100$" },
    { value: 200, lable: "upto 200$" },
    { value: 300, lable: "upto 300$" },
    { value: 400, lable: "upto 400$" },
    { value: 500, lable: "upto 500$" },
    { value: 600, lable: "upto 600$" },
    { value: 700, lable: "upto 700$" },
    { value: 800, lable: "upto 800$" },
    { value: 900, lable: "upto 900$" },
    { value: 1000, lable: "upto 1000$" }
  ];

  componentDidMount() {
  }
 
  getSearchInfo = (searchPayload) => {
  
    // if(searchPayload.bounds) {
      this.setState({ searchPayload })
    // }
  };
  handleSearch = () => {
    const { searchPayload, startDate, endDate, rating, price } = this.state;
    const searchInfo = {
      ...searchPayload,
      date: {
        start: startDate,
        end: endDate
      },
      rating: {
        min: 1,
        max: rating || 5
      },
      price: {
        min: 1,
        max: price || 1000
      }
    };
    this.props.onSearch(searchInfo);
  };

  getToday = () => {
    return moment().format("YYYY-MM-DD");
  };
  handleEndDate = e => {
    this.setState({
      endDate: e.target.value
    });
  };
  handleStartDate = e => {
    this.setState({
      startDate: e.target.value,
      endDate: e.target.value
    });
  };
  handleRating = e => {
    this.setState({
      rating: e.target.value
    });
  };
  handlePrice = e => {
    this.setState({
      price: e.target.value
    });
  };
  render() {
    const { activeTab } = this.state;

    return (
      <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
        <div className="leftSide">
          <ul className="tabs">
            {this._tabs.map((each, i) => (
              <li
                key={i}
                className={
                  each.value === activeTab ? "tab-link current" : "tab-link"
                }
                onClick={() => this.setState({ activeTab: each.value })}
                data-tab="tab-2"
              >
                {each.lable}
                {each.img && <img src={each.img} alt="icon" width="20px" />}
              </li>
            ))}
          </ul>

          <div id="tab-2" className="tab-content current">
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }

  renderContent = () => {
    const {
      activeTab,
      startDate,
      endDate,
      searchPayload,
      price,
      rating
    } = this.state;
    const buttonEnable =
      searchPayload && searchPayload.bounds && startDate && endDate;
      
    switch (activeTab) {
      case this._tabs[1].value:
        return (<React.Fragment>
            <h3 className="tabHeadText">Search and Save on Hotels</h3>
            <div className="selectDivsAl">
              <div className="form-group">
                <select className="">
                  {this._guest.map((each, i) => (
                    <option key={i} value={each.value}>
                      {each.lable}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select className="" value={rating} onChange={this.handleRating}>
                  {this._rating.map((each, i) => (
                    <option key={i} value={each.value}>
                      {each.lable}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select className="" value={price} onChange={this.handlePrice}>
                  {this._price.map((each, i) => (
                    <option key={i}  value={each.value}>
                      {each.lable}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="selectDivsAl1">
              <div className="form-group">
                <div className="seleboxs">
                  <LocationSearch onSearch={this.getSearchInfo} />
                  <i className="fas fa-map-marker-alt locationIcon" onClick={() => this.getSearchInfo(staticBounds)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="seleboxs">
                  <img src={img_calender} alt="calender" className="calendImg" />
                  <input type="date" className="dateInput borderRig" onChange={this.handleStartDate} value={startDate} min={this.getToday()} placeholder="Sat,Oct 20" />
                  <input type="date" className="dateInput" onChange={this.handleEndDate} value={endDate} min={startDate} placeholder="Fri,Oct 26" />
                </div>
              </div>
            </div>
            <div className="text-right">
              <button type="button" className="searchBtn" disabled={!buttonEnable} onClick={this.handleSearch}>
                Search
                <img src={img_search} alt="search" />
              </button>
            </div>
          </React.Fragment>);

      default:
        return <React.Fragment>
          NEED TO INTEGEGRATE {this._tabs.find(each =>each.value === activeTab)['lable']}
          </React.Fragment>;
    }
  };
}
SearchTool.propTypes = {
  onSearch: PropTypes.func.isRequired
};
