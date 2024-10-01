import React, { useEffect, useState } from 'react';
// import './reviewProject.css'

const ReviewProject = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    description: '',
    skills: '',
    budget: '',
  });

  useEffect(() => {
    // Fetch job details from the API on component mount
    const fetchJobDetails = async () => {
      const projectId = sessionStorage.getItem('projectId');

      if (projectId) {
        try {
          const response = await fetch(
            `https://freelancerapp.somee.com/api/Projects_/GetProject?projectId=${projectId}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
              const job = data[0];
              setJobDetails({
                jobTitle: job.title || 'N/A',
                description: job.description || 'No description available',
                skills: job.skill || 'No skills listed',
                budget:
                  job.budget && job.maxBudget
                    ? `$${job.budget} - $${job.maxBudget}`
                    : 'Budget details not available',
              });
            } else {
              console.warn('No job data found for the given project ID.');
            }
          } else {
            console.error('Failed to fetch job details: ', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching job details:', error);
        }
      } else {
        console.error('No project ID found in session storage.');
      }
    };

    fetchJobDetails();
  }, []);

  const handlePostJob = async () => {
    const projectId = sessionStorage.getItem('projectId');
    const ClientId = sessionStorage.getItem('NUserID');

    if (!ClientId) {
      alert('Unable to fetch Client ID from session storage.');
      return;
    }

    const formData = new FormData();
    formData.append('ClientId', ClientId);
    formData.append('Status', true);
    formData.append('NProjectId', projectId);

    if (projectId) {
      try {
        const response = await fetch(
          'https://freelancerapp.somee.com/api/Projects_/RegisterProject',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          alert('Job posted successfully');
          window.location.href = 'applied-project.html';
        } else {
          alert('Failed to post job: ' + response.statusText);
        }
      } catch (error) {
        console.error('Error posting job:', error);
        alert('Failed to post job. Please try again.');
      }
    } else {
      alert('No project ID found in session storage.');
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2 mt-2 job-details">
        <h3 className="text-dark" style={{ opacity: 0.7 }}>Job Details</h3>
        <button type="button" className="btn btn-success" onClick={handlePostJob}>
          Post this job
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <form id="jobDetailsForm">
            <div className="mb-4">
              <label htmlFor="jobTitle" className="form-label fs-5 d-flex">Job Title</label>
              <p className="form-control-plaintext fs-4">{jobDetails.jobTitle}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label fs-5 d-flex">Description</label>
              <textarea
                className="form-control w-100"
                id="description"
                rows="5"
                value={jobDetails.description}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="skills" className="form-label fs-5 d-flex">Skills</label>
              <input
                type="text"
                className="form-control w-100 py-2"
                id="skills"
                value={jobDetails.skills}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label htmlFor="budget" className="form-label fs-5 d-flex">Budget</label>
              <input
                type="text"
                className="form-control w-100 py-2"
                id="budget"
                value={jobDetails.budget}
                readOnly
              />
            </div>
            <div style={{ borderTop: '1px solid #ddd', marginTop: '2.5rem' }}></div>
            <div className="d-flex justify-content-between mt-5">
              <a href="post-project-4.html">
                <button type="button" className="btn btn-custom btn-back py-1">Back</button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewProject;
