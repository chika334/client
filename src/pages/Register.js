import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { Alert, Form } from 'react-bootstrap';
import { clearErrors } from '../actions/errorActions';
import PublishIcon from '@material-ui/icons/Publish';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      department: '',
      file: '',
      // image: '',
      msg: null,
      redirect: false,
      formErrors: {
        firstname: '',
        lastname: '',
        email: "",
        password: ""
      }
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // if authenticated redirect 
    if (isAuthenticated) {
      this.setState({ redirect: true });
      this.SendRedirect()
    }
  }

  SendRedirect = () => {
    this.props.clearErrors()
  }

  onDrop = (files) => {
    // console.log(files)
    let formData = new FormData;
    formData.append("file", files[0])
  }

  onSubmit(e) {
    e.preventDefault();
    const { firstname, lastname, email, password, department, file } = this.state;

    // User object
    const newUser = {
      firstname,
      lastname,
      email,
      password,
      department,
      // file
    }
    // console.log(file)

    // Attempt to register
    this.props.register(newUser);
  }

  onChange(e) {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstname":
        formErrors.firstname =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "lastname":
        formErrors.lastname =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "department":
        formErrors.department =
          value === "software" || "hardware" || "network" ? "" : console.log("bad")
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;
    if (this.state.redirect) {
      // return <Redirect to='/profile' />
      return <Redirect to={'/imageUpload'} />
    }
    return (
      <>
        <div className="wrappers">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            {this.state.msg ? <Alert variant="danger">{this.state.msg}</Alert> : null}
            <form onSubmit={this.onSubmit} noValidate>
              <div className="firstname">
                <label htmlFor="firstname">First name</label>
                <input
                  placeholder="First name"
                  type="firstname"
                  name="firstname"
                  noValidate
                  value={this.state.firstname}
                  onChange={this.onChange}
                />
                {formErrors.firstname.length > 0 && (
                  <span className="errorMessage">{formErrors.firstname}</span>
                )}
              </div>
              <div className="lastname">
                <label htmlFor="lastname">Last name</label>
                <input
                  placeholder="Last name"
                  type="lastname"
                  name="lastname"
                  noValidate
                  value={this.state.lastname}
                  onChange={this.onChange}
                />
                {formErrors.lastname.length > 0 && (
                  <span className="errorMessage">{formErrors.lastname}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  noValidate
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  noValidate
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {formErrors.password.length > 0 && (
                  <span className="errorMessage">{formErrors.password}</span>
                )}
              </div>

              <div className="password">
                <label htmlFor="department">Department</label>
                <input
                  placeholder="Department"
                  type="department"
                  name="department"
                  noValidate
                  value={this.state.department}
                  onChange={this.onChange}
                />
              </div>
              <div className="createAccount">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register);