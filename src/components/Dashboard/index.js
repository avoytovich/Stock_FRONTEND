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
    UserId: 16,
  },
];

const mockAvailableBid = [
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    status: 'accepted',
    requested_contact: 'email@email.com',
    photo: imageMower,
    UserId: 16,
    AskId: 1,
  },
  {
    title: 'mower',
    offered_price: '175$',
    deadline: '2 days',
    payment_in_advance: true,
    status: 'in_progress',
    requested_contact: '',
    photo: imageMower,
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
  // console.log('Dashboard props', props);

  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => setValue(newValue);

  const resolveBackGroundColor = status => {
    switch (status) {
    case 'in_progress':
      return 'orange';
    case 'accepted':
      return 'green';
    }
  };

  const isUserId = userId => props.store.userId === userId;

  const yourRequests = mockAllRequests.filter(item => isUserId(item.UserId));
  const otherRequests = mockAllRequests.filter(item => !isUserId(item.UserId));

  const renderYourRequests = () =>
    yourRequests.map(item => (
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
          <div className="bid-action">
            <Typography className="action-title">Actions:</Typography>
            <div className="action-content">
              <Button variant="outlined" color="secondary">
                DELETE
              </Button>
              <Button variant="outlined" color="primary">
                GET OFFERS
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderOtherRequests = () =>
    otherRequests.map(item => (
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
          <div className="bid-action">
            <Typography className="action-title">Actions:</Typography>
            <div className="action-content">
              <Button variant="outlined" color="primary">
                BID
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderYourBid = () =>
    mockAvailableBid.map(item => (
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
          <div className="title-key">bid:</div>
          <div className="title-value">{item.title.toLocaleUpperCase()}</div>
        </div>
        <div className="item-offered_price">
          <div className="offered_price-key">offered price:</div>
          <div className="offered_price-value">{item.offered_price}</div>
        </div>
        <div className="item-deadline">
          <div className="deadline-key">deadline:</div>
          <div className="deadline-value">{item.deadline}</div>
        </div>
        <div className="item-payment">
          <div className="payment-key">payment in advance:</div>
          <div className="payment-value">
            {item.payment_in_advance ? 'yes' : 'no'}
          </div>
        </div>
        <div className="item-status">
          <div className="status-key">status:</div>
          <div className="status-value">{item.status}</div>
        </div>
        <div className="item-bid">
          <div className="bid-action">
            <Typography className="action-title">
              Contact of the interested person:
            </Typography>
            <div className="action-content">
              <Typography className="content-text">
                {item.requested_contact || 'not accepted yet'}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderRequests = tab => {
    switch (tab) {
    case 0:
      return renderYourRequests();
    case 1:
      return renderOtherRequests();
    case 2:
      return renderYourBid();
    default:
      return renderYourRequests();
    }
  };

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
                    <Tab label="YOUR REQUESTS" />
                    <Tab label="OTHER REQUESTS" />
                    <Tab label="YOUR BIDS" />
                  </Tabs>
                </Paper>
              </div>
              <div className="dashboard-list">{renderRequests(value)}</div>
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
    // dispatchRemoveTitle: actionData,
    // dispatchChangedSelectedMenuItem: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
