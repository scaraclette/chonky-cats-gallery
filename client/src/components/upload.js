import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './upload.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


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
            isChonky: false,
            isChonkyTitle: 'Select chonkiness',
            clicked: '',
        }
        this.onDrop = this.onDrop.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.inputName = this.inputName.bind(this);
        this.isChonk = this.isChonk.bind(this);
        this.notChonk = this.notChonk.bind(this);
        this.sendToBackend = this.sendToBackend.bind(this);
    }

    inputName(event) {
        this.setState({ nameValue: event.target.value })
    }

    isChonk() {
        this.setState({ isChonky: true, isChonkyTitle: 'Chonky' });
    }

    notChonk() {
        this.setState({ isChonky: false, isChonkyTitle: 'Non-chonky' });
    }

    onDrop(files) {
        this.onUpload(files[0]);
    }

    onUpload(file) {
        this.setState({ isLoading: true });

        let upload = request.post(CLOUDINARY_UPLOAD_API)
            .field('upload_preset', CLOUDINARY_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                });
                this.setState({
                    isLoading: false
                })
                console.log('IMG URL:' + response.body.secure_url);
                this.sendToBackend();
            }
        })
    }

    sendToBackend() {
        return null;
    }

    render() {
        let dropZone;
        if (this.state.nameValue.length !== 0) {
            dropZone =
                <form>
                    {/* DROPZONE IMAGE */}
                    <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section className="container">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <p className="dashed">Click here to select files (maximum of 10MB)</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </form>
        } else {
            dropZone = <form>Enter cat name before uploading picture</form>
        }


        return (
            <div>
                {/* CATNAME */}
                <Container>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter cat name..." value={this.state.nameValue} onChange={this.inputName} />
                    </Form.Group>
                </Container>

                {/* CHONKINESS */}
                <DropdownButton className="chonkButton" variant="secondary" id="dropdown-basic-button" title={this.state.isChonkyTitle}>
                    <Dropdown.Item onClick={this.isChonk}>Chonky</Dropdown.Item>
                    <Dropdown.Item onClick={this.notChonk}>Non-chonky</Dropdown.Item>
                </DropdownButton>

                {dropZone}

                {/* The following div shows the status of the upload and uploaded image with URL*/}
                <div>
                    {this.state.isLoading === false ?
                        <div>
                            {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                <div>
                                    <p>Cat Uploaded!</p>
                                    <img src={this.state.uploadedFileCloudinaryUrl} width='500px' />
                                </div>}
                        </div>
                        : <h3>Uploading...</h3>}
                </div>
            </div>
        )
    }
}

export default Upload;