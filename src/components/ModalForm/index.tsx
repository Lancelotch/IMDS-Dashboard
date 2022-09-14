import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #808080',
  boxShadow: 24,
  p: 4,
  borderRadius: 1
};

const ModalForm: React.FC<Props> = ({ title, open, onClose, children }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h4">{title}</Typography>
            <Divider sx={{ mt: 1 }} />
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalForm;
