import { useNavigate } from "react-router";
import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadGetList } from "src/models/general"
import { IResponseWidgetById, IResponseWidgetList } from "src/models/widget";
import { reducerUpdateLoadingWidget, reducerUpdateLoadingWidgetList, reducerUpdateWidgetById, reducerUpdateWidgetList } from "src/redux/widget";
import httpClient from "..";

export const useWidget = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getWidgetList = async (params: IPayloadGetList) => {
        dispatch(reducerUpdateLoadingWidgetList(true));
        try{
            const response = await httpClient.get<IResponseWidgetList>('/widget/find_all', {params});
            if(response.status === 200){
                const WidgetList = response.data;
                dispatch(reducerUpdateWidgetList({...WidgetList, loading: false}));
            }
            
        }catch(e){
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get Widget list',
                severity: 'error'
              });
        }
         
    }

    const getWidgetById = async (id: string) => {
        dispatch(reducerUpdateLoadingWidget(true));
        try{
            const response = await httpClient.get<IResponseWidgetById>(`/widget/find_by_widget_id/${id}`);
            if(response.status === 200){
                const Widget = response.data;
                dispatch(reducerUpdateWidgetById(Widget.data));
            }
            dispatch(reducerUpdateLoadingWidget(false));
            
        }catch(e){
            dispatch(reducerUpdateLoadingWidget(false));
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'cannot get Widget by id',
                severity: 'error'
              });
              navigate(window.location.pathname);
        }
    }
        
    return { getWidgetList, getWidgetById };
}