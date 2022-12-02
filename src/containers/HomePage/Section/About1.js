import React, { Component } from 'react';

import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
class About extends Component {

    render() {



        return (
            <div className="container-about1">



                <footer class="site-footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <h6>Về chúng tôi: </h6>
                                <p class="text-justify">
                                    Địa chỉ: 14 Lý Tự Trọng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh Bệnh viện Nhi Đồng 2, Tp.HCM</p>
                                <br></br>
                                <p class="text-justify">Điện thoại: 0333932605 / 0929153204 (Nhân viên phụ trách)</p>
                                <br></br>
                                <p class="text-justify"> Thư điện tử: quangtruongle369@gmail.com / quangtruongle963@gmail.com</p>
                                <br></br>
                                <p class="text-justify">Website: facebook.com/kinzuss</p>
                                <br></br>
                            </div>

                            <div class="col-sm-12 col-md-6">
                                <h6>Subscribe:</h6>
                                <ul class="footer-links">
                                    <li><a href="http://www.benhviennhi.org.vn/">Bệnh viện Nhi Đồng 2</a></li>
                                    <li><a href="https://bookingcare.vn/">Booking Care App</a></li>
                                    <li><a href="https://github.com/WangChuong/">My GitHub</a></li>
                                </ul>
                            </div>


                        </div>

                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 col-sm-6 col-xs-12">
                                <p class="copyright-text">Copyright &copy; 2022 QuangTruongDev.com.
                                </p>
                            </div>

                            <div class="col-md-4 col-sm-6 col-xs-12">
                               
                            </div>
                        </div>
                    </div>
                </footer>



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

export default connect(mapStateToProps, mapDispatchToProps)(About);
