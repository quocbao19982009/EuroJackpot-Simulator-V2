import { Transaction } from "@/types/Transaction.interfaces";
import { formatDate } from "@/utils/functions";
import { TableContainer, TablePagination, TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ChangeEvent, useMemo, useState } from "react";

interface TransactionTableProps {
  transactionHistory: Transaction[];
}

// Utils
const sortTransactionHistory = (
  data: Transaction[],
  sortBy: "desc" | "asc",
  sortField: keyof Transaction
) => {
  return [...data].sort((a, b) => {
    if (sortField === "amount") {
      return sortBy === "desc" ? b.amount - a.amount : a.amount - b.amount;
    } else {
      return sortBy === "desc"
        ? +new Date(b.created) - +new Date(a.created)
        : +new Date(a.created) - +new Date(b.created);
    }
  });
};

const TransactionTable = ({ transactionHistory }: TransactionTableProps) => {
  const [sortBy, setSortBy] = useState<"desc" | "asc">("desc");
  const [sortField, setSortField] = useState<"amount" | "created">("created");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      sortTransactionHistory(transactionHistory, sortBy, sortField).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, sortBy, sortField, transactionHistory]
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - transactionHistory.length)
      : 0;

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {/* When hover is red color */}
                <TableSortLabel
                  color="primary"
                  active={sortField === "amount"}
                  direction={sortBy}
                  onClick={() => {
                    setSortField("amount");
                    setSortBy(sortBy === "desc" ? "asc" : "desc");
                  }}
                >
                  Amount (Euros)
                </TableSortLabel>
              </TableCell>

              <TableCell align="center">
                <TableSortLabel
                  color="primary"
                  active={sortField === "created"}
                  direction={sortBy}
                  onClick={() => {
                    setSortField("created");
                    setSortBy(sortBy === "desc" ? "asc" : "desc");
                  }}
                >
                  Paid At
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((transaction) => (
              <TableRow
                key={transaction.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{transaction.amount}</TableCell>
                <TableCell align="center">
                  {formatDate(transaction.created)}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 55 * emptyRows,
                }}
              >
                <TableCell colSpan={2} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactionHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TransactionTable;
