import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { FC } from "react";

const CustomizedInput: FC = () => {
  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        width: 400,
        boxShadow: "none",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search transaction, invoices or help"
        inputProps={{ "aria-label": "search transaction, invoices or help" }}
      />

      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
    </Paper>
  );
};
export default CustomizedInput;
