import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing =({isAuthenticated})=>{
    if(isAuthenticated){
        return <Redirect to="/dashboard" replace={true} />
    }
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                <h1 className='x-large'>03C Contact List</h1>
                <p className='lead'>
                    Create and manage your contact list.
                </p>
                <div className='buttons'>
                   <Link to="/register" className="btn btn-primary">Register</Link>
                   <Link to="/login" className="btn btn-light">Login</Link>

                </div>
                </div>
            </div>
            </section>
    )
}

Landing.propTypes = {
    isAuthenticated:PropTypes.bool
};

const mapStateToProps = state =>({
    isAuthenticated:state.user.isAuthenticated
})
export default connect(mapStateToProps)(Landing)