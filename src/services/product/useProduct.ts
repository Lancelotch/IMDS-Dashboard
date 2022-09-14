import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList, IResponseProductList } from "src/models/general"
import { reducerUpdateLoadingProductList, reducerUpdateProductList } from "src/redux/product";
import httpClient from "..";

export const useProduct = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const getProductList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingProductList(true));
        try{
            const response = await httpClient.get<IResponseProductList>('/product/find_all', {params});
            if(response.status === 200){
                const productList = response.data;
                dispatch(reducerUpdateProductList({...productList, loading: false}));
            }
            
        }catch(e){
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get product list',
                severity: 'error'
              });
        }
         
    }
    return { getProductList };
}