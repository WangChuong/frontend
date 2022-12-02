import React, { Component } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailMedical.scss';
import { connect } from 'react-redux';
import { getAllDetailMedicalById, getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from '../../System/Admin/DoctorExtraInfor';
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';

class DetailMedical extends Component {



    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailMedical: {},
            listMedication: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailMedicalById({
                id: id,
                location: 'ALL'
            });
            let resMedication = await getAllCodeService('MEDICATION');
            if (res && res.errCode === 0 && resMedication && resMedication.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorMedical;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataMedication = resMedication.data;
                if (dataMedication && dataMedication.length > 0) {
                    dataMedication.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "MEDICATION",
                        valueEn: "ALL",
                        valueVi: "Tất cả thể loại thuốc",
                    })
                }
                this.setState({
                    dataDetailMedical: res.data,
                    arrDoctorId: arrDoctorId,
                    listMedication: dataMedication ? dataMedication :  []
                })
            }
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    handleOnChangeSelect =async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getAllDetailMedicalById({
                id: id,
                location: location
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorMedical;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

              
                this.setState({
                    dataDetailMedical: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }
    render() {

        let { arrDoctorId, dataDetailMedical, listMedication } = this.state;
        let { language } = this.props;
        return (
            <div className="detail-medical-container">

                <HomeHeader
                />

                <div className="detail-medical-body">
                    <div className="description-medical">
                        {dataDetailMedical && !_.isEmpty(dataDetailMedical) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailMedical.descriptionHTML }}>

                            </div>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listMedication && listMedication.length > 0 && listMedication.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail= {true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMedical);
