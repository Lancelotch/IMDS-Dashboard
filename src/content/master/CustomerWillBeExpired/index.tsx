import { Container, Grid, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ContainerContent from 'src/components/ContainerContent';
import Footer from 'src/components/Footer';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { getValueParam } from 'src/hooks/useQueryUrl';
//import FormCustomerWillBeExpired from './components/FormCustomerWillBeExpired';
import TableTopic from './components/Table';

const Topic = () => {
 const action = getValueParam('action');
 const id = getValueParam('id');

 const theme = useTheme();
 return (
  <>
   <Helmet>
    <title>Master - Customer Wiil Be Expire</title>
   </Helmet>
   <PageTitleWrapper>
    <PageHeader
     title="Customer Wiil Be Expire"
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
      {action ? (
       <ContainerContent>
       
       </ContainerContent>
      ) : (
       <TableTopic />
      )}
     </Grid>
    </Grid>
   </Container>
   <Footer />
  </>
 );
};

export default Topic;
