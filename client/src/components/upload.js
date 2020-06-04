import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './upload.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

// Available env variabls
// REACT_APP_PRESET
// REACT_APP_API

const CLOUDINARY_PRESET = process.env.REACT_APP_PRESET;
const CLOUDINARY_UPLOAD_API = process.env.REACT_APP_API;

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            files: [],
            uploadedFileCloudinaryUrl: '',
            uploadedFile: 'false',
            nameValue: '',
            clicked: ''
        }
        this.onDrop = this.onDrop.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.inputName = this.inputName.bind(this);
    }

    onDrop(files) {
        this.setState({
            uploadedFile: 'true'
        })
    }

    onUpload() {
        this.setState({ clicked: 'yes' });
        let name = this.state.nameValue
        console.log('name: ' + name);
    }

    inputName(event) {
        this.setState({ nameValue: event.target.value })
    }

    render() {
        let submitButton;
        // if (this.state.files.length != 0 && this.state.nameValue.length != 0) {

        // }
        if (this.state.nameValue.length !== 0 && this.state.uploadedFile === 'true') {
            submitButton =
                <div>
                    <Button type="submit" variant="info" active>Enter</Button>
                </div>
        } else {
            submitButton =
                <div>
                    <Button type="submit" variant="info" disabled>Enter</Button>
                </div>
        }

        return (
            <div>
                <form onSubmit={this.onUpload}>
                    {/* DROPZONE IMAGE */}
                    <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section className="container">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <p className="dashed">Click to select files (maximum of 10MB)</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>

                    {/* CATNAME */}
                    <label>
                        Cat name:
                        <input onChange={this.inputName} value={this.state.nameValue} type="text" name="catname" />
                    </label>

                    {/* CHONKINESS */}
                    <DropdownButton id="dropdown-basic-button" title="select chonkiness">
                        <Dropdown.Item onClick={this.homepage}>Add My Cat</Dropdown.Item>
                        <Dropdown.Item onClick={this.allCats}>All</Dropdown.Item>
                    </DropdownButton>

                    {submitButton}
                </form>

                {/* The following div shows the status of the upload and uploaded image with URL*/}
                <div>
                    {this.state.isLoading === false ?
                        <div>
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                <div>
                                    <p>{this.state.uploadedFileCloudinaryUrl}</p>
                                    <img src={this.state.uploadedFileCloudinaryUrl} width='500px' />
                                </div>}
                        </div>
                        : <h3>Uploading...</h3>}
                </div>
                {this.state.uploadedFile}
                {this.state.nameValue}
                {this.state.clicked}
            </div>
        )
    }
}

export default Upload;