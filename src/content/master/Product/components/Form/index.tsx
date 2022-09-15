import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { FC, useEffect, useState } from 'react';
import {
  IPayloadAddProduct,
  IResponseAddRole,
  TTypeProduct
} from 'src/models/general';
import httpClient from 'src/services';
import { reducerUpdateAddRole } from 'src/redux/role';
import { useWidget } from 'src/services/widget/useWidget';

interface Props {
  onClose: () => void;
}

function validationSchema() {
  return Yup.object({
    isStaging: Yup.boolean().required(),
    productName: Yup.string().required(),
    type: Yup.string().required(),
    topic: Yup.string(),
    apiUrl: Yup.string(),
    widgetId: Yup.string()
  });
}

const types: Array<TTypeProduct> = ['widget', 'streaming', 'api'];

const FormProduct: FC<Props> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { getWidgetList } = useWidget();
  const widgetList = useAppSelector((state) => state.storeWidget.widgetList);
  useEffect(() => {
    getWidgetList({ page: 1, limit: 100 });
  }, []);
  const { handleChange, handleSubmit, errors, values, touched, setFieldValue } =
    useFormik<IPayloadAddProduct>({
      initialValues: {
        apiUrl: '',
        isStaging: false,
        productName: '',
        topic: '',
        type: 'widget',
        widgetId: ''
      },
      validationSchema: validationSchema(),
      onSubmit: async (value) => {
        setLoading(true);
        try {
          const response = await httpClient.post<IResponseAddRole>(
            '/product/create',
            value
          );
          if (response.status === 201) {
            dispatch(reducerUpdateAddRole(response.data.data));
          }
          setLoading(false);
          onClose();
        } catch (e) {
          console.log(e);
          setLoading(false);
          onClose();
        }
      }
    });

  const theme = useTheme();

  return (
    <Box sx={{ mt: theme.spacing(2) }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Product Name</FormLabel>
              <OutlinedInput
                name="productName"
                onChange={handleChange}
                error={errors.productName && touched.productName}
                value={values.productName}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.productName &&
                  touched.productName &&
                  errors.productName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Type</FormLabel>
              <Select
                value={values.type}
                onChange={handleChange}
                size="small"
                name="type"
              >
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.type && touched.type && errors.type}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Topic</FormLabel>
              <OutlinedInput
                name="topic"
                onChange={handleChange}
                error={errors.topic && touched.topic}
                value={values.topic}
                fullWidth
                size="small"
                disabled={values.type !== 'streaming'}
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.topic && touched.topic && errors.topic}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>API Url</FormLabel>
              <OutlinedInput
                name="apiUrl"
                onChange={handleChange}
                error={errors.apiUrl && touched.apiUrl}
                value={values.apiUrl}
                fullWidth
                size="small"
                disabled={values.type !== 'api'}
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.apiUrl && touched.apiUrl && errors.apiUrl}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Widget</FormLabel>
              <Select
                value={values.widgetId}
                onChange={handleChange}
                size="small"
                name="widgetId"
                disabled={values.type !== 'widget'}
              >
                {widgetList.data.map((widget) => (
                  <MenuItem key={widget.id} value={widget.widgetId}>
                    {widget.widgetName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.widgetId && touched.widgetId && errors.widgetId}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Is Staging</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isStaging"
                    value={values.isStaging}
                    onChange={handleChange}
                  />
                }
                label={values.isStaging ? 'Staging' : 'Not Staging'}
              />
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

export default FormProduct;