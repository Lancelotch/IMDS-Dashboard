import React from 'react';
import emptyIcon from 'src/assets/image/icon-widget-empty.svg';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import useStyles from './styles';

interface Props {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Empty: React.FC<Props> = ({ message = '', size = 'medium' }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img
        src={emptyIcon}
        alt="empty"
        className={clsx({
          [classes.small]: size === 'small',
          [classes.medium]: size === 'medium',
          [classes.large]: size === 'large'
        })}
      />
      {message.length > 0 && (
        <Typography variant="subtitle1">{message}</Typography>
      )}
    </div>
  );
};

export default Empty;
