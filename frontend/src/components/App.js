import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import BusinessIcon from "@material-ui/icons/Business";
import Hidden from "@material-ui/core/Hidden";

import { Route, Switch } from "react-router-dom";
import HomePage from "./Home/HomePage";
import AboutPage from "./About/AboutPage";
import PageNotFound from "./PageNotFound";
import LotofacilPage from "./Loteria/Lotofacil/LotofacilPage";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  title: {
    flexGrow: 1
  },
  drawerTitle: {
    fontWeight: "bold"
  }
}));
function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <Header />
    //   <Menu />
    //   <main>
    //     <Switch>
    //       <Route exact path="/" component={HomePage} />
    //       <Route path="/about" component={AboutPage} />
    //       <Route path="/lotofacil" component={LotofacilPage} />
    //       <Route component={PageNotFound} />
    //     </Switch>
    //   </main>
    // </div>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Hidden mdDown={open}>
            <Typography variant="h6" noWrap className={classes.title}>
              Quero minha sorte
            </Typography>
          </Hidden>
          <Hidden mdDown={true}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/lotofacil">
              Lotofácil
            </Button>
            <Button color="inherit" component={RouterLink} to="/about">
              Sobre
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader} onClick={handleDrawerClose}>
          <Typography className={classes.drawerTitle} noWrap>
            Quero minha sorte
          </Typography>
          <IconButton>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="1" component={RouterLink} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Principal</ListItemText>
          </ListItem>
          <ListItem button key="2" component={RouterLink} to="/about">
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText>Sobre</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="3" component={RouterLink} to="/lotofacil">
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText>Lotofacil</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/lotofacil" component={LotofacilPage} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
