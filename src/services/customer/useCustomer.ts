import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadAddCustomer, IPayloadGetList, IResponseAddCustomer, IResponseCustomerList,  } from "src/models/general"
import { reducerEditCustomer, reducerUpdateAddCustomer, reducerUpdateCustomerList, reducerUpdateLoadingCustomer } from "src/redux/customer";
import httpClient from "..";

export const useCustomer = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addCustomer =async (payload:IPayloadAddCustomer) => {
        dispatch(reducerUpdateLoadingCustomer(true));
        try {
            const response = await httpClient.post<IResponseAddCustomer>(
              '/customer/create',
              payload
            );
            if (response.status === 201) {
              dispatch(reducerUpdateAddCustomer(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Add customer has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingCustomer(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed add Customer',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingCustomer(false));
          }
    }
    
    const deleteCustomer =async (id:string) => {
        dispatch(reducerUpdateLoadingCustomer(true));
        try {
            const response = await httpClient.put<IResponseAddCustomer>(
              `/customer/delete/${id}`,
              {
                isActive: false
              }
            );
            if (response.status === 201) {
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
    }
    
    const editCustomer =async (id:string, payload: IPayloadAddCustomer) => {
        dispatch(reducerUpdateLoadingCustomer(true));
        try {
            const response = await httpClient.put<IResponseAddCustomer>(
              `/customer/update/${id}`,payload
            );
            if (response.status === 201) {
              dispatch(reducerEditCustomer(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Edit customer has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingCustomer(false));
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
    }

    const getCustomerList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingCustomer(true));
        try{
            const response = await httpClient.get<IResponseCustomerList>('/customer/find_all', {params});
            if(response.status === 200){
                const list = response.data;
                dispatch(reducerUpdateCustomerList({...list, loading: false}));
            }
            dispatch(reducerUpdateLoadingCustomer(false));
        }catch(e){
            dispatch(reducerUpdateLoadingCustomer(false));
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get role list',
                severity: 'error'
              });
        }
         
    }
    return { getCustomerList, addCustomer, editCustomer, deleteCustomer };
}