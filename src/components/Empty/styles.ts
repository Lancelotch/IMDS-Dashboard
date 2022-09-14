import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  small: {
    height: theme.spacing(4),
    width: theme.spacing(4)
  },
  medium: {
    height: theme.spacing(8),
    width: theme.spacing(8)
  },
  large: {
    height: theme.spacing(12),
    width: theme.spacing(12)
  },
}));

export default useStyles;
