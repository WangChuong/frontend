import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageMedical.scss';
import { LANGUAGES } from '../../../utils';
import { CRUD_ACTIONS } from '../../../utils';
import { createNewMedical } from '../../../services/userService';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';



const mdParser = new MarkdownIt();

class ManageMedical extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }

    }


    handleOnChangeInput = async (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
        //console.log('handleEditorChange', html, text);
    }


    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }


    handleSaveNewMedical = async () => {
        let res = await createNewMedical(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new medical successfully')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Something wrong ...')
            console.log('LQT check', res)
        }
    }

    render() {
        console.log('checked', this.state)
        return (
            <div className="manage-medical-container">
                <div className="ms-title">Quản lý thuốc</div>

                <div className="add-new-medical row">
                    <div className="col-6 form-group">
                        <label>Tên thuốc</label>
                        <input className="form-control" type="text" value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Ảnh thuốc</label>
                        <input className="form-control" type="file"
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>

                    <div className="col-12">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12">
                        <button className="btn-save-medical"
                            onClick={() => this.handleSaveNewMedical()}>Save</button>
                    </div>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMedical);










