import React, { Component } from 'react';
import MedicalFacility from './Section/MedicalFacility';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import './HomePage.scss';
import OutStandingDoctor from './Section/OutStandingDoctor';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from './Section/About';
import HomeFooter from './HomeFooter';
import Medical from './Section/Medical';
import About1 from './Section/About1';
class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
      
          };
        

        return (
          
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty settings={settings}/>
                <MedicalFacility settings={settings}/>
                <OutStandingDoctor settings={settings}/>
                <Medical settings={settings}/>
                <About settings={settings}/>
                <About1 settings={settings}/>
                <HomeFooter settings={settings}/>
            </div>
        
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
