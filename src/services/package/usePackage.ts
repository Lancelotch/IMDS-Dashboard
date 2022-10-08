import { useNavigate } from 'react-router';
import { useAppDispatch } from 'src/app/hooks';
import { useAlert } from 'src/hooks/useAlert';
import { IPayloadGetList } from 'src/models/general';
import {
 IPayloadAddPackage,
 IResponseAddPackage,
 IResponsePackageById,
 IResponsePackageList
} from 'src/models/package';
import {
 reducerEditPackage,
 reducerUpdateAddPackage,
 reducerUpdateLoadingPackage,
 reducerUpdatePackageById,
 reducerUpdatePackageList
} from 'src/redux/package';
import httpClient from '..';

export const usePackage = () => {
 const { handleClickAlert } = useAlert();
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const addPackage = async (payload: IPayloadAddPackage) => {
  dispatch(reducerUpdateLoadingPackage(true));
  try {
   const response = await httpClient.post<IResponseAddPackage>(
    '/package/create',
    payload
   );
   if (response.status === 201) {
    dispatch(reducerUpdateAddPackage(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Add Package has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingPackage(false));
   navigate(window.location.pathname);
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed add Internal User',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingPackage(false));
  }
 };

 const deletePackage = async (id: string) => {
  dispatch(reducerUpdateLoadingPackage(true));
  try {
   const response = await httpClient.put<IResponseAddPackage>(
    `/package/delete/${id}`,
    {
     isActive: false
    }
   );
   if (response.status === 201) {
    dispatch(reducerEditPackage(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Delete Package has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingPackage(false));
  } catch (e) {
   console.log(e);
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed delete Internal User',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingPackage(false));
  }
 };

 const editPackage = async (id: string, payload: IPayloadAddPackage) => {
  dispatch(reducerUpdateLoadingPackage(true));
  try {
   const response = await httpClient.put<IResponseAddPackage>(
    `/package/update/${id}`,
    payload
   );
   if (response.status === 201) {
    dispatch(reducerEditPackage(response.data.data));
    handleClickAlert({
     horizontal: 'center',
     vertical: 'top',
     message: 'Edit Package has successfully',
     severity: 'success'
    });
   }
   dispatch(reducerUpdateLoadingPackage(false));
   navigate(window.location.pathname);
  } catch (e) {
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'Failed edit Internal User',
    severity: 'error'
   });
   dispatch(reducerUpdateLoadingPackage(false));
  }
 };

 const getPackageList = async (params: IPayloadGetList) => {
  dispatch(reducerUpdateLoadingPackage(true));
  try {
   const response = await httpClient.get<IResponsePackageList>(
    '/package/find_all',
    { params }
   );
   if (response.status === 200) {
    const PackageList = response.data;
    dispatch(reducerUpdatePackageList({ ...PackageList, loading: false }));
   }
   dispatch(reducerUpdateLoadingPackage(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingPackage(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get Package list',
    severity: 'error'
   });
  }
 };

 const getPackageById = async (id: string) => {
  dispatch(reducerUpdateLoadingPackage(true));
  try {
   const response = await httpClient.get<IResponsePackageById>(
    `/package/find_by_Package_id/${id}`
   );
   if (response.status === 200) {
    const Package = response.data;
    dispatch(reducerUpdatePackageById(Package.data));
   }
   dispatch(reducerUpdateLoadingPackage(false));
  } catch (e) {
   dispatch(reducerUpdateLoadingPackage(false));
   handleClickAlert({
    horizontal: 'center',
    vertical: 'top',
    message: 'cannot get Package by id',
    severity: 'error'
   });
   navigate(window.location.pathname);
  }
 };
 return {
  getPackageList,
  addPackage,
  editPackage,
  deletePackage,
  getPackageById
 };
};
