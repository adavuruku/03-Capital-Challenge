import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import {deleteContact} from "../../saga/action/contactAction";

const Contact = ({ contacts, deleteContact }) => {
    const handleDeleteContact = (contactId, contactName) => {
        if(window.confirm(`Do you want to delete ${contactName} from your contact List?`)) {
            deleteContact(contactId)
        }
    }


  const allContact = contacts.map((cont) => (
    <tr key={cont._id}>
        <td className="hide-sm">{cont.fullName}</td>
        <td>{cont.phoneNumber}</td>
        <td className="hide-sm">{cont.email}</td>
        <td>
            {formatDate(cont.createdAt)}
        </td>
      <td>
        <button
          onClick={() => handleDeleteContact(cont._id, cont.fullName)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Contact List</h2>
      <table className="table">
        <thead>
            <tr>
                <th className="hide-sm">Name</th>
                <th className="hide-sm">Email Address</th>
                <th className="hide-sm"># Phone Number</th>
                <th className="hide-sm">Created</th>
                <th >Action</th>
            </tr>
        </thead>
        <tbody>{allContact}</tbody>
      </table>
    </Fragment>
  );
};

Contact.propTypes = {
    contacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired
};

export default connect(null, { deleteContact })(Contact);
