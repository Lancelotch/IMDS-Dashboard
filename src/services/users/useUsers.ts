import { useAppDispatch } from 'src/app/hooks';
import { useAlert } from 'src/hooks/useAlert';
import { IPayloadLogin, IResponseLogin } from 'src/models/userCredentials';
import {
 reducerUpdateAuthentication,
 reducerUpdateUserProfile
} from 'src/redux/users';
import httpClient from '..';

export const useUsers = () => {
 const { handleClickAlert } = useAlert();
 const dispatch = useAppDispatch();
 const postUserSignin = async (payload: IPayloadLogin) => {
  try {
   const response = await httpClient.post<IResponseLogin>(
    '/auth/login',
    payload
   );
   if (response.status === 200) {
    const user = response.data.data;
    const token = response.data.token;
    const isAuth = token ? true : false;
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
    dispatch(reducerUpdateUserProfile(user));
    dispatch(reducerUpdateAuthentication(isAuth));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Signin has successfully',
     severity: 'success'
    });
   }
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'username or password incorrect',
    severity: 'error'
   });
  }
 };
 const signOut = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('roleId');
  dispatch(reducerUpdateAuthentication(false));
 };
 return { postUserSignin, signOut };
};
