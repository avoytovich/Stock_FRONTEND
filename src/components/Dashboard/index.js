import React from 'react';
import { Grid, Paper, Tabs, Tab, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Layout } from './../../containers';
import connect from './../../utils/connectFunction';
import action from './../../utils/actions';

import imageMower from './../../assets/images/mower.jpg';
import SVG from '../../helper/customizeIcon';

import './dashboard.sass';

const mockAllRequests = [
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'accepted',
    photo: imageMower,
    isActive: true,
    UserId: 16,
  },
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'in_progress',
    photo: imageMower,
    isActive: true,
    UserId: 17,
  },
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'in_progress',
    photo: imageMower,
    isActive: true,
    UserId: 17,
  },
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'in_progress',
    photo: imageMower,
    isActive: true,
    UserId: 17,
  },
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'in_progress',
    photo: imageMower,
    isActive: true,
    UserId: 17,
  },
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'in_progress',
    photo: imageMower,
    isActive: true,
    UserId: 17,
  },
  {
    title: 'mower',
    preferred_price: '170$',
    description: 'new, manual, with extra tools',
    status: 'in_progress',
    photo: imageMower,
    isActive: true,
    UserId: 17,
  },
];

const mockAvailableBid = [
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    preferred_contact: 'bid@ukr.net',
    UserId: 16,
    AskId: 1,
  },
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    color: '#5d5d5d',
  },
});

const Dashboard = props => {
  console.log('Dashboard props', props);

  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const resolveBackGroundColor = status => {
    switch(status) {
    case "in_progress":
      return "orange";
    case "freeze":
      return "red";
    case "accepted":
      return "green";
    }
  };

  const isUserId = userId => (props.store.userId === userId);

  return (
    <Layout>
      <div className="wrapper-dashboard">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <div className="container-dashboard">
              <div className="dashboard-tabs">
                <Paper className={classes.root}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                  >
                    <Tab label="ALL REQUESTS" />
                    <Tab label="YOUR REQUESTS" />
                    <Tab label="YOUR PROPOSALS" />
                  </Tabs>
                </Paper>
              </div>
              <div className="dashboard-list">
                {mockAllRequests.map(item => (
                  <div
                    className="list-item"
                    style={{
                      backgroundColor: resolveBackGroundColor(item.status),
                    }}
                  >
                    <SVG
                      className="item-image"
                      width="256px"
                      height="256px"
                      source={item.photo}
                    />
                    <div className="item-title">
                      <div className="title-key">ask:</div>
                      <div className="title-value">{item.title.toLocaleUpperCase()}</div>
                    </div>
                    <div className="item-preferred_price">
                      <div className="preferred_price-key">preferred price:</div>
                      <div className="preferred_price-value">{item.preferred_price}</div>
                    </div>
                    <div className="item-description">
                      <div className="description-key">description:</div>
                      <div className="description-value">{item.description}</div>
                    </div>
                    <div className="item-status">
                      <div className="status-key">status:</div>
                      <div className="status-value">{item.status}</div>
                    </div>
                    <div className="item-bid">
                      {isUserId(item.UserId) &&
                        (
                          <>
                            <div className='bid-action'>
                              <Typography className='action-title'>
                                available Actions:
                              </Typography>
                              <div className='action-content'>
                                <Button variant="outlined" color="secondary">
                                  DELETE
                                </Button>
                                <Button variant="outlined" color="secondary">
                                  DELETE
                                </Button>
                                <Button variant="outlined" color="secondary">
                                  DELETE
                                </Button>
                              </div>
                            </div>
                            <div className='bid-available'>
                              {
                                mockAvailableBid.map((item, id) => (
                                  <Button variant="outlined" color="primary">
                                    OFFER-{++id}
                                  </Button>
                                ))
                              }
                            </div>
                          </>
                        )
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => {
  return { store: state };
};

const mapDispatchToProps = dispatch => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchRemoveTitle: actionData,
    dispatchChangedSelectedMenuItem: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
