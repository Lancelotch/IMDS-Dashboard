import { Theme, Tooltip, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import React from 'react';

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    width: 'inherit'
  }
}))(Tooltip);

interface Props {
  title?: string;
  children?: any;
  placement?:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | undefined;
}

const TooltipCustomize: React.FC<Props> = ({
  children,
  title,
  placement = 'left'
}) => {
  return (
    <HtmlTooltip
      arrow
      placement={placement}
      title={
        <React.Fragment>
          <Typography color="inherit">{title}</Typography>
        </React.Fragment>
      }
    >
      {children}
    </HtmlTooltip>
  );
};

export default TooltipCustomize;
