import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { searchHotelInit } from '../../service/search/action'
import Loading from '../../component/Loading';
// import Welcome from './Welcome';
import HeaderNav from './HeaderNav';
import Banner from './Banner';
import SearchTool from './SearchTool';
import ResultBanner from './ResultBanner';
import ResultContainer from './ResultContainer';
import img_travel from "../../asset/images/travel.png";
import img_roadmap from "../../asset/images/roadMap.png";



class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
			//todo: state intiat
			searchQuery: null,
			loader: false,
    }
  }

	handleSearch = (searchQuery) => {
			this.setState({ searchQuery },
			() =>this.props.searchHotelInit(searchQuery))

			this.setState({ loader: false })
	}
	handleSearchQuery = (searchQuery) => {
		this.setState({ searchQuery});
	}
  render() {
    const {isSearching, hotelList, hotelCount } = this.props;
    const { searchQuery } = this.state;

    return(
			<div>
			{isSearching && <Loading/>}
				<HeaderNav isGuest/>
				<div>
					<Banner/>
						<section className="searchSection">
							<div className="roadmap">
								<img src={img_roadmap} alt='user roadmap'/>
							</div>
							<div className="container">
								<div className="row"> 
									<SearchTool onSearch={this.handleSearch}/>
									<div className="col-xs-12 col-sm-12 col-md-3 col-lg-3"> 
										<div className="rightSide">
											<h4 className="rightHeadText"><img src={img_travel} alt='travel avatar'/> YOUR ITINERARY</h4>
											<div className="itineraryItems">
											</div>
											<h2 className="itineraryTotal">Total :</h2>
											<div className="itineraryBtns">
												<button type="button" className="searchBtn itinerarySave">Save <i className="far fa-thumbs-up"></i></button>
												<button type="button" className="searchBtn itineraryBook">Book <i className="fas fa-check"></i></button>
											</div>
										</div>
									</div>
								</div>
								
								{/* {((isSearching) || (result && result.hotels.length)) && <ResultBanner />} */}
								{searchQuery && !isSearching && <ResultBanner
									start={searchQuery.date.start}
									end={searchQuery.date.end}
									count={hotelCount}
									city={searchQuery.searchString
											? searchQuery.searchString.split(/[\s,]+/)[0]
											: 'France'}/>}

		
								{searchQuery && !isSearching && <div className="row ">
									<div className="col-xs-12 col-sm-12 col-md-9 col-lg-9"> 
										<div className="sectionCard">
											{<ResultContainer
													dataList={hotelList}
													updateQuery={this.handleSearchQuery}
													query={searchQuery}/>}
										</div>
									</div>
								</div>}
									
							</div>
					</section>
				</div>
			</div>
    )
  }
}
const mapStateToProps = (state) => ({
  sessionId: state.searchReducer.sessionId,
  hotelList: state.searchReducer.hotelList,
  hotelCount: state.searchReducer.hotelCount,
  isSearching: state.searchReducer.isSearching
}) 
const mapDispatchToProps = dispatch => ({
  searchHotelInit:(geometry) => dispatch(searchHotelInit(geometry))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));