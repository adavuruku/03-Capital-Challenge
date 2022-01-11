import React, {Fragment, useEffect} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {startEmailVerification} from "../../saga/action/userAction";
import Spinner from "../layout/Spinner";
import emailVerification from "../../saga/reducer/emailReducer";

const VerifyEmail =({email:{loading,isEmailVerified}, startEmailVerification})=>{
    let { email, verificationCode } = useParams();
    useEffect(()=>{
        startEmailVerification({ email, verificationCode })
    },[])
    const verifyingEmail = (
        <div>
            <h1 className='x-large'>03C Contact List</h1>
            <p className='lead'>
                We're Activating your Account excercise patience
            </p>
            <Spinner/>
        </div>
    )
    const failverification = (
        <Fragment>
            <h1 className='x-large'>03C Contact List</h1>
            <p className='lead'>
                Ooops! Sorry we can't verify this email please retry or register
            </p>
            <div className='buttons'>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
        </Fragment>
    )
    const successfulverification = (
        <Fragment>
            <h1 className='x-large'>03C Contact List</h1>
            <p className='lead'>
                We've verified your account, please login to continue
            </p>
            <div className='buttons'>
                <Link to="/login" className="btn btn-primary">Login</Link>
            </div>
        </Fragment>
    )
    return (
        <div className='dark-overlay'>
            <div className='landing-inner' style={{backgroundColor:'grey'}}>
                {
                    loading? verifyingEmail : ( isEmailVerified ? (successfulverification):(failverification))
                }
            </div>
        </div>
    )
}
VerifyEmail.propTypes = {
    email:PropTypes.object,
    startEmailVerification:PropTypes.func.isRequired
};

const mapStateToProps = state =>({
    email:state.emailVerification
})
export default connect(mapStateToProps, {startEmailVerification})(VerifyEmail)