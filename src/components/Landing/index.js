import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { Layout } from './../../containers';
import SVG from '../../helper/customizeIcon';
import imagePostRequest from './../../assets/images/post-request.svg';
import imageCatalog from './../../assets/images/catalog.png';
import imagePost from './../../assets/images/post.png';
import imageGet from './../../assets/images/get.png';
import imageChoose from './../../assets/images/choose.png';
import imageEfficient from './../../assets/images/efficient.png';

import './landing.sass';

const Landing = props => {
  // console.log('props LandingPage', props);

  return (
    <Layout>
      <div className="wrapper-landing-page">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <div className="container-landing-page">
              <Grid container spacing={0} justify="center" className="container-landing-process">
                <Grid item xs={12} sm={12}>
                  <div className="landing-process-headline">
                    <Typography variant="h5" className="process-headline-title">
                      Request For Proposal (RFP) Process
                    </Typography>
                    <Typography className="process-headline-content">
                      Follow the simple steps and get competitive quotes from the potential salers against your need.
                    </Typography>
                  </div>
                </Grid>
                <Grid container spacing={0} justify="center">
                  <Grid item xs={12} sm={12}>
                    <div className="container-landing-process-content">
                      <div className="landing-process-content">
                        <div className="process-content">
                          <div className="content-image">
                            <SVG
                              className="image-content"
                              width="128px"
                              height="128px"
                              source={imagePost}
                            />
                          </div>
                          <Typography variant="h6" className="content-title">
                            1. POST RFP
                          </Typography>
                          <Typography className="content">
                            Enter your buying request using RFP form in detail.
                          </Typography>
                        </div>
                        <div className="process-content">
                          <div className="content-image">
                            <SVG
                              className="image-content"
                              width="128px"
                              height="128px"
                              source={imageGet}
                            />
                          </div>
                          <Typography variant="h6" className="content-title">
                            2. Get Quotes and Compare Salers
                          </Typography>
                          <Typography className="content">
                            Receive quotes, responses from the salers.
                          </Typography>
                        </div>
                        <div className="process-content">
                          <div className="content-image">
                            <SVG
                              className="image-content"
                              width="128px"
                              height="128px"
                              source={imageChoose}
                            />
                          </div>
                          <Typography variant="h6" className="content-title">
                            3. Choose the best Salers and Finalise
                          </Typography>
                          <Typography className="content">
                            Contact, negotiate and close the deal with saler.
                          </Typography>
                        </div>
                        
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={0} justify="center" className="container-landing-post">
                <Grid item xs={4} sm={4}>
                  <div className="landing-post">
                    <Typography variant="h5" className="post-title">
                      Post RFP (Request For Proposal)
                    </Typography>
                    <Typography className="post-content">
                      Post your buying request on the platform and enable the
                      right salers to connect with you based on your buying
                      criteria. It's easiest and smarter way to share your
                      sourcing requests.
                    </Typography>
                    <Button variant="contained" color="secondary">
                      CREATE RFP
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <div className="post-image">
                    <SVG
                      className="image-post"
                      width="512px"
                      height="512px"
                      source={imagePostRequest}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                justify="center"
                className="container-landing-catalog"
              >
                <Grid item xs={4} sm={4}>
                  <div className="catalog-image">
                    <SVG
                      className="image-catalog"
                      width="412px"
                      height="412px"
                      source={imageCatalog}
                    />
                  </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <div className="landing-catalog">
                    <Typography variant="h5" className="catalog-title">
                      Look into catalog of requests
                    </Typography>
                    <Typography className="catalog-content">
                      Search, choose request which you can do and make offer to it's owner.
                    </Typography>
                    <Button variant="contained" color="primary">
                      LOOK INTO CATALOG
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                justify="center"
                className="container-landing-efficient"
              >
                <Grid item xs={4} sm={4}>
                  <div className="landing-efficient">
                    <Typography variant="h5" className="efficient-title">
                      Its Easy, Effective and Efficient
                    </Typography>
                    <Typography className="efficient-content">
                      - Get more competitive quote from salers <br/>
                      - Evaluate shortlisted salers, compare prices and terms of quote <br/>
                      - Choose the best saler based on the credentials <br/>
                      - Negotiate and close deals <br/>
                      - Execute the project on time <br/>
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <div className="efficient-image">
                    <SVG
                      className="image-efficient"
                      width="412px"
                      height="412px"
                      source={imageEfficient}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default withRouter(Landing);
