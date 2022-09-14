import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList, IResponseCustomerList,  } from "src/models/general"
import { reducerUpdateCustomerList, reducerUpdateLoadingCustomerList } from "src/redux/customer";
import httpClient from "..";

export const useCustomer = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const getCustomerList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingCustomerList(true));
        try{
            const response = await httpClient.get<IResponseCustomerList>('/customer/find_all', {params});
            if(response.status === 200){
                const list = response.data;
                dispatch(reducerUpdateCustomerList({...list, loading: false}));
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
    return { getCustomerList };
}