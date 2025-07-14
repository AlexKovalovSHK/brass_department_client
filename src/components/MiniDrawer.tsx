import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SchoolIcon from "@mui/icons-material/School";
import PortraitIcon from "@mui/icons-material/Portrait";
import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import AdminProfilCabinet from "./AdminProfilCabinet";
import Students from "./students/Students";
import Exams from "./exams/Exams";
import InfoComponent from "./infoComponent/InfoComponent";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [openDepartments, setOpenDepartments] = useState("");
  const [openAccount, setOpenAccount] = useState("d-none");
  const [openSelary, setOpenSalary] = useState("d-none");
  const [openCompanyInfo, setOpenCompanyInfo] = useState("d-none");
  const [openEmployeesInfo, setOpenEmployeesInfo] = useState("d-none");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDepartmentsOpen = () => {
    setOpenDepartments("");
    setOpenAccount("d-none");
    setOpenSalary("d-none");
    setOpenCompanyInfo("d-none");
    setOpenEmployeesInfo("d-none");
  };

  const handleEmployeesOpen = () => {
    setOpenCompanyInfo("d-none");
    setOpenAccount("d-none");
    setOpenDepartments("d-none");
    setOpenSalary("d-none");
    setOpenEmployeesInfo("");
  };

  const handleAccountOpen = () => {
    setOpenAccount("");
    setOpenDepartments("d-none");
    setOpenSalary("d-none");
    setOpenCompanyInfo("d-none");
    setOpenEmployeesInfo("d-none");
  };

  const handleListOpen = () => {
    setOpenSalary("");
    setOpenAccount("d-none");
    setOpenDepartments("d-none");
    setOpenCompanyInfo("d-none");
    setOpenEmployeesInfo("d-none");
  };

  const handleInfoOpen = () => {
    setOpenCompanyInfo("");
    setOpenAccount("d-none");
    setOpenDepartments("d-none");
    setOpenSalary("d-none");
    setOpenEmployeesInfo("d-none");
  };

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate('/'))
  }

  useEffect(() => {}, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Brass Department
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleDepartmentsOpen()}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Departments"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleEmployeesOpen()}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText
                primary="Employees"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleAccountOpen()}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <PortraitIcon />
              </ListItemIcon>
              <ListItemText
                primary="Admin profil"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleListOpen()}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <CurrencyBitcoinIcon />
              </ListItemIcon>
              <ListItemText
                primary="Selary"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleInfoOpen()}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                primary="Info"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleLogout()}
              sx={[
                { minHeight: 48, px: 2.5 },
                open
                  ? { justifyContent: "initial" }
                  : { justifyContent: "center" },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className={openDepartments}>
          <Students />
        </div>
        <div className={openEmployeesInfo}>
          <Exams />
        </div>
        <div className={openAccount}>
          <AdminProfilCabinet />
        </div>
        <div className={openSelary}>1</div>
        

        <div className={openCompanyInfo}><InfoComponent/></div>
      </Box>
    </Box>
  );
}
