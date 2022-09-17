import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/app/hooks';
import { useRole } from 'src/services/role/useRole';
import { FC, useEffect, useState } from 'react';
import { IPayloadAddInternalUser } from 'src/models/general';
import { useInternalUser } from 'src/services/internal_user/useInternalUser';
import { useFirstRender } from 'src/hooks/useFirstRender';

interface Props {
  onClose: () => void;
}

function validationSchema() {
  return Yup.object({
    username: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    password: Yup.string().required(),
    roleId: Yup.string().required()
  });
}

const FormInternalUser: FC<Props> = ({ onClose }) => {
  const { addInternalUser } = useInternalUser();
  const { getRoleList } = useRole();
  const isFirstRender = useFirstRender();
  const loading = useAppSelector((state) => state.storeInternalUser.loading);
  const roleList = useAppSelector((state) => state.storeRole.roleList);
  const { handleChange, handleSubmit, errors, values, touched, setFieldValue } =
    useFormik<IPayloadAddInternalUser>({
      initialValues: {
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        roleId: ''
      },
      validationSchema: validationSchema(),
      onSubmit: async (value) => {
        addInternalUser(value);
      }
    });

  const theme = useTheme();

  useEffect(() => {
    getRoleList({ page: 1, limit: 1000 });
  }, []);

  useEffect(() => {
    if (isFirstRender) return;
    if (!loading) onClose();
  }, [loading]);

  return (
    <Box sx={{ mt: theme.spacing(2) }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Username</FormLabel>
              <OutlinedInput
                name="username"
                onChange={handleChange}
                error={errors.username && touched.username}
                value={values.username}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.username && touched.username && errors.username}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Password</FormLabel>
              <OutlinedInput
                name="password"
                onChange={handleChange}
                error={errors.password && touched.password}
                value={values.password}
                fullWidth
                size="small"
                autoComplete="new-password"
                inputProps={{
                  type: 'password',
                  autoComplete: 'new-password'
                }}
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.password && touched.password && errors.password}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>First Name</FormLabel>
              <OutlinedInput
                name="firstName"
                onChange={handleChange}
                error={errors.firstName && touched.firstName}
                value={values.firstName}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.firstName && touched.firstName && errors.firstName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Last Name</FormLabel>
              <OutlinedInput
                name="lastName"
                onChange={handleChange}
                error={errors.lastName && touched.lastName}
                value={values.lastName}
                fullWidth
                size="small"
              />
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.lastName && touched.lastName && errors.lastName}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <FormControl fullWidth size="medium">
              <FormLabel>Role</FormLabel>
              <Select
                value={values.roleId}
                onChange={handleChange}
                size="small"
                name="roleId"
              >
                {roleList.data.map((role) => (
                  <MenuItem key={role.id} value={role.roleId}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error
                variant="outlined"
                margin="dense"
                sx={{ ml: 0 }}
              >
                {errors.roleId && touched.roleId && errors.roleId}
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

export default FormInternalUser;
