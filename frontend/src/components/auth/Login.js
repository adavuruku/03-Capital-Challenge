import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {loginStart} from "../../saga/action/userAction";
import {setAlert} from "../../saga/action/alertAction";
import {v4 as uuidv4} from "uuid";

const Login = ({ isAuthenticated, setAlert, loginStart }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if(email.length <=0 || password.length <=0){
      setAlert({msg:'Invalid Input Verify', id: uuidv4(), alertType: 'danger'})
    }else{
      loginStart({email, password});
    }
  };
  //redirrect of login
  console.log(isAuthenticated)
  if(isAuthenticated){
     return <Redirect to="/dashboard" replace={true}/>
  }
 
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  loginStart:PropTypes.func.isRequired,
  setAlert:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
let mapStateToProps = state =>({
  isAuthenticated: state.user.isAuthenticated
})
// export default Login 
export default connect(mapStateToProps, { loginStart, setAlert })(Login);
