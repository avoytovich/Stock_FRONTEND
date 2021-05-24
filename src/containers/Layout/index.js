import React from 'react';
import { withRouter } from 'react-router-dom';

import { Header, Footer } from './../../components';

const Layout = props => {
  // console.log('props Layout', props);

  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  );
};

export default withRouter(Layout);
