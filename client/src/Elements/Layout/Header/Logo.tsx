import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { spacing, red } from 'Utilities';

interface Props {}

const Logo: React.FC<Props> = () => (
  <Wrapper to='/'>
    <Icon className='fas fa-glass-martini-alt' />
    <Text>The Manhattan Project</Text>
  </Wrapper>
);

export default Logo;

const Wrapper = styled(Link)`
  display: flex;
  text-decoration: none;
`;

const Icon = styled.i`
  font-size: 25px;
  line-height: 50px;
  height: 50px;
  width: 50px !important;
  border-radius: 50%;
  background: ${red};

  @media screen and (min-width: 768px) {
    margin-right: ${spacing.sm};
  }
`;

const Text = styled.h1`
  margin: 0;
  font-size: 2rem;
  display: none;
  letter-spacing: 2px;

  @media screen and (min-width: 768px) {
    display: inline;
  }
`;