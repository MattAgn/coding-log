import React from 'react';

const MainNumber = ({ children }) => {
  return <h1 style={numberStyle}>{children}</h1>;
};

const numberStyle = {
  fontSize: '20vmin',
  marginTop: '7%',
  marginBottom: 0
};

export default MainNumber;
