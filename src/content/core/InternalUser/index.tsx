import { Container, Grid, useTheme } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import ModalForm from 'src/components/ModalForm';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Form from './components/Form';
import Table from './components/Table';

const InternalUser = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickCreateRole = () => {
    handleOpen();
  };

  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>Core - Internal User</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Internal User"
          onClick={handleClickCreateRole}
          labelButton="Create Internal User"
          subtitle="Definition of Internal User"
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
            <Table />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <ModalForm title="Add Internal User" open={open} onClose={handleClose}>
        <Form onClose={handleClose} />
      </ModalForm>
    </>
  );
};

export default InternalUser;
