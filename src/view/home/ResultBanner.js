import React from 'react';
import moment from 'moment'
import img_arrow from '../../asset/images/arrow.png';

const ResultBanner = (props) => {
  const { start, end, city  } = props;
  
  return (
    <div className="row"> 
      <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9"> 
        <div className="sectionCard">
        <div className="text-center searchInfo">
						
						<ul>
							<li><h3> {city} hotels available from</h3></li>
              <li className="border">
                <h5>{moment(start).format('MMM DD')}</h5>
                <p>{moment(start).format('dddd')}</p>
                </li>
							<li><img src={img_arrow} alt='arrow'/></li>
              <li className="border">
                <h5>{moment(end).format('MMM DD')}</h5>
                <p>{moment(end).format('dddd')}</p>
              </li>
						</ul>
						</div>
        </div>
      </div>
    </div>
  )
}
export default ResultBanner;

ResultBanner.defaultProps = {
  start: moment().format('YYYY-MM-DD'),
  end: moment().add(3, 'days').format('YYYY-MM-DD'),
  count: '..',
  city: 'paris'
}