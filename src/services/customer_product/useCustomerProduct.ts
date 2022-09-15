import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadAddCustomerProduct, IPayloadGetList, IResponseAddCustomerProduct, IResponseCustomerProductList } from "src/models/general"
import { reducerUpdateAddCustomerProduct, reducerUpdateCustomerProductList, reducerUpdateLoadingCustomerProductList } from "src/redux/customerProduct";
import httpClient from "..";

export const useCustomerProduct = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addCustomerProduct =async (payload:IPayloadAddCustomerProduct) => {
        dispatch(reducerUpdateLoadingCustomerProductList(true));
        try {
            const response = await httpClient.post<IResponseAddCustomerProduct>(
              '/customer_product/create',
              payload
            );
            if (response.status === 200) {
              dispatch(reducerUpdateAddCustomerProduct(response.data.data));
              dispatch(reducerUpdateLoadingCustomerProductList(false));
            }
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed add Customer Product',
                severity: 'error'
              });
            dispatch(reducerUpdateLoadingCustomerProductList(false));
          }
    }

    const getCustomerProductList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingCustomerProductList(true));
        try{
            const response = await httpClient.get<IResponseCustomerProductList>('/customer_product/find_all', {params});
            if(response.status === 200){
                const list = response.data;
                dispatch(reducerUpdateCustomerProductList({...list}));
                dispatch(reducerUpdateLoadingCustomerProductList(false));
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
    return { getCustomerProductList, addCustomerProduct };
}