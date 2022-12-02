import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import react, react-markdown-editor-lite, and a markdown parser you like
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from '../../../store/actions';
import './ManageSupport.scss';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { CRUD_ACTIONS } from '../../../utils';
import { getDetailInforSupport } from '../../../services/userService';


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]
const mdParser = new MarkdownIt();

class ManageSupport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listSupports: [],
            hasOldData: false,
            //save to Support table

            note: '',



        }
    }

    componentDidMount() {
        this.props.fetchAllSupports();
        this.props.getAllRequireSupportInfor();
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

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allSupports !== this.props.allSupports) {
            let dataSelect = this.buildDataInputSelect(this.props.allSupports, 'USERS')
            console.log('check listSupports: ', dataSelect)
            this.setState({
                listSupports: dataSelect
            })
        }


        if (prevProps.allRequiredSupportInfor !== this.props.allRequiredSupportInfor) {

        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allSupports, 'USERS');
            console.log('check console dataSelect: ', dataSelect)
            this.setState({

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
        this.props.saveDetailSupports({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            supportId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,


            note: this.state.note,

        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInforSupport(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let note = '';

            if (res.data.Support) {

                note = res.data.Support.note;


            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,

                note: note,

            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,

                note: '',

            })
        }
        console.log('check', res);
    };

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
            <div className="manage-support-container">
                <div className="manage-support-title">
                    <FormattedMessage id="admin.manage-support.title" />
                </div>
                <div className="more-info row">
                    <div className="col-6 form-group">

                        <label><FormattedMessage id="admin.manage-support.select-support" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listSupports}
                            placeholder={<FormattedMessage id="admin.manage-support.select-support" />}

                        />
                    </div>

                    <div className="col-6 form-group">
                        <label><FormattedMessage id="admin.manage-support.note" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>



                </div>

                <div className="more-infor-extra row">



                    <div className="content-right">
                        <label><FormattedMessage id="admin.manage-support.intro" /></label>
                        <textarea className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>


                </div>




                <div className="manage-support-editor">

                    <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContent()}
                    className={hasOldData === true ? "save-content-support" : "create-content-support"}>
                    {hasOldData === true ?
                        <span> <FormattedMessage id="admin.manage-support.save" /></span> :
                        <span> <FormattedMessage id="admin.manage-support.add" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allSupports: state.admin.allSupports,
        allRequiredSupportInfor: state.admin.allRequiredSupportInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSupports: () => dispatch(actions.fetchAllSupports()),
        getAllRequireSupportInfor: () => dispatch(actions.getRequiredSupportInfor()),
        saveDetailSupports: (data) => dispatch(actions.saveDetailSupports(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSupport);










