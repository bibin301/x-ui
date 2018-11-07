import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import img_logo from "../../asset/images/logo.png";
import img_headerSearch from "../../asset/images/headerSearch.png";
import img_user from "../../asset/images/user.png";

const navStyle= {
  position: 'relative',
  display: 'block',
  padding: '15px 15px'
}
export default class HeaderNav extends Component {
  // constructor(props){
  //   super(props);
    static proptypes = {
      isGuest: PropTypes.bool.isRequired,
      userInfo: PropTypes.any
    }
    static defaultProps = {
      isGuest: false
    }
  // }
  render() {
    const { userInfo, isGuest } = this.props;
    const  userName = isGuest ? 'Guest' : userInfo.userName;
    return (
      <nav className="navbar navbarBg">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span> 
            </button>
            <a className="navbar-brand" href="#"><img src={img_logo} alt='app logo'/></a>
          </div>
        
        
          <div className="collapse navbar-collapse navBg" id="myNavbar">
        <div className="navbarSearch"><input type="text"/><img src={img_headerSearch} alt='search'/></div>
            <ul className="nav navbar-nav navbar-right" >
              <li className="active"><div style={navStyle}><span><img src={img_user} alt='user avatar' width="25px"/></span> Hi {userName} <i className="fas fa-angle-down"></i></div></li>
              <li><a href="#">Sign Out</a></li>
              <li><a href="#">USD $ <i className="fas fa-angle-down"></i></a></li> 
              <li><a href="#">USA <i className="fas fa-angle-down"></i></a></li> 
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}