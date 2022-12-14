import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ContainerContent from 'src/components/ContainerContent';
import Footer from 'src/components/Footer';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { getValueParam } from 'src/hooks/useQueryUrl';
import FormRole from './components/FormRole';
import TableRole from './components/Table';

const RoleMenu = () => {
 const action = getValueParam('action');
 const id = getValueParam('id');

 return (
  <>
   <Helmet>
    <title>Core - Role</title>
   </Helmet>
   <PageTitleWrapper>
    <PageHeader
     title="Edit Role Menu Permission"
     labelButton="Create Role"
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
        <FormRole action={action} id={id} />{' '}
       </ContainerContent>
      ) : (
       <TableRole />
      )}
     </Grid>
    </Grid>
   </Container>
   <Footer />
  </>
 );
};

export default RoleMenu;
