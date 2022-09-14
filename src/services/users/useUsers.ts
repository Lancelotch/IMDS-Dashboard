import { useAppDispatch } from "src/app/hooks";
import { useAlert } from "src/hooks/useAlert";
import { IPayloadLogin, IResponseLogin } from "src/models/general"
import { reducerUpdateAuthentication } from "src/redux/users";
import httpClient from "..";

export const useUsers = ()=> {
    const { handleClickAlert } = useAlert();
    const dispatch = useAppDispatch();
    const postUserSignin = async (payload: IPayloadLogin) => {
        try{
            const response = await httpClient.post<IResponseLogin>('/auth/login', payload);
            if(response.status === 200){
                const token = response.data.token;
                const isAuth = token ? true : false;
                window.localStorage.setItem('token', token);
                dispatch(reducerUpdateAuthentication(isAuth));
            }
            
        }catch(e){
            console.log(e);
            handleClickAlert({
                horizontal: 'center',
                vertical: 'top',
                message: 'username or password incorrect',
                severity: 'error'
              });
        }
         
    }
    return {postUserSignin};
}