import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/app/hooks';
import { useAlert } from 'src/hooks/useAlert';
import {
 IPayloadAddCustomer,
 IPayloadGenerateToken,
 IResponseAddCustomer,
 IResponseCustomerById,
 IResponseCustomerList,
 IResponseGenerateToken
} from 'src/models/customer';
import { IPayloadGetList } from 'src/models/general';
import {
 reducerEditCustomer,
 reducerUpdateAddCustomer,
 reducerUpdateCustomerById,
 reducerUpdateCustomerList,
 reducerUpdateCustomerPackage,
 reducerUpdateLoadingCustomer
} from 'src/redux/customer';
import httpClient from '..';

export const useCustomer = () => {
 const { handleClickAlert } = useAlert();
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const addCustomer = async (payload: IPayloadAddCustomer) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.post<IResponseAddCustomer>(
    '/customer_v2/create',
    payload
   );
   if (response.status === 200) {
    dispatch(reducerUpdateAddCustomer(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Add customer has successfully',
     severity: 'success'
    });
   }
   navigate(window.location.pathname);
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed add Customer',
    severity: 'error'
   });
  } finally {
   dispatch(reducerUpdateLoadingCustomer(false));
  }
 };

 const generateToken = async (payload: IPayloadGenerateToken) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.post<IResponseGenerateToken>(
    '/customer_v2/generate_token',
    payload
   );
   if (response.status === 200) {
    dispatch(reducerUpdateCustomerPackage(response.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Generate token has successfully',
     severity: 'success'
    });
   }
  } catch (e) {
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed Generate token',
    severity: 'error'
   });
  } finally {
   dispatch(reducerUpdateLoadingCustomer(false));
  }
 };

 const deleteCustomer = async (id: string) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.put<IResponseAddCustomer>(
    `/customer_v2/delete/${id}`,
    {
     isActive: false
    }
   );
   if (response.status === 200) {
    dispatch(reducerEditCustomer(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Delete customer has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingCustomer(false));
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed delete Customer',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingCustomer(false));
  }
 };

 const deletesCustomers = async (customerIds: Array<string>) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.post(
    `/customer_v2/delete_multiple_customer`,
    {
     customerIds
    }
   );
   if (response.status === 200) {
    //dispatch(reducerEditCustomer(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Deletes customers has successfully',
     severity: 'success'
    });
   }
  } catch (e) {
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed deletes Customers',
    severity: 'error'
   });
  } finally {
   dispatch(reducerUpdateLoadingCustomer(false));
  }
 };

 const suspendPackage = async (customerPackageId: string) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.post(`/customer_v2/suspend`, {
    customerPackageId
   });
   if (response.status === 200) {
    //dispatch(reducerEditCustomer(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Deletes customer package has successfully',
     severity: 'success'
    });
   }
  } catch (e) {
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed deletes customer package',
    severity: 'error'
   });
  } finally {
   dispatch(reducerUpdateLoadingCustomer(false));
  }
 };

 const editCustomer = async (id: string, payload: IPayloadAddCustomer) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.put<IResponseAddCustomer>(
    `/customer_v2/update/${id}`,
    payload
   );
   if (response.status === 200) {
    dispatch(reducerEditCustomer(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Edit customer has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingCustomer(false));
   navigate(window.location.pathname);
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed edit Customer',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingCustomer(false));
  }
 };

 const getCustomerList = async (params: IPayloadGetList) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.get<IResponseCustomerList>(
    '/customer_v2/find_all',
    { params }
   );
   if (response.status === 200) {
    const list = response.data;
    dispatch(reducerUpdateCustomerList({ ...list, loading: false }));
   }
   dispatch(reducerUpdateLoadingCustomer(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingCustomer(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get Customer list',
    severity: 'error'
   });
  }
 };

 const getCustomerById = async (id: string) => {
  dispatch(reducerUpdateLoadingCustomer(true));
  try {
   const response = await httpClient.get<IResponseCustomerById>(
    `/customer_v2/find_by_customer_id/${id}`
   );
   if (response.status === 200) {
    const customer = response.data;
    dispatch(reducerUpdateCustomerById(customer.data));
   }
   dispatch(reducerUpdateLoadingCustomer(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingCustomer(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get Customer by id',
    severity: 'error'
   });
   navigate(window.location.pathname);
  }
 };

 const exportExel = async () => {
    dispatch(reducerUpdateLoadingCustomer(true));
    try {
     const response = await httpClient.get<IResponseAddCustomer>(
      `/customer_v2/download_exel`);
     if (response.status === 200) {
      dispatch(reducerEditCustomer(response.data.data));
      const responseDownload = response.data.data;
      window.open(`${responseDownload}`, "_blank");
      handleClickAlert({
       horizontal: 'center',
       vertical: 'top',
       message: 'Export Exel has successfully',
       severity: 'success'
      });
     }
     dispatch(reducerUpdateLoadingCustomer(false));
    } catch (e) {
     console.log(e);
     handleClickAlert({
      horizontal: 'center',
      vertical: 'top',
      message: 'Failed Export Exel',
      severity: 'error'
     });
     dispatch(reducerUpdateLoadingCustomer(false));
    }
   };

 return {
    exportExel,
  getCustomerList,
  addCustomer,
  editCustomer,
  deleteCustomer,
  getCustomerById,
  generateToken,
  deletesCustomers,
  suspendPackage
 };
};
