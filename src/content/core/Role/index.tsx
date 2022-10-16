import { Container, Grid } from '@mui/material';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from 'src/app/hooks';
import ContainerContent from 'src/components/ContainerContent';
import Footer from 'src/components/Footer';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { getValueParam } from 'src/hooks/useQueryUrl';
import FormRole from './components/FormRole';
import TableRole from './components/Table';
import TableMenuPermission from './components/TableMenuPermission';

const Role = () => {
 const action = getValueParam('action');
 const id = getValueParam('id');

 return (
  <>
   <Helmet>
    <title>Core - Role</title>
   </Helmet>
   <PageTitleWrapper>
    <PageHeader
     title="Role"
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
      {action === 'edit_menu_permission' ? (
       <TableMenuPermission />
      ) : action ? (
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

export default Role;
