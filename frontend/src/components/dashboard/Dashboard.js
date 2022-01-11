import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Contact from './Contact';
import {createContact, loadContact} from "../../saga/action/contactAction";

const Dashboard = ({loadContact, user:{data}, contact:{contacts, loading, loadMore}}) =>{
    const [page, setPage] = useState(1)
    useEffect(()=>{
        loadContact(page);
    },[page])
    const increasePage = () => {
        setPage((page)=> page + 1);
        // loadContact(page+1)
    };
    // const reducePage = () => {
    //     const increasePage = () => setPage(page - 1);
    //     loadContact(increasePage)
    // };

    return (

        <Fragment>
            <h1 className="large text-primary"> Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome {data && data.fullName}
            </p>
            <DashboardActions />
            {
                loading && contacts.length <= 0 ? <Spinner/> :(
                    <Fragment>
                        <Contact contacts={contacts}/>
                    </Fragment>
                )
            }
            <div className="my-2">
                {/*{page > 1 ?*/}
                {/*    (<button className="btn btn-danger" onClick={() => reducePage()}>*/}
                {/*        <i className="fas fa-user-minus" /> Previous {page - 1}*/}
                {/*    </button>):{}*/}
                {/*}*/}
                {
                    loadMore && (
                        <button className="btn btn-primary" onClick={() => increasePage()}>
                            <i className="fas fa-angle-double-right"/> Load more ...
                        </button>
                    )
                }

            </div>
        </Fragment>
        )
  }

  Dashboard.propTypes = {
      loadContact: PropTypes.func.isRequired,
      user: PropTypes.object.isRequired,
      contact: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
      user: state.user,
      contact: state.contact,
  });

  export default connect(mapStateToProps, { loadContact, createContact })(
    Dashboard
  );