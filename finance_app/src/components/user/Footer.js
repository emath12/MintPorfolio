import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter bgColor='dark-green' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          Portfolio Builder
      </div>
    </MDBFooter>
  );
}

export default Footer;