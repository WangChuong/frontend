import React, { Component } from 'react';
import './Medical.scss';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import { getAllMedical } from '../../../services/userService';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class Medical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMedical: []
    }
  }

  async componentDidMount() {
    let res = await getAllMedical();
    if (res && res.errCode === 0) {
      this.setState({
        dataMedical: res.data ? res.data : []
      })
    }
  }
  handleViewDetailMedical = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-medical/${item.id}`)
    }
  }
  render() {

    let { dataMedical } = this.state;
    return (
      <div className="section-share section-medical">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section"><FormattedMessage id="homepage.medical-popular" /></span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataMedical && dataMedical.length > 0 &&
                dataMedical.map((item, index) => {

                  return (
                    <div className="section-customize medical-child" key={index}
                    onClick={() => this.handleViewDetailMedical(item)}
                    >
                      <div
                        className="bg-image section-medical"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="medical-name">{item.name}</div>
                    </div>
                  )
                })
              }

            </Slider>
          </div>


        </div>
      </div>
    );

  }


}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Medical));
