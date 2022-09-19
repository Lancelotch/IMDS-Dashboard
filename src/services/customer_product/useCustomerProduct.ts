import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadAddCustomerProduct, IResponseAddCustomerProduct, IResponseCustomerProductList } from "src/models/customerProduct";
import { IPayloadGetList } from "src/models/general"
import { reducerEditCustomerProduct, reducerUpdateAddCustomerProduct, reducerUpdateCustomerProductList, reducerUpdateLoadingCustomerProduct } from "src/redux/customerProduct";
import httpClient from "..";

export const useCustomerProduct = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addCustomerProduct =async (payload:IPayloadAddCustomerProduct) => {
        dispatch(reducerUpdateLoadingCustomerProduct(true));
        try {
            const response = await httpClient.post<IResponseAddCustomerProduct>(
              '/customer_product/create',
              payload
            );
            if (response.status === 201) {
              dispatch(reducerUpdateAddCustomerProduct(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Add customer product user has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingCustomerProduct(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed add Customer Product',
                severity: 'error'
              });
            dispatch(reducerUpdateLoadingCustomerProduct(false));
          }
    }

    const deleteCustomerProduct =async (id:string) => {
      dispatch(reducerUpdateLoadingCustomerProduct(true));
      try {
          const response = await httpClient.put<IResponseAddCustomerProduct>(
            `/customer_product/delete/${id}`,
            {
              isActive: false
            }
          );
          if (response.status === 201) {
            dispatch(reducerEditCustomerProduct(response.data.data));
            handleClickAlert({
              horizontal: 'center',
              vertical: 'top',
              message: 'Delete customer product user has successfully',
              severity: 'success'
            });
          }
          dispatch(reducerUpdateLoadingCustomerProduct(false));
        } catch (e) {
          console.log(e);
          handleClickAlert({
              horizontal: 'center',
              vertical: 'top',
              message: 'Failed delete customer product',
              severity: 'error'
            });
            dispatch(reducerUpdateLoadingCustomerProduct(false));
        }
  }
  
  const editCustomerProduct =async (id:string, payload: IPayloadAddCustomerProduct) => {
      dispatch(reducerUpdateLoadingCustomerProduct(true));
      try {
          const response = await httpClient.put<IResponseAddCustomerProduct>(
            `/customer_product/update/${id}`,payload
          );
          if (response.status === 201) {
            dispatch(reducerEditCustomerProduct(response.data.data));
            handleClickAlert({
              horizontal: 'center',
              vertical: 'top',
              message: 'Edit customer product user has successfully',
              severity: 'success'
            });
          }
          dispatch(reducerUpdateLoadingCustomerProduct(false));
        } catch (e) {
          console.log(e);
          handleClickAlert({
              horizontal: 'center',
              vertical: 'top',
              message: 'Failed edit Internal User',
              severity: 'error'
            });
            dispatch(reducerUpdateLoadingCustomerProduct(false));
        }
  }

    const getCustomerProductList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingCustomerProduct(true));
        try{
            const response = await httpClient.get<IResponseCustomerProductList>('/customer_product/find_all', {params});
            if(response.status === 200){
                const list = response.data;
                dispatch(reducerUpdateCustomerProductList({...list}));
                dispatch(reducerUpdateLoadingCustomerProduct(false));
            }
            
        }catch(e){
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get role list',
                severity: 'error'
              });
        }
         
    }
    return { getCustomerProductList, addCustomerProduct, deleteCustomerProduct, editCustomerProduct };
}