import {
  Button,
  Dialog,
  DialogActions,
  IconButton,
  useTheme,
  Breakpoint,
  Typography,
  Stack
} from '@mui/material';
import { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';

export interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  labelButton: string;
  message: string | React.ReactNode;
  onOk: () => void;
  loading?: boolean;
  maxWidth?: Breakpoint;
}

const Confirmation: FC<Props> = ({
  open,
  onClose,
  title,
  labelButton,
  message,
  onOk,
  loading,
  maxWidth = 'md'
}) => {
  const theme = useTheme();
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ padding: theme.spacing(4) }}
      maxWidth={maxWidth}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ p: theme.spacing(8, 8, 4, 8) }}>
        <Typography variant="h3">{title}</Typography>
        <Box sx={{ my: theme.spacing(2) }} />
        <Typography variant="subtitle1">{message}</Typography>
      </Box>
      <Stack
        sx={{ p: theme.spacing(0, 8, 3, 8) }}
        spacing={2}
        direction="row"
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            onClose();
          }}
          disabled={loading}
          size="large"
          sx={{ px: theme.spacing(4) }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onClose();
            onOk();
          }}
          disabled={loading}
          size="large"
          sx={{ px: theme.spacing(4) }}
        >
          {labelButton}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default Confirmation;
