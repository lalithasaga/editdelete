/*import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import EmailVerificationPopup from './EmailVerificationPopup';


const Dashboard = () => {
  return (
    <section className='wel'>
      <div className='header-container'>
        <h1>Welcome to the Dashboard</h1>
        <p className='complete-details'>
          Please complete your contact details.
          <Link to="/contact">Complete Now</Link>
        </p>
      </div>
      <EmailVerificationPopup />
    </section>
  );
};

export default Dashboard; */

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import EmailVerificationPopup from './EmailVerificationPopup';
import AuthContext from './AuthContext';

const Dashboard = () => {
  const { isLoggedIn, isEmailVerified } = useContext(AuthContext);
  const [isSendingVerificationEmail, setIsSendingVerificationEmail] = useState(false);

  return (
    <section className='wel'>
      <div className='header-container'>
        <h1>Welcome to the Dashboard</h1>
        <p className='complete-details'>
          {isLoggedIn && !isEmailVerified && (
            <Link to="/contact">Complete Contact Details</Link>
          )}
        </p>
      </div>
      <EmailVerificationPopup
        isSendingVerificationEmail={isSendingVerificationEmail}
      />
    </section>
  );
};

export default Dashboard;


