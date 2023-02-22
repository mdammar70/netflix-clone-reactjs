import React, { useContext } from "react";
import { Grid } from "@mui/material";

import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { fetchToken, createSessionId, movieApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useStyles from "./style";
import { useTheme } from "@mui/material/styles";
import { setUser, userSelector } from "../../features/auth";
import Search from "../Search/Search";
import Sidebar from "../Sidebar/Sidebar";
const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  const drawerWidth = 240;
  React.useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);
  return (
    <>
     
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                style={{ outline: "none" }}
                onClick={() => setMobileOpen((prevVal) => !prevVal)}
                className={classes.menuButton}
              >
                <Menu />
              </IconButton>
            )}
            <IconButton
              color="inherit"
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
            {!isMobile && <Search />}
            <div>
              {!isAuthenticated ? (
                <Button color="inherit" onClick={fetchToken}>
                  Login &nbsp; <AccountCircle />
                </Button>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/profile/${user.id}`}
                  className={classes.linkButton}
                >
                  {!isMobile && <>My Movies &nbsp;</>}
                  <Avatar style={{ width: 30, height: 30 }} alt="Profile" />
                </Button>
              )}
            </div>
            {isMobile && <Search />}
          </Toolbar>
        </AppBar>
     
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevVal) => !prevVal)}
              className={classes.drawerBackground}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
              variant="permanent"
              anchor="left"
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
