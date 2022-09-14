import { Box, Container, Card } from '@mui/material';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Home() {
  return (
    <OverviewWrapper>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <Logo />
        </Box>
      </Container>
    </OverviewWrapper>
  );
}

export default Home;
