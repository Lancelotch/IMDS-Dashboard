import { Card, Container, Grid, styled } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageHeader from 'src/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TableRole from './components/Table';

const MainContent = styled(Box)(
  ({ theme }) => `
      padding: ${theme.spacing(3)}
  `
);

const Role = () => {
  const handleClickCreateRole = () => {};
  return (
    <>
      <Helmet>
        <title>Core - Role</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title="Role"
          onClick={handleClickCreateRole}
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
            <TableRole />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Role;
