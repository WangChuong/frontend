import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import Select from 'react-select';
import './TableManageUser.scss';
import { LANGUAGES } from '../../../utils';
import { CRUD_ACTIONS } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,
            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listMedication: [],
            listClinic: [],
            listMedical: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectMedication: '',
            selectedClinic: '',
            selectedMedical: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
            medicalId: '',


        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequireDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT' || type === 'MEDICATION') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'MEDICAL') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDocTors !== this.props.allDocTors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDocTors, 'USERS')
            console.log('check listDoctors: ', dataSelect)
            this.setState({
                listDoctors: dataSelect
            })
        }


        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic, resMedical, resMedication } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectMedication = this.buildDataInputSelect(resMedication, 'MEDICATION');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectMedical = this.buildDataInputSelect(resMedical, 'MEDICAL');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
            console.log('check console quan trong: ',dataSelectMedication, dataSelectPayment, dataSelectProvince, dataSelectPrice, dataSelectSpecialty, dataSelectMedical, dataSelectClinic)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listMedication: dataSelectMedication,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic,
                listMedical: dataSelectMedical,
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDocTors, 'USERS');
            let { resPayment, resPrice, resProvince, resMedication } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectMedication = this.buildDataInputSelect(resMedication, 'MEDICATION');
            console.log('check console 2: ',dataSelectMedication, dataSelectPayment, dataSelectProvince, dataSelectPrice, dataSelect)
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listMedication: dataSelectMedication,
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        //console.log('handleEditorChange', html, text);
    }
    handleSaveContent = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectProvince: this.state.selectProvince.value,
            selectMedication: this.state.selectMedication.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
            medicalId: this.state.selectedMedical.value
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic, listMedical, listMedication } = this.state;
        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = '', medicalId = '', medicationId = '',
                selectedPayment = '', selectedPrice = '',selectMedication = '',selectProvince = '', selectedSpecialty = '', selectedMedical = '', selectedClinic = '';

            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                medicationId = res.data.Doctor_Infor.medicationId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                medicalId = res.data.Doctor_Infor.medicalId;
                clinicId = res.data.Doctor_Infor.clinicId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectMedication = listMedication.find(item => {
                    return item && item.value === medicationId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedMedical = listMedical.find(item => {
                    return item && item.value === medicalId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectProvince: selectProvince,
                selectMedication: selectMedication,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                selectedMedical: selectedMedical
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectProvince: '',
                selectMedication: '',
                selectedSpecialty: '',
                selectedClinic: '',
                selectedMedical: '',
            })
        }
        console.log('check', res);
    };

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }


    render() {
        console.log('check', this.state)
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left form-group">

                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}

                        />
                    </div>


                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.medication" /></label>
                        <Select
                            value={this.state.selectMedication}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listMedication}
                            placeholder={<FormattedMessage id="admin.manage-doctor.medication" />}
                            name="selectMedication"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-12 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>

                </div>


                <div className="row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedSpecialty"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.medical" /></label>
                        <Select
                            value={this.state.selectedMedical}
                            options={this.state.listMedical}
                            placeholder={<FormattedMessage id="admin.manage-doctor.medical" />}
                            onChange={this.handleChangeSelectDoctorInfor}
                            name="selectedMedical"
                        />
                    </div>

                </div>


                <div className="manage-doctor-editor">

                    <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContent()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span> <FormattedMessage id="admin.manage-doctor.save" /></span> :
                        <span> <FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDocTors: state.admin.allDocTors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getAllRequireDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);










