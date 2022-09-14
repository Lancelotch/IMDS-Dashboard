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
import FormCustomer from './components/Form';
import Table from './components/Table';

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

const Customer = () => {
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
        <title>Master - Customer</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Customer"
          onClick={handleClickCreateRole}
          labelButton="Create Customer"
          subtitle="Definition of Customer"
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
      <ModalForm title="Add Customer" open={open} onClose={handleClose}>
        <FormCustomer />
      </ModalForm>
    </>
  );
};

export default Customer;
