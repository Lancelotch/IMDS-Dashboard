import { Container, Grid, useTheme } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import ModalForm from 'src/components/ModalForm';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import FormRole from './components/Form';
import TableProduct from './components/Table';

const Product = () => {
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
        <title>Master - Product</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Product"
          onClick={handleClickCreateRole}
          labelButton="Create Product"
          subtitle="Definition of Product"
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
            <TableProduct />
          </Grid>
        </Grid>
      </Container>
      <Footer />
      <ModalForm title="Add Product" open={open} onClose={handleClose}>
        <FormRole />
      </ModalForm>
    </>
  );
};

export default Product;
