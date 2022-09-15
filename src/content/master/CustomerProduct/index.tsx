import { Container, Grid, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import ModalForm from 'src/components/ModalForm';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FormRole from './components/Form';
import Table from './components/Table';

const CustomerProduct = () => {
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
        <title>Master - Customer Product</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Customer Product"
          onClick={handleClickCreateRole}
          labelButton="Create Customer Product"
          subtitle="Definition of Customer Product"
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
      <ModalForm title="Add Customer Product" open={open} onClose={handleClose}>
        <FormRole onClose={handleClose} />
      </ModalForm>
    </>
  );
};

export default CustomerProduct;
