import {
 Button,
 FormControl,
 FormHelperText,
 FormLabel,
 Select,
 MenuItem,
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
import { IPayloadAddTopic ,TDataSource} from 'src/models/topic';
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';

interface Props {
 action: string;
 id?: string;
}

function validationSchema() {
 return Yup.object({
  topicName: Yup.string().required(),
  dataSource: Yup.string().required(),
 });
}


const types: Array<TDataSource> = ['data_source_mongo_1' , 'data_source_mongo_2' , 'data_source_mongo_3' , 'data_source_mongo_4'];

const FormTopic: FC<Props> = ({ action, id }) => {
 const { addTopic, editTopic, getTopicById } = useTopic();

 const {
  handleChange,
  handleSubmit,
  errors,
  values,
  touched,
  setFieldValue,
  resetForm
 } = useFormik<IPayloadAddTopic>({
  initialValues: {
   topicName: '',
   dataSource: '',
  },
  validationSchema: validationSchema(),
  onSubmit: async (value) => {
   if (action === 'create') {
    resetForm();
    addTopic(value);
    return;
   }
   editTopic(id, value);
  }
 });

 const theme = useTheme();


 const isFirstRender = useFirstRender();
 const { loading, topicById } = useAppSelector((store) => store.storeTopic);
 useEffect(() => {
  if (action === 'edit' && id) {
   getTopicById(id);
  }
 }, [action, id]);

 useEffect(() => {
  if (isFirstRender) return;
  if (action === 'edit' && topicById) {
   setFieldValue('topicName', topicById.topicName);
   setFieldValue('dataSource', topicById.dataSource);
  }
 }, [topicById]);

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
     <Grid item lg={6}>
      <FormControl fullWidth size="medium">
       <FormLabel>Data Source</FormLabel>
       <Select
        value={values.dataSource}
        onChange={(e) => {
         handleChange(e);
        }}
        size="small"
        name="dataSource"
       >
        {types.map((type) => (
         <MenuItem key={type} value={type}>
          {type}
         </MenuItem>
        ))}
       </Select>
       <FormHelperText error variant="outlined" margin="dense" sx={{ ml: 0 }}>
        {errors.dataSource && touched.dataSource && errors.dataSource}
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

export default FormTopic;
