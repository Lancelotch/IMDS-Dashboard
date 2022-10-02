import { Container, Grid, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ContainerContent from 'src/components/ContainerContent';
import Footer from 'src/components/Footer';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { getValueParam } from 'src/hooks/useQueryUrl';
import Form from './components/Form';
import TableProduct from './components/Table';

const Product = () => {
 const action = getValueParam('action');
 const id = getValueParam('id');

 const theme = useTheme();
 return (
  <>
   <Helmet>
    <title>Master - Product</title>
   </Helmet>
   <PageTitleWrapper>
    <PageHeader
     title="Product"
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
      {action ? (
       <ContainerContent>
        <Form action={action} id={id} />{' '}
       </ContainerContent>
      ) : (
       <TableProduct />
      )}
     </Grid>
    </Grid>
   </Container>
   <Footer />
  </>
 );
};

export default Product;
