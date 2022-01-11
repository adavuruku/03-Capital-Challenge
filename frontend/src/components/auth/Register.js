import React, { Fragment, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {createUserStart} from "../../saga/action/userAction";
import {setAlert} from "../../saga/action/alertAction"
import {v4 as uuidv4} from "uuid";

const Register = ({ createUserStart, setAlert, isRegister}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    password2: ''
  });

  const { fullName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(fullName, email, password, password2 )
    if (email.length <= 0 || fullName.length <= 0 || password2.length <= 0 || password.length <= 0) {
      // dispatch(setAlert({msg:'Invalid Data Input', id: uuidv4(), alertType: 'danger'}));
      setAlert({msg:'Invalid Data Input', id: uuidv4(), alertType: 'danger'});
    } else if(password !== password2){
      // dispatch(setAlert({msg: 'Passwords do not match', id: uuidv4(), alertType: 'danger'}));
      setAlert({msg: 'Passwords do not match', id: uuidv4(), alertType: 'danger'})
    }else{
      createUserStart({ fullName, email, password })
    }
  };
  //redirrect to Dashboard if user is in
  if(isRegister){
    return <Redirect to="/email-sent" replace={true}/>
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name "
            name="fullName"
            value={fullName}
            onChange={onChange}
          />
          <small className="form-text">
            Please enter your full name (first name middle name last name).
          </small>
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
          <small className="form-text">
            Please enter a valid email address.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <small className="form-text">
            Please enter your password.
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
          <small className="form-text">
            Please re-enter your password (6) character long.
          </small>
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

//define the compoment proptypes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createUserStart: PropTypes.func.isRequired,
  isRegister: PropTypes.bool
};
let mapStateToProps = state =>({
  isRegister: state.user.isRegister
})
// export default connect(mapStateToProps)(withRouter(Register));
export default connect(mapStateToProps, {setAlert, createUserStart})(Register);
