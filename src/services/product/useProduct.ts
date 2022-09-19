import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList } from "src/models/general"
import { IPayloadAddProduct, IResponseAddProduct, IResponseProductList } from "src/models/product";
import { reducerEditProduct, reducerUpdateAddProduct, reducerUpdateLoadingProduct, reducerUpdateProductList } from "src/redux/product";
import httpClient from "..";

export const useProduct = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const addProduct = async (payload:IPayloadAddProduct) => {
        dispatch(reducerUpdateLoadingProduct(true));
        try {
            const response = await httpClient.post<IResponseAddProduct>(
              '/product/create',
              payload
            );
            if (response.status === 201) {
              dispatch(reducerUpdateAddProduct(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Add product has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingProduct(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed add Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingProduct(false));
          }
    }
    
    const deleteProduct = async (id:string) => {
        dispatch(reducerUpdateLoadingProduct(true));
        try {
            const response = await httpClient.put<IResponseAddProduct>(
              `/product/delete/${id}`,
              {
                isActive: false
              }
            );
            if (response.status === 201) {
              dispatch(reducerEditProduct(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Delete product has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingProduct(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed delete Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingProduct(false));
          }
    }
    
    const editProduct = async (id:string, payload: IPayloadAddProduct) => {
        dispatch(reducerUpdateLoadingProduct(true));
        try {
            const response = await httpClient.put<IResponseAddProduct>(
              `/product/update/${id}`,payload
            );
            if (response.status === 201) {
              dispatch(reducerEditProduct(response.data.data));
              handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Edit product has successfully',
                severity: 'success'
              });
            }
            dispatch(reducerUpdateLoadingProduct(false));
          } catch (e) {
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'Failed edit Internal User',
                severity: 'error'
              });
              dispatch(reducerUpdateLoadingProduct(false));
          }
    }

    const getProductList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingProduct(true));
        try{
            const response = await httpClient.get<IResponseProductList>('/product/find_all', {params});
            if(response.status === 200){
                const productList = response.data;
                dispatch(reducerUpdateProductList({...productList, loading: false}));
            }
            dispatch(reducerUpdateLoadingProduct(false));
            
        }catch(e){
            dispatch(reducerUpdateLoadingProduct(false));
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get product list',
                severity: 'error'
              });

        }
         
    }
    return { getProductList, addProduct, editProduct, deleteProduct };
}