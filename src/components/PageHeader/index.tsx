import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FC } from 'react';
import { getValueParam } from 'src/hooks/useQueryUrl';
import { useNavigate } from 'react-router';
import firstWordToUpperCase from 'src/utils/firstWordToUppercase';
import changeUnderscoresToSpaces from 'src/utils/changeUnderscoresToSpaces';

interface Props {
 title: string;
 subtitle?: string;
 labelButton?: string;
}

const PageHeader: FC<Props> = ({ title, subtitle, labelButton }) => {
 const action = getValueParam('action');
 const navigate = useNavigate();
 const handleCreate = function () {
  navigate(`${window.location.pathname}?action=create`);
 };
 const handleBack = function () {
  navigate(window.location.pathname);
 };
 return (
  <Grid container justifyContent="space-between" alignItems="center">
   <Grid item>
    <Typography variant="h3" component="h3" gutterBottom>
     {action
      ? `${changeUnderscoresToSpaces(firstWordToUpperCase(action))} ${title}`
      : title}
    </Typography>
    <Typography variant="subtitle2">{subtitle}</Typography>
   </Grid>
   <Grid item>
    {action ? (
     <Button
      sx={{ mt: { xs: 2, md: 0 } }}
      variant="outlined"
      startIcon={<KeyboardBackspaceIcon fontSize="small" />}
      onClick={handleBack}
     >
      Back
     </Button>
    ) : (
     <Button
      sx={{ mt: { xs: 2, md: 0 } }}
      variant="contained"
      startIcon={<AddTwoToneIcon fontSize="small" />}
      onClick={handleCreate}
     >
      {labelButton}
     </Button>
    )}
   </Grid>
  </Grid>
 );
};

export default PageHeader;
