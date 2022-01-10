import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import {logOut} from "../../saga/action/userAction";

const Navbar =({auth:{isAuthenticated, loading}, logOut})=>{
    const authLinks =(
        <ul>
            <li><Link to="/profiles">Developers</Link></li>
            <li><Link to="/dashboard"><i className="fas fa-user"></i>{' '}<span className='hide-sm'>Contact List</span></Link></li>
            <li><Link to="/dashboard"><i className="fas fa-user"></i>{' '}<span className='hide-sm'>Add Contact</span></Link></li>

            <li><a onClick={logOut} href="#!"><i className="fas fa-sign-out-alt"></i>{' '}<span className='hide-sm'>Logout</span></a></li>
        </ul>
    )

    const guessLinks =(
        <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i>03C Contact List</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated? authLinks:guessLinks}</Fragment>)}
        </nav>
    )
}
Navbar.propTypes={
    logOut:PropTypes.func.isRequired,
    auth:PropTypes.object
}
const mapStateToProps = state =>({
    auth: state.user
})
export default connect(mapStateToProps, {logOut})(Navbar)