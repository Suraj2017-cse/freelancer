import React from 'react';

const SharePage = () => {
  return (
    <>
      {/* Navigation bar and search section */}
      <div className="job-details-wrapper">
        <nav
          className="job-navbar navbar-expand-lg ml-5 mr-1"
          style={{ backgroundColor: '#001f3f', width: '83%', margin: '0 auto 0 0' }}
        >
          <div className="navbar-container mx-4">
            <button
              className="navbar-toggle-btn"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#jobNavbarSupportedContent"
              aria-controls="jobNavbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggle-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="jobNavbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <img src="../pic/paid2work-logo.jpeg" alt="paid2workk design" style={{ width: '24%' }} />
              </ul>

              <form className="job-search-form d-flex" role="search" style={{ width: '60%' }}>
                <div className="input-group">
                  <span className="input-group-text" id="search-addon">
                    <i className="bi bi-search"></i>
                  </span>
                  <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                  <button
                    className="btn btn-outline-light job-category-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        Category 1
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Category 2
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Category 3
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </nav>

        <div className="job-auth-buttons d-flex justify-content-between align-items-end gap-3 mr-5">
          <a href="./login.html">
            <button className="login-btn">Log in</button>
          </a>
          <a href="./registration.html">
            <button className="signup-btn">Sign up</button>
          </a>
        </div>
      </div>

      <br />

      {/* Job details and tabs section */}
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="job-card bg-white p-4 shadow-sm rounded">
            <ul className="nav nav-tabs job-nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" id="job-details-tab" data-bs-toggle="tab" href="#job-details">
                  Details
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="job-proposals-tab" data-bs-toggle="tab" href="#job-proposals">
                  Proposals
                </a>
              </li>

              <div className="job-action-icons d-flex justify-content-between" style={{ position: 'absolute', right: '3rem' }}>
                <i className="bi bi-bookmark fs-5 ml-5"></i>
                &nbsp;&nbsp;&nbsp;
                <i className="bi bi-share-fill fs-5"></i>
              </div>
            </ul>

            <div className="tab-content pt-3">
              <div className="tab-pane fade show active" id="job-details">
                <div className="job-details-container">
                  <div className="job-info">
                    <h2>.NET Core Developer</h2>
                    <p>
                      Posted 44 minutes ago &nbsp;&nbsp;&nbsp;&nbsp; <i className="bi bi-geo-alt-fill"></i> Worldwide
                    </p>
                    <p>We need a .NET Core Developer to fix 2 API routes that interact with AWS S3 and Azure Blob Storage.</p>
                    <br />
                    <h3>Responsibilities:</h3>
                    <p>Fix and optimize .NET Core API routes for AWS S3 and Azure Blob Storage.</p>
                    <br />
                    <h3>Requirements:</h3>
                    <p>
                      Experience with .NET Core Web API.
                      <br />
                      Familiarity with AWS S3 and Azure Blob Storage.
                    </p>
                    <br />
                    <div className="job-stats">
                      <div>
                        <p>
                          <strong>$25.00</strong>
                          <br />
                          Fixed price
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Expert</strong>
                          <br />
                          Experience Level
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>
                            {' '}
                            <i className="bi bi-geo-alt-fill"></i> Remote Job
                          </strong>
                        </p>
                      </div>
                    </div>
                    <div className="job-type-info">
                      <div>
                        <p>
                          <strong>One-time project</strong>
                          <br />
                          Project Type
                        </p>
                      </div>
                    </div>
                    <h3>Skills and Expertise</h3>
                    <div className="job-skills">
                      <span>Full Stack Development Skills</span>
                      <span>Amazon Web Services</span>
                      <span>Microsoft Azure</span>
                      <span>C#</span>
                      <span>.NET Core</span>
                      <span>ASP.NET MVC</span>
                      <span>+ 5 more</span>
                    </div>
                  </div>

                  <div className="job-activity">
                    <div>Proposals 5</div>
                    <div>Last viewed by client 43 minutes ago</div>
                    <div>Interviewing 1</div>
                    <div>Invites sent 1</div>
                    <div>Unanswered invites 1</div>
                  </div>
                </div>
              </div>

              <div className="tab-pane fade" id="job-proposals">
                <p>This is the Proposals content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SharePage;
