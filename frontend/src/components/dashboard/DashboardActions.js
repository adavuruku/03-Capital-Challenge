import React from 'react';
import {Link } from 'react-router-dom';


const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/dashboard/add-contact' className='btn btn-primary'>
        <i className='fab fa-black-tie text-primary' /> Add Contact
      </Link>
    </div>
  );
};

export default DashboardActions;