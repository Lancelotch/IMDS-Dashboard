import {
  Card,
  Container,
  Grid,
  Modal,
  styled,
  Typography,
  useTheme
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import ModalForm from 'src/components/ModalForm';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FormTopic from './components/FormTopic';
import TableTopic from './components/Table';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4
};

const Topic = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickCreateTopic = () => {
    handleOpen();
  };

  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>Core - Topic</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Topic"
          onClick={handleClickCreateTopic}
          labelButton="Create Topic"
          subtitle="Permissions access to the system and access to specific functions"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TableTopic />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <ModalForm title="Add Topic" open={open} onClose={handleClose}>
        <FormTopic onClose={handleClose} />
      </ModalForm>
    </>
  );
};

export default Topic;
