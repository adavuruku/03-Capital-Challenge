import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {createContact} from "../../saga/action/contactAction";
import {setAlert} from "../../saga/action/alertAction";
import {v4 as uuidv4} from "uuid";
const ContactForm = ({ createContact, setAlert }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
    });
    const {
        fullName,
        email,
        phoneNumber
    } = formData;
    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">Add New Contact</h1>
            <p className="lead">
                <i className="far fa-address-book" /> Yea! Save a contact and save your time
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    if(email.length >0 ||
                    phoneNumber.length >0 || fullName.length >0){
                        createContact({fullName,email,phoneNumber});
                    }else{
                        setAlert({msg:'Invalid Data Input yyyy', id: uuidv4(), alertType: 'danger'});
                    }

                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Contact full name"
                        name="fullName"
                        value={fullName}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="* Contact email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Contact phone number"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={onChange}
                    />
                    <small className="form-text">
                        Type phone number in internation format with the country code (+xxx-xxx-xxxx-xxx)
                    </small>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

ContactForm.propTypes = {
    createContact: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
};


export default connect(null, { createContact, setAlert })(withRouter(ContactForm));
