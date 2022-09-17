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
import { IPayloadAddRole, IRole } from 'src/models/general';
import { useRole } from 'src/services/role/useRole';
import { FC, useEffect } from 'react';
import { useFirstRender } from 'src/hooks/useFirstRender';

interface Props {
  onClose: () => void;
  initFormValue?: IRole;
}

function validationSchema() {
  return Yup.object({
    roleName: Yup.string().required()
  });
}

const FormRoleEdit: FC<Props> = ({ onClose, initFormValue }) => {
  const { editRole } = useRole();

  const { handleChange, handleSubmit, errors, values, touched } =
    useFormik<IPayloadAddRole>({
      initialValues: {
        roleName: initFormValue.roleName
      },
      validationSchema: validationSchema(),
      onSubmit: async (value) => {
        editRole(initFormValue.roleId, value);
      }
    });

  const theme = useTheme();

  const isFirstRender = useFirstRender();
  const loading = useAppSelector((store) => store.storeRole.loading);
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
                name="roleName"
                onChange={handleChange}
                error={errors.roleName && touched.roleName}
                value={values.roleName}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.roleName && touched.roleName && errors.roleName}
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

export default FormRoleEdit;
