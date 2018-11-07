import React from 'react';
import img_noimage from "../asset/images/No_Image.jpg";
import img_yellowstars from "../asset/images/yellowstars.png";

const HotelCard = (props) => {
  const { images, rating, name, detailedAddress,
    descriptions, disFare, actualFare } = props;

  return(
    <div className="sectionCard padding15">
                <div className="hotelImages">
                  <div className="owl-carousel owl-theme marginTop20">
                    <div className="item">
                      <img src={images.length > 0 ? images[0] : img_noimage} alt="banner" />
                    </div>
                    {/*   <div className="item">							
                  <img src={img_banner} alt='banner' />
                </div>
                <div className="item">							
                  <img src={img_banner} alt='banner' />
                </div> */}
                  </div>

                  <div className="detailsBg">
                    <div className="listTitle">
                      <img src={img_yellowstars} alt="star yellow color" />
                      <span>
                        <b>{rating}</b> of 5 <small />
                      </span>
                    </div>
                    <h4>{name}</h4>
                    <p> {detailedAddress}</p>
                    <p>
                      {" "}
                      {descriptions}
                      {/* Free Wifi included,Breakfast,Gym,Swimming Pool, Shuttle to the Airport */}
                    </p>
                  </div>
                  <div className="rateShowDiv">
                    <div className="priceDiv">
                      {/* <strike>${actualFare}</strike> */}

                      <h4>{disFare}</h4>
                      <p>(Basefare + Tax)</p>

                      <h2>${actualFare}</h2>
                      <p>per night</p>
                    </div>
                  </div>
                </div>
                <button type="button" className="selectRoomBtn">
                  Select Room
                </button>
              </div>
  )
}

export default HotelCard;