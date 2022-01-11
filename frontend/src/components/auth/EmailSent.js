import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EmailSent =({user:{data, isRegister, isAuthenticated}})=>{
    if(!isRegister){
        return <Redirect to="/" replace={true} />
    }
    return (
        <div className='dark-overlay'>
        <div className='landing-inner' style={{backgroundColor:'grey'}}>
            <h1 className='x-large'>03C Contact List</h1>
            <p className='lead'>
               Verification Email Has been sent to <strong>{data.email}</strong>, please follow the link to verify your account
            </p>
            <div className='buttons'>
                <Link to="/" className="btn btn-primary">Home</Link>
            </div>
        </div>
        </div>
    )
}
EmailSent.propTypes = {
    user:PropTypes.object
};

const mapStateToProps = state =>({
    user:state.user
})
export default connect(mapStateToProps)(EmailSent)