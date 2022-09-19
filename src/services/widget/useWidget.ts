import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList } from "src/models/general"
import { IResponseWidgetList } from "src/models/widget";
import { reducerUpdateLoadingWidgetList, reducerUpdateWidgetList } from "src/redux/widget";
import httpClient from "..";

export const useWidget = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();

    const getWidgetList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingWidgetList(true));
        try{
            const response = await httpClient.get<IResponseWidgetList>('/widget/find_all', {params});
            if(response.status === 200){
                const roleList = response.data;
                dispatch(reducerUpdateWidgetList({...roleList, loading: false}));
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
    return { getWidgetList };
}