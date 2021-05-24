import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';
import { get } from 'lodash';

import checkAuth from './../../helper/redirections';
import SVG from './../../helper/customizeIcon';

import imageLogo from './../../assets/images/logo.svg';
import imageAvatar from './../../assets/images/avatar.svg';

import './header.sass';

const Header = props => {

  const handleLogOut = () => localStorage.setItem('token', JSON.stringify(null));
  
  const isAuth = checkAuth();

  const links = [
    {
      title: 'Home',
      route: '/'
    },
    {
      title: isAuth ? 'Log In / Sign Up' : 'Log Out',
      route: isAuth ? '/login' : '/'
    }
  ];

  const resolveOnClickLink = title => {
    switch(title) {
    case 'Log Out':
      handleLogOut();
      break;
    default:
      break;
    }
  }

  const history = get(props, 'history');

  //console.log('props Header', props);
  return (
    <div className="wrapper-header">
      <Grid container spacing={0} justify="center">
        <Grid item xs={10} sm={10} className="container-header">
          <Grid item xs={10} sm={10} className="container-info">
            <Grid item xs={2} sm={2} className="container-info-logo">
              <SVG 
                className='info-logo' 
                width='64px' 
                height='64px'
                source={imageLogo}
              />
            </Grid>
            <Grid item xs={4} sm={4} className="container-info-title">
              <Typography className='info-title'>
                  Get Offers
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={8} sm={8} className="container-link">
            {
              links.map(item => {
                return (
                  <Link
                    to={item.route}
                    className='link'
                    onClick={() => resolveOnClickLink(item.title)}
                  >
                    <Typography className='link-title'>
                      {item.title}
                    </Typography>
                  </Link>
                );
              })
            }
            {
              !isAuth && (
                <SVG 
                  className='link-avatar'
                  width='48px' 
                  height='48px'
                  source={imageAvatar}
                />
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Header);