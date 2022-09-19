import {
 Button,
 FormControl,
 FormHelperText,
 FormLabel,
 Grid,
 OutlinedInput,
 useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { useTopic } from 'src/services/topic/useTopic';
import { FC, useEffect } from 'react';
import { useFirstRender } from 'src/hooks/useFirstRender';
import { IPayloadAddTopic, ITopic } from 'src/models/topic';

interface Props {
 onClose: () => void;
 initFormValue?: ITopic;
}

function validationSchema() {
 return Yup.object({
  topicName: Yup.string().required()
 });
}

const FormTopicEdit: FC<Props> = ({ onClose, initFormValue }) => {
 const { editTopic } = useTopic();

 const { handleChange, handleSubmit, errors, values, touched } =
  useFormik<IPayloadAddTopic>({
   initialValues: {
    topicName: initFormValue.topicName
   },
   validationSchema: validationSchema(),
   onSubmit: async (value) => {
    editTopic(initFormValue.topicId, value);
   }
  });

 const theme = useTheme();

 const isFirstRender = useFirstRender();
 const loading = useAppSelector((store) => store.storeTopic.loading);
 useEffect(() => {
  if (isFirstRender) return;
  if (!loading) onClose();
 }, [loading]);

 return (
  <Box sx={{ mt: theme.spacing(2) }}>
   <form onSubmit={handleSubmit}>
    <Grid container spacing={2}>
     <Grid item lg={12}>
      <FormControl fullWidth size="medium">
       <FormLabel>Name</FormLabel>
       <OutlinedInput
        name="topicName"
        onChange={handleChange}
        error={errors.topicName && touched.topicName}
        value={values.topicName}
        fullWidth
        size="small"
       />
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.topicName && touched.topicName && errors.topicName}
       </FormHelperText>
      </FormControl>
     </Grid>
     <Grid item lg={12}>
      <Box
       sx={{
        display: 'flex',
        justifyContent: 'center'
       }}
      >
       <Button
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        sx={{
         mt: 2,
         px: 8
        }}
        disabled={loading}
       >
        Done
       </Button>
      </Box>
     </Grid>
    </Grid>
   </form>
  </Box>
 );
};

export default FormTopicEdit;
