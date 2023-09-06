import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import { GetAllUsers } from "../api/api";
// import Filter from "./FilterButtons";

const columns = [
  { id: "complaintId", label: "Complain Id", minWidth: 100 },
  { id: "userId", label: "User", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 170 },
  { id: "type", label: "Complain Type", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
];

const TableComponent = ({
  data,
  handleDelete,
  handleUpdate,
  isLoading,
  role,
}) => {
  const theme = useTheme();
  const { data: usersData } = GetAllUsers();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columnsToShow = columns.filter((column) => {
    if (role == "User") {
      return column.id !== "userId";
    }
    return true;
  });
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="flex justify-end">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          colSpan={3}
          count={data ? data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columnsToShow.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main
                  ),
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.length > 0 ? (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.complainId}>
                      {columnsToShow.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align || "left"}
                        >
                          {column.id == "userId" && role == "Admin"
                            ? usersData.find((user) => user.id == row.userId)
                                ?.email || row.userId
                            : row[column.id]}
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() =>
                            handleDelete(row.complaintId, row.userId)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleUpdate(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    <Typography variant="body1">No records found.</Typography>
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Typography variant="body1">No records found.</Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length + 1} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        colSpan={3}
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page (bottom pagination)",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableComponent;
