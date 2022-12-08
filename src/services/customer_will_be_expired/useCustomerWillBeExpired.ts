import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/app/hooks';
import { useAlert } from 'src/hooks/useAlert';
import { IPayloadGetList } from 'src/models/general';
import {
 IPayloadAddCustomerWillBeExpired,
 IResponseAddCustomerWillBeExpired,
 IResponseCustomerWillBeExpiredById,
 IResponseCustomerWillBeExpiredList
} from 'src/models/customerWillBeExpired';
import {
    reducerUpdateLoadingCustomerWillBeExpired,
    reducerUpdateCustomerWillBeExpiredById,
    reducerUpdateCustomerWillBeExpiredList
} from 'src/redux/customerWillBeExpired';
import httpClient from '..';

export const useCustomerWillBeExpired = () => {
 const { handleClickAlert } = useAlert();
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 
 const getCustomerWillBeExpiredList = async (params: IPayloadGetList) => {
  try {
   const response = await httpClient.get<IResponseCustomerWillBeExpiredList>(
    '/customer_v2/customer_package_will_be_expireds',
    { params }
   );
   if (response.status === 200) {
    const customerWillBeExpiredList = response.data;
    dispatch(reducerUpdateCustomerWillBeExpiredList({ ...customerWillBeExpiredList, loading: false }));
   }
  } catch (e) {
   dispatch(reducerUpdateLoadingCustomerWillBeExpired(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get customer list',
    severity: 'error'
   });
  }
 };

 const getCustomerWillBeExpiredById = async (id: string) => {
  dispatch(reducerUpdateLoadingCustomerWillBeExpired(true));
  try {
   const response = await httpClient.get<IResponseCustomerWillBeExpiredById>(
    `/customer_v2/find_by_customerWillBeExpired_id/${id}`
   );
   if (response.status === 200) {
    const customerWillBeExpired = response.data;
    dispatch(reducerUpdateCustomerWillBeExpiredById(customerWillBeExpired.data));
   }
   dispatch(reducerUpdateLoadingCustomerWillBeExpired(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingCustomerWillBeExpired(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get CustomerWillBeExpired by id',
    severity: 'error'
   });
   navigate(window.location.pathname);
  }
 };
 return { getCustomerWillBeExpiredList , getCustomerWillBeExpiredById };
};
