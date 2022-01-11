import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import EmailSent from '../auth/EmailSent';
import Dashboard from '../dashboard/Dashboard';
import ContactForm from '../contact/ContactForm';
import VerifyEmail from '../auth/VerifyEmail';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route path="/verify/:email/:verificationCode" component={VerifyEmail} />
          <Route exact path="/email-sent" component={EmailSent} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/add-contact" component={ContactForm} />
      </Switch>
    </section>
  );
};

export default Routes;
