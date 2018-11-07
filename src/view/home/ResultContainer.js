import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { hotelSearchResult } from '../../service/search/action';
import HotelCard from '../../component/HotelCard';
import AlertHotelCard from '../../component/AlertHotelCard';
import img_leftArrow from "../../asset/images/leftarrow.png";
import img_rightArrow from "../../asset/images/rightarrow.png";
import img_star5 from "../../asset/images/star5.png";
import img_star4 from "../../asset/images/star4.png";
import img_star3 from "../../asset/images/star3.png";
import img_star2 from "../../asset/images/star2.png";
import img_star1 from "../../asset/images/star1.png";
import img_block from "../../asset/images/block.png";
import img_wifi from "../../asset/images/wifi.png";
import img_parking from "../../asset/images/parking-sign.png";
import img_minibus from "../../asset/images/minibus.png";
import img_breakfast from "../../asset/images/breakfast.png";
import img_online from "../../asset/images/online-booking.png";

class ResultContainer extends Component {
  state = {
    priceRange: this.props.query.price.max,
  }
  _filterRatingList = [
    {label: '5 Stars', value: 5, refImg: img_star5 },
    {label: '4 Stars', value: 4, refImg: img_star4 },
    {label: '3 Stars', value: 3, refImg: img_star3 },
    {label: '2 Stars', value: 2, refImg: img_star2 },
    {label: '1 Stars', value: 1, refImg: img_star1 },
  ]
  sliderChange = (e) => {
    this.setState({priceRange: e.target.value })
  }

  getFilterResult =() =>{
    const { hotelSearchResult, updateQuery, sessionId, query } = this.props;
    const { priceRange } = this.state;
    const payload = {
      ...query,
      price: {
        min: 1,
        max: priceRange
      }
    }

    updateQuery(payload);
    hotelSearchResult(sessionId, payload);
  }

  render() {
    const { dataList } = this.props;
    const { priceRange } = this.state;

    return (
     
      <Fragment>
      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
       
          <div className="filterBg">
            <h2>FILTER BY</h2>
            <div>
              <h4>Price Range</h4>
              <input
                onClick={this.getFilterResult}
                onChange={this.sliderChange}
                value={priceRange}
                type="range"
                multiple
                min="0"
                step="25"
                max="1000"
                data-values="1/19"
              />
              <span className="rangeVauleLeft">$0</span>
              <span className="rangeVauleRight">${priceRange}</span>
            </div>
            <div>
              <h4>Rating</h4>
              <ul>
                {this._filterRatingList.map((each, i) =>
                  <li key={i}>
                    <input value={each.value} type="checkbox" />
                    <img alt="" src={each.refImg} />
                    <p>{each.label}</p>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4>Accomodation Type</h4>
              <ul>
                <li>
                  <input type="checkbox" />
                  <span>Hotel</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Motel</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Apart-Hotel</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Town House</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Vacation House</span>
                </li>
              </ul>
            </div>
            <div>
              <h4>Neighborhood</h4>
              <ul>
                <li>
                  <input type="checkbox" />
                  <span>NewYork (and Vicinity)</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Manhattan</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Brooklyn</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Queens</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Midtown</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <span>Long Istland City</span>
                </li>
              </ul>
            </div>
            <div>
              <h4>Amenities</h4>
              <ul>
                <li>
                  <input type="checkbox" />
                  <img src={img_block} alt='block'/>
                  <span>Free Cancellation</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <img src={img_wifi} alt='wifi'/>
                  <span>Free Wifi</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <img src={img_parking} alt='parking'/>
                  <span>Free parking</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <img src={img_minibus} alt='mini bus'/>
                  <span>Free Airport Shuttle</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <img src={img_breakfast} alt='break fast'/>
                  <span>Breakfast Included</span>
                </li>
                <li>
                  <input type="checkbox" />
                  <img src={img_online} alt='online'/>
                  <span>Reseve Now, Pay Later</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          <div className="sectionCard marginTop0">
            <ul className="navigation">
              <li>
                <img src={img_leftArrow} alt="left arrow" />
              </li>
              <li className="line active">
                <span>Select Hotel</span>
                1
              </li>
              <li className="line">
                <span>Select Room</span>
                2
              </li>
              <li>
                <span>Confirm Room</span>
                3
              </li>
              <li>
                <img src={img_rightArrow} alt="right arrow" />
              </li>
            </ul>
          </div>
          {(dataList && dataList.length)
            ? dataList.map((each, index) => {
              const detailedAddress =
                each.contact.address.line1 +
                ", " +
                each.contact.address.line2 +
                ", " +
                each.contact.address.city.name +
                ", " +
                each.contact.address.countryCode +
                ", " +
                each.contact.address.postalCode;
              const actualFare = each.fare.totalFare.toFixed(2);
              const disFare = `$ ${each.fare.baseFare} + ${each.fare.taxes[0].amount}`;

              return (<HotelCard
                key={index}
                images={each.images}
                rating={each.rating}
                name={each.name}
                detailedAddress={detailedAddress}
                descriptions={each.descriptions[0] ? each.descriptions[0] : "No Description avaliable"}
                disFare={disFare}
                actualFare={actualFare} />)
              }): <AlertHotelCard
                alertInfo='No Hotels Available'/>
            }
            {/* <div className="downarrowStyle"><img src={img_downarrow} alt='arrow '/></div> */}
        
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  sessionId: state.searchReducer.sessionId,
})
const mapDispatchToProps = dispatch => ({
  hotelSearchResult : (sessionId ,maxHotelPrice) => dispatch(hotelSearchResult(sessionId,maxHotelPrice))
})

export default connect( mapStateToProps ,mapDispatchToProps)(ResultContainer);
