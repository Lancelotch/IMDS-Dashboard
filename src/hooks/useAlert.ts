import { AlertColor, SnackbarOrigin } from "@mui/material";
import { useAppDispatch } from "src/app/hooks";
import { reducerUpdateAlert, reducerUpdateOpenAlert } from "src/redux/alert";

interface Alert {
    message?: string;
    severity?: AlertColor;
}

export const useAlert = ()=> {
    const dispatch = useAppDispatch();
    const handleClickAlert = (newState: SnackbarOrigin & Alert) => {
      dispatch(reducerUpdateAlert({ open: true, ...newState }));
    };

    const handleCloseAlert = () => {
      dispatch(reducerUpdateOpenAlert(false));
    };
    return {handleClickAlert, handleCloseAlert};
}