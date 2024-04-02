import { Transaction } from "@/types/Transaction.interfaces";
import { formatDate } from "@/utils/functions";
import { TableSortLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

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

  const sortedBalanceHistory = sortTransactionHistory(
    transactionHistory,
    sortBy,
    sortField
  );

  return (
    <Table sx={{}} aria-label="simple table">
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
        {sortedBalanceHistory.map((transaction) => (
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
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
