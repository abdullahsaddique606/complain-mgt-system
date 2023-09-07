// NotificationProvider.js
import { Snackbar,IconButton } from "@mui/material";
import React, { createContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const NotificationContext = createContext(() => {});

export function NotificationProvider(props) {
  const { children } = props;
  const [msg, setMsg] = useState("");
  const isOpen = Boolean(msg);

  const handleClose = () => setMsg("");

  const showNotification = (msg) => setMsg(msg);

  return (
    <NotificationContext.Provider value={showNotification}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        open={isOpen}
        onClose={handleClose}
        message={msg}
        key={msg.split(" ").join("_")}
        action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
      />
      {children}
    </NotificationContext.Provider>
  );
}
