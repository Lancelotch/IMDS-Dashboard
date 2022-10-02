import { Container, Grid, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ContainerContent from 'src/components/ContainerContent';
import Footer from 'src/components/Footer';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { getValueParam } from 'src/hooks/useQueryUrl';
import Table from './components/Table';
import Form from './components/Form';

const Customer = () => {
 const action = getValueParam('action');
 const id = getValueParam('id');

 const theme = useTheme();
 return (
  <>
   <Helmet>
    <title>Master - Customer</title>
   </Helmet>
   <PageTitleWrapper>
    <PageHeader
     title="Customer"
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
      {action ? (
       <ContainerContent>
        <Form action={action} id={id} />{' '}
       </ContainerContent>
      ) : (
       <Table />
      )}
     </Grid>
    </Grid>
   </Container>
   <Footer />
  </>
 );
};

export default Customer;
