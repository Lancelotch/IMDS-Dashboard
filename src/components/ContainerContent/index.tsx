import { Paper, styled } from '@mui/material';

const ContainerPaper = styled(Paper)(
 ({ theme }) => `
       padding: ${theme.spacing(2)}
   `
);

const ContainerContent = ({ children }) => {
 return <ContainerPaper>{children}</ContainerPaper>;
};

export default ContainerContent;
