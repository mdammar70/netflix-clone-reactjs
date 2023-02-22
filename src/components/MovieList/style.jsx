import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => {
  return {
    moviesContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        justifyContent: "center",
      },
    },
  };
});
