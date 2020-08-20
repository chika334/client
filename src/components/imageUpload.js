import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
// import Dropzone from 'react-dropzone';
import { Button, Form } from 'react-bootstrap';
import '../css/profileimage.css';
import blankpropic from '../images/blankpropic.png';
import Axios from 'axios';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import * as imageAction from '../actions/imageAction';
import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css';

class ImageUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
      file: null,
      redirect: false,
      msg: null,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    // imageRegister: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'IMAGE_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
  }

  handleChange(event) {
    const blob = new Blob([event.target.files[0]])
    const blobUrl = URL.createObjectURL(blob)
    const name = event.target.files[0].name
    const type = event.target.files[0].type
    this.setState({
      image: blobUrl
    })

    var newFile = new File([blobUrl], { name }, { type }, { lastModified: 1534584790000 });
    this.setState({
      // file: newFile
      file: event.target.files[0]
    });
    console.log(event.target.files[0])
  }

  handleSubmit(event) {
    event.preventDefault();
    const { file } = this.state
    if (file !== "") {
      this.setState({ redirect: true });
    }

    let formData = new FormData();
    formData.append("file", file);

    console.log(this.state.file);
    this.props.imageAction.imageRegister(formData)
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (this.state.redirect) {
      return <Redirect to={"/profile"} />
    }

    const auths = (
      <>
        <span className="bord">
          {/* <img src={this.state.image === '' ? blankpropic : this.state.image} width="30%" height="30%" className="bord" alt="uploaded image" /> */}
          <Avatar size={200} src={this.state.image} alt="uploaded image" icon={<UserOutlined />} />
        </span>
        <Form className="picsprof" onSubmit={this.handleSubmit}>
          <input type="file" name="file" className="inputfile" onChange={this.handleChange} />
          <button className="Profilepics">Submit</button>
        </Form>
      </>
    )
    const unauths = (
      <>
        Have you registered??
      you can do that <a href="/login">here</a>
      </>
    )
    return (
      <>
        {
          isAuthenticated ? auths : unauths
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

function mapDispatchToProps(dispatch) {
  return {
    imageAction: bindActionCreators(imageAction, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);