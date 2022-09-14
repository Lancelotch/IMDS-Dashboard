import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { FC } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  onClick: () => void;
  labelButton?: string;
}

const PageHeader: FC<Props> = ({ title, subtitle, onClick, labelButton }) => (
  <Grid container justifyContent="space-between" alignItems="center">
    <Grid item>
      <Typography variant="h3" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2">{subtitle}</Typography>
    </Grid>
    <Grid item>
      <Button
        sx={{ mt: { xs: 2, md: 0 } }}
        variant="contained"
        startIcon={<AddTwoToneIcon fontSize="small" />}
        onClick={onClick}
      >
        {labelButton}
      </Button>
    </Grid>
  </Grid>
);

export default PageHeader;
