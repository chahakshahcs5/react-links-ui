import React, { forwardRef, useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TablePagination, TextField, Button } from "@material-ui/core";
import MaterialTable from "material-table";
import { Tooltip } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Clear from "@material-ui/icons/Clear";
import Search from "@material-ui/icons/Search";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import SendIcon from "@material-ui/icons/Send";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import NavBar from "./NavBar";
import ToastMsg from "./SnackBar";

import firebase from "firebase";
import { db } from "../firebase_config";

const AllLinks = (props) => {
  const useStyles = makeStyles((theme) => ({
    linkTable: {
      marginTop: "75px",
      width: "100%",
    },
    TextOverflow: {
      width: "200px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    nullLinks: {
      textAlign: "center",
      marginTop: "15%",
    },
    circular: {
      marginTop: "15%",
      marginLeft: "50%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "550px",
      minHight: "300px",
    },
  }));

  let tableIcons = {
    Delete: forwardRef((props, ref) => (
      <DeleteOutline data-tut="reactour__delete" {...props} ref={ref} />
    )),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    Send: forwardRef((props, ref) => <SendIcon {...props} ref={ref} />),
  };
  const classes = useStyles();

  const [megaLinks, setMegaLinks] = useState([]);
  const [driveLinks, setDriveLinks] = useState([]);
  const [isMegaLink, setIsMegaLink] = useState(true);
  const [isDriveLink, setIsDriveLink] = useState(false);
  const [addMegaLink, setAddMegaLink] = useState(false);
  const [addDriveLink, setAddDriveLink] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const [formValues, setFormValues] = useState({
    accountNo: "",
    title: "",
    size: "",
    link: "",
  });

  const handleClose = () => {
    setAddMegaLink(false);
    setAddDriveLink(false);
    setIsMegaLink(true);
  };

  const getAllLinks = () => {
    
      db.collection("megaLinks").onSnapshot((querySnapshot) => {
        setMegaLinks(
          querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            accountNo: doc.data().accountNo,
            title: doc.data().title,
            size: doc.data().size,
            link: doc.data().link,
          }))
        );
      });
      db.collection("driveLinks").onSnapshot((querySnapshot) => {
        setDriveLinks(
          querySnapshot.docs.map((doc) => ({
            _id: doc.id,
            title: doc.data().title,
            size: doc.data().size,
            link: doc.data().link,
          }))
        );
      });
    
  };

  const handleSubmit = async (e, values) => {
    e.preventDefault();
    console.log(e);
    let data = formValues;
    data.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    if (addMegaLink) {
      db.collection("megaLinks").add({
        ...data,
      });
      setToastMessage({
        message: "Link Added Successfully",
        status: "success",
      });
    } else {
      db.collection("driveLinks").add({
        ...data,
      });
      setToastMessage({
        message: "Link Added Successfully",
        status: "success",
      });
    }
    setAddMegaLink(false);
    setAddDriveLink(false);
    if (addMegaLink) {
      setIsMegaLink(true);
      setIsDriveLink(false);
    } else {
      setIsDriveLink(true);
      setIsMegaLink(false);
    }
  };
  const closeSnackBar = () => {
    setToastMessage({});
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  return (
    <div>
      <ToastMsg toastMessage={toastMessage} open={true} close={closeSnackBar} />
      <NavBar
        link={"/getMegaLinks"}
        altLink={"/getDriveLinks"}
        mega={true}
        isMegaLink={isMegaLink}
        setIsMegaLink={setIsMegaLink}
        isDriveLink={isDriveLink}
        setIsDriveLink={setIsDriveLink}
        addMegaLink={addMegaLink}
        setAddMegaLink={setAddMegaLink}
        addDriveLink={addDriveLink}
        setAddDriveLink={setAddDriveLink}
      />
      <div className={classes.linkTable}>
        {isMegaLink && megaLinks.length > 0  || isDriveLink && driveLinks.length > 0 ? (
          <MaterialTable
            title={props.title}
            components={{
              Pagination: (props) => (
                <TablePagination
                  {...props}
                  rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
                />
              ),
            }}
            columns={[
              {
                title: `${isMegaLink ? "Account No." : "#"}`,
                field: "accountNo",
                render: (rowData) => (
                  <Tooltip
                    title={isMegaLink ? "Account No." : "#"}
                    placement="top-start"
                  >
                    <div className={classes.TextOverflow}>
                      {rowData.accountNo}
                    </div>
                  </Tooltip>
                ),
              },
              {
                title: "Title",
                field: "title",
                render: (rowData) => (
                  <Tooltip title="Title" placement="top-start">
                    <div className={classes.TextOverflow}>{rowData.title}</div>
                  </Tooltip>
                ),
              },
              {
                title: "Size",
                field: "size",
                render: (rowData) => (
                  <Tooltip title="" placement="top-start">
                    <div className={classes.TextOverflow}>{rowData.size}</div>
                  </Tooltip>
                ),
              },
            ]}
            data={isMegaLink ? megaLinks : driveLinks }
            options={{ actionsColumnIndex: -1 }}
            icons={tableIcons}
            actions={[
              (rowData) => ({
                icon: tableIcons.Send,
                tooltip: "Go to link",
                onClick: (event, rowData) => window.open(rowData.link),
              }),
              {
                icon: tableIcons.Delete,
                tooltip: "Delete",
                onClick: async (event, rowData) => {
                  if (isMegaLink) {
                    await db.collection("megaLinks").doc(rowData._id).delete();
                    let newLinks = megaLinks.filter(
                      (links) => links._id != rowData._id
                    );
                    setMegaLinks(newLinks);
                  } else {
                    await db.collection("driveLinks").doc(rowData._id).delete();
                    let newLinks = driveLinks.filter(
                      (links) => links._id != rowData._id
                    );
                    setDriveLinks(newLinks);
                  }
                },
              },
            ]}
          />
        ) : !megaLinks || !driveLinks ? (
          <div className={classes.circular}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className={classes.nullLinks}>
            No links to show, add links here
          </div>
        )}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={addMegaLink || addDriveLink}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={addMegaLink || addDriveLink}>
          <div className={classes.paper}>
            <form onSubmit={handleSubmit}>
              {addMegaLink && (
                <TextField
                  id="outlined-basic"
                  label="Enter Account No."
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "20px" }}
                  onChange={(e) => {
                    setFormValues({ ...formValues, accountNo: e.target.value });
                  }}
                />
              )}
              <TextField
                id="outlined-basic"
                label="Enter Title"
                variant="outlined"
                fullWidth
                style={{ marginTop: "20px" }}
                onChange={(e) => {
                  setFormValues({ ...formValues, title: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Size"
                variant="outlined"
                fullWidth
                style={{ marginTop: "20px" }}
                onChange={(e) => {
                  setFormValues({ ...formValues, size: e.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Link"
                variant="outlined"
                fullWidth
                style={{ marginTop: "20px" }}
                onChange={(e) => {
                  setFormValues({ ...formValues, link: e.target.value });
                }}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "20px" }}
                color="primary"
              >
                Add Link
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AllLinks;
