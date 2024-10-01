import React, { useEffect, useState } from 'react';
import './registration.css'

const Registration = () => {
  const [selectedRole, setSelectedRole] = useState('1'); // Default to client
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'India',
    tips: false,
    terms: false,
  });
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const roleFromStorage = sessionStorage.getItem('selectedRole');
    if (roleFromStorage) {
      setSelectedRole(roleFromStorage);
    } else {
    //   window.location.href = 'verify-email.html';
    }

    fetch('https://freelancerapp.somee.com/GetActiveCountry')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching country data:', error));
  }, []);

  const handleRoleToggle = (role) => {
    setSelectedRole(role);
    sessionStorage.setItem('selectedRole', role);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    const submitData = new FormData();
    submitData.append('userID', null);
    submitData.append('username', `${formData.firstName} ${formData.lastName}`);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('roleId', parseInt(selectedRole, 10));
    submitData.append('privacy', formData.tips);
    submitData.append('mailsubs', formData.tips);
    submitData.append('country', formData.country);

    fetch('https://freelancerapp.somee.com/addRegistration', {
      method: 'POST',
      body: submitData,
    })
      .then((response) => response.text().then((text) => ({ status: response.status, text })))
      .then(({ status, text }) => {
        if (status === 200 && text.includes('Successfully Saved')) {
          sessionStorage.setItem('email', formData.email);
          window.location.href = 'verify-email.html';
        } else if (status === 400) {
          throw new Error('This Email Id Already Exists');
        } else {
          throw new Error('Unexpected response status');
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => setLoader(false));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container-div">
      {loader && (
        <div className="loader" id="loader">
          <div className="spinner"></div>
        </div>
      )}

      <div>
        <img src="/paid2work-logo.jpeg" style={{ width: '100%' }} alt="Paid2Work Logo" />
      </div>
      <br />
      <div className="toggle-buttons">
        <button
          className={`toggle-button freelancer ${selectedRole === '0' ? 'active' : ''}`}
          onClick={() => handleRoleToggle('0')}
        >
          Freelancer
        </button>
        <button
          className={`toggle-button client ${selectedRole === '1' ? 'active' : ''}`}
          onClick={() => handleRoleToggle('1')}
        >
          Client
        </button>
      </div>
      <br />
      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="form-group-names">
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Work email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group password-container">
          <label htmlFor="password">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="8 or more characters"
            minLength="8"
            required
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {passwordVisible ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select id="country" name="country" value={formData.country} onChange={handleChange} required>
            {countries.map((country) => (
              <option key={country.country_Id} value={country.country_Id}>
                {country.country_Name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="tips"
            name="tips"
            checked={formData.tips}
            onChange={handleChange}
          /> 
          <span className='ms-1'>Send me emails with tips on how to find talent that fits my needs.</span>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <span className='ms-1'>
            Yes, I understand and agree to the <a href="#">Pay2work Terms of Service</a>, including the{' '}
            <a href="#">User Agreement</a> and <a href="#">Privacy Policy</a>.
          </span>
        </div>
        
        
        <button type="submit" className="submit-button">
          Create my account
        </button>
      </form>
      {errorMessage && <p id="email-error" style={{ color: 'red' }}>{errorMessage}</p>}
      <p className="an-account">
        Already have an account? <a href="login.html">Log In</a>
      </p>
    </div>
  );
};

export default Registration;
