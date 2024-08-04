import React, { useMemo, useRef, useState, useEffect } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Box, Typography, TextField } from "@mui/material";
import i18n from "../../assets/locales/translate";
// Mock Data
import { data } from "../../utils/getComment";
import Rating from "@mui/material/Rating";
import {
  getAllBookComments,
  getAllRatingsByUser,
  getUserById,
  Review as RatingData,
  Comment as CommentData,
  User,
} from "../../utils/fetch/fetch";

export interface Comment {
  fname: string;
  lname: string;
  rating: number;
  comment: string;
  date: string;
}

interface CommentBooksSearchProps {
  bookID?: number;
}

/**
 * Returns a styled CommentBooksSearch component.
 * @returns {JSX.Element} - The rendered CommentBooksSearch component.
 */
const CommentBooksSearch: React.FC<CommentBooksSearchProps> = ({
  bookID,
}): JSX.Element => {
  const isFetched = useRef(false);
  const [data, setData] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect");
      if (!isFetched.current) {
        try {
          const comments = await getAllBookComments(bookID || 1);
          const modifiedComments = await Promise.all(
            comments.map(async (comment: CommentData) => {
              const ratingsData = await getAllRatingsByUser(comment.userId);
              const reating = ratingsData.filter(
                (reatings: RatingData) => reatings.bookId === bookID
              );

              return {
                fname: comment?.fname ?? "",
                lname: comment?.lname ?? "",
                rating: reating[0].rating,
                comment: comment.comment,
                date: reating[0].dateAdded,
              };
            })
          );

          setData(modifiedComments);
          console.log("tableData: ", modifiedComments);
        } catch (err) {
          console.log(err);
        }

        isFetched.current = true;
      }
    };

    fetchData();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Comment>[]>(
    () => [
      {
        accessorFn: (row) => `${row.fname} ${row.lname}`, // Połączenie imienia i nazwiska w nowym polu "name"
        header: i18n.t("user name") || "user name",
        size: 250,
        Cell: ({ renderedCellValue }) => (
          <Typography>{renderedCellValue}</Typography>
        ),
      },
      {
        accessorFn: (row) => row.rating,
        header: i18n.t("rating") || "rating",
        size: 150,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Rating value={row.original.rating} precision={0.1} readOnly />
          </Box>
        ),
      },
      {
        accessorKey: "comment",
        header: i18n.t("comments") || "comments",
        size: 400,
      },
      {
        accessorKey: "date",
        header: i18n.t("date") || "date",
        size: 200,
      },
    ],
    []
  );

  const theme = createTheme({
    components: {
      MuiTableRow: {
        styleOverrides: {
          root: {
            font: "Montserrat",
            px: 4,
            py: 3,
            mt: 5,
            backgroundColor: "#e0e0e0",
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            backgroundColor: "#e0e0e0",
          },
        },
      },
    },
    palette: {
      background: {
        default: "#e0e0e0",
      },
    },
  });

  console.log("bookId:", bookID);

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable<Comment>
        columns={columns}
        data={data}
        //state={{ isLoading: true }}
        enableColumnActions={false}
        enableColumnFilters={false}
        enablePagination={true}
        enableSorting={true}
        enableBottomToolbar={true}
        enableTopToolbar={true}
        initialState={{
          showColumnFilters: false,
          showGlobalFilter: true,
          pagination: { pageSize: 3, pageIndex: 0 },
          density: "compact",
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: [3, 5, 10, 20],
          showFirstButton: true,
          showLastButton: true,
          SelectProps: { native: true },
          labelRowsPerPage: "Wants more?",
          color: "#e0e0e0",
        }}
        muiSearchTextFieldProps={{
          variant: "outlined",
          placeholder: "Search for a comment...",
          label: "Search",
          InputLabelProps: { shrink: true },
        }}
        muiTableBodyProps={{
          sx: {
            backgroundColor: "#e0e0e0",
            "& > .MuiTableRow-root": {
              height: 70,
              width: 1000,
              border: "10px solid black",
              borderRadius: 4,
              backgroundColor: "#e0e0e0",
              px: 4,
              py: 3,
              mb: 5,
            },
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            border: "1px solid black",
            borderRadius: 4,
            backgroundColor: "#e0e0e0",
          },
        }}
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: "#e0e0e0",
            px: 4,
            py: 3,
            mb: 5,
          },
        }}
        muiTableHeadCellFilterTextFieldProps={{
          sx: { m: "0.5rem 0", width: "100%" },
          variant: "outlined",
        }}
        muiTopToolbarProps={{
          sx: {
            backgroundColor: "#e0e0e0",
          },
        }}
        muiTableHeadCellProps={{
          sx: (theme) => ({
            background: "#e0e0e0",
            borderRight: "1px solid rgba(224,224,224,1)",
            color: theme.palette.text.primary,
          }),
        }}
      />
    </ThemeProvider>
  );
};

export default CommentBooksSearch;
