import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({component:Component, user:{isAuthenticated, loading}, ...rest}) =>{
    console.log(isAuthenticated, loading)
  return (
    
    <Route {...rest} render={props=> !isAuthenticated ? (<Redirect to='/login'/>) : (<Component {...props}/>)}/>
    
    )
    
}
PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};
const mapStateToProps = state =>({
    user:state.user
})

export default connect(mapStateToProps)(PrivateRoute)