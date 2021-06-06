import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hover: {
    "&:hover": {
      color: "white",
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Button
            style={{
              backgroundColor: props.isMegaLink ? "white" : null,
              marginRight: "20px",
            }}
            className={!props.isMegaLink && classes.hover}
            onClick={() => {
              props.setIsMegaLink(true);
              props.setIsDriveLink(false);
              props.setAddMegaLink(false);
              props.setAddDriveLink(false);
            }}
          >
            Mega Links
          </Button>
          <Button
            onClick={() => {
              props.setIsDriveLink(true);
              props.setIsMegaLink(false);
              props.setAddMegaLink(false);
              props.setAddDriveLink(false);
            }}
            style={{
              backgroundColor: props.isDriveLink ? "white" : null,
              marginRight: "20px",
            }}
            className={!props.isDriveLink && classes.hover}
          >
            Drive Links
          </Button>
          <Button
            onClick={() => {
              props.setIsDriveLink(false);
              props.setIsMegaLink(false);
              props.setAddMegaLink(true);
              props.setAddDriveLink(false);
            }}
            style={{
              backgroundColor: props.addMegaLink ? "white" : null,
              "&:hover": {
                color: "white",
              },
            }}
            className={!props.addMegaLink && classes.hover}
          >
            Add Mega Link
          </Button>
          <Button
            onClick={() => {
              props.setIsDriveLink(false);
              props.setIsMegaLink(false);
              props.setAddMegaLink(false);
              props.setAddDriveLink(true);
            }}
            style={{
              backgroundColor: props.addDriveLink ? "white" : null,
              "&:hover": {
                color: "white",
              },
            }}
            className={!props.addDriveLink && classes.hover}
          >
            Add Drive Link
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
