import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../../app/models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 3, color: "white" }}
    >
      <Typography variant="body1">
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount!
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} results
      </Typography>
      <div
        style={{
          backgroundColor: "white",
          padding: "3px",
          marginTop: "0px",
          borderTop: "0px solid #2a3447",
        }}
      >
        <Pagination
          color="primary"
          size="large"
          count={totalPages}
          page={currentPage}
          onChange={(_e, page) => onPageChange(page)}
        />
      </div>
    </Box>
  );
}
