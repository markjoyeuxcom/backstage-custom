import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 28,
  },
  path: {
    fill: '#7df3e1',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <svg
      className={classes.svg}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
    >
      <text
        className={classes.path}
        x="5"
        y="30"
        fontSize="28"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        B
      </text>
    </svg>
  );
};

export default LogoIcon;
