import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <div className="FooterParent">
      <footer class="py-5 my-5 bg-secondary text-center">
          <Container className="px-4">
              <p class="text-center text-white">
                  Copyright &copy; Mint Portfolio 2023</p>
          </Container>
      </footer>
    </div>
  );
}

export default Footer;