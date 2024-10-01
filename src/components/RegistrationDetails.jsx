import React, { useState, useEffect } from "react";
import './RegistrationDetails.css'

const RegistrationDetails = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    phone: "",
    postalCode: "",
    street: "",
    dob: "",
    experience: "",
  });
  const [profileImage, setProfileImage] = useState("/profile-logo.png");
  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
    loadCountries();
    populateExperienceLevels();
    const NUserID = sessionStorage.getItem("NUserID");
    if (NUserID) {
    //   loadUserDetails(NUserID);
    }
  }, []);

  const loadCountries = async () => {
    try {
      const response = await fetch("https://freelancerapp.somee.com/GetActiveCountry");
      const countriesData = await response.json();
      setCountries(countriesData);
    } catch (error) {
      console.error("Error loading countries:", error);
    }
  };

  const loadStates = async (countryId) => {
    try {
      const response = await fetch(`https://freelancerapp.somee.com/GetActiveState?CountryId=${countryId}`);
      const statesData = await response.json();
      setStates(statesData);
      setCities([]);
    } catch (error) {
      console.error("Error loading states:", error);
    }
  };

  const loadCities = async (stateId) => {
    try {
      const response = await fetch(`https://freelancerapp.somee.com/GetActiveCity?State_Id=${stateId}`);
      const citiesData = await response.json();
      setCities(citiesData);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const populateExperienceLevels = () => {
    let options = [];
    for (let i = 0; i <= 20; i++) {
      options.push(`${i} ${i === 1 ? "year" : "years"}`);
    }
    return options;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a file in JPG, JPEG, or PNG format.");
        return;
      }

      const userID = sessionStorage.getItem("NUserID");
      const formData = new FormData();
      formData.append("NUserID", userID);
      formData.append("type", "profile");
      formData.append("File", file);

      setLoaderVisible(true);

      try {
        const response = await fetch("https://freelancerapp.somee.com/UploadPhoto", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          setProfileImage(URL.createObjectURL(file));
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoaderVisible(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NUserID = sessionStorage.getItem("NUserID");
    const updatedData = {
      ...formData,
      NUserID,
    };

    try {
      const response = await fetch("https://freelancerapp.somee.com/Update_About", {
        method: "POST",
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        window.location.href = "dashboard.html";
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar-item">
        <div style={{ position: "relative" }}>
          <img src={profileImage} alt="Avatar" id="profile-image" />
          {loaderVisible && <div className="loader" id="loader"></div>}
        </div>
        <button type="button" id="upload-btn" onClick={() => document.getElementById("file-input").click()}>
          <i className="fa fa-upload"></i> Upload a photo
        </button>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <p>
          <i className="fa fa-exclamation-circle" style={{ color: "red" }}></i> Upload a photo
        </p>
      </div>
      <div className="content-item">
        <div className="mb-2">
          <img src="/paid2work-logo.jpeg" alt="Log1o" style={{ width: "50%" }} />
        </div>
        <h2 className="title">A few last details, then you can check and publish your profile.</h2>
        <p className="subtitle">
          A professional photo helps you build trust with your clients. To keep things safe and simple, they’ll pay you
          through us - which is why we need your personal information.
        </p>
        <form id="profile-form" onSubmit={handleSubmit}>
          {/* Country and Date of Birth */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <i className="fa fa-globe"></i>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={(e) => {
                  handleChange(e);
                  loadStates(e.target.value);
                }}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.country_Id} value={country.country_Id}>
                    {country.country_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <i className="fa fa-calendar-alt"></i>
              <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            </div>
          </div>
          {/* Street Address and Experience */}
          <div className="form-group">
            <label htmlFor="street">Street address *</label>
            <i className="fa fa-map-marker-alt"></i>
            <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="apt">Experience Level</label>
              <i className="fa fa-building"></i>
              <select id="apt" name="experience" value={formData.experience} onChange={handleChange}>
                <option value="">Select Experience Level</option>
                {populateExperienceLevels().map((level, index) => (
                  <option key={index} value={index}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="state">State/Province *</label>
              <i className="fa fa-map"></i>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  handleChange(e);
                  loadCities(e.target.value);
                }}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.state_Id} value={state.state_Id}>
                    {state.state_Name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* City and Postal Code */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <i className="fa fa-city"></i>
              <select id="city" name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.city_Id} value={city.city_Id}>
                    {city.city_Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="postal-code">Postal Code</label>
              <i className="fa fa-envelope"></i>
              <input type="text" id="postal-code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
            </div>
          </div>
          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <i className="fa fa-phone"></i>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          {/* Button */}
         <div className="d-flex justify-content-between">
         <button type="submit" id="btn-submit" className="btn btn-dark">
            Back
          </button>
         <button type="submit" id="btn-submit" className="btn btn-success">
            Save & continue
          </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationDetails;
