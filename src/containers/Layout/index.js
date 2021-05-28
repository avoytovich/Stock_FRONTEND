import React from 'react';
import { withRouter } from 'react-router-dom';

import { Header, Footer } from './../../components';

import './layout.sass';

const Layout = props => {
  // console.log('props Layout', props);

  return (
    <React.Fragment>
      <Header />
      <div className="container-layout">
        {props.children}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(Layout);
