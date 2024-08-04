  import React, { useMemo, useState, useRef, useEffect } from "react";
  import MaterialReactTable, { type MRT_ColumnDef } from "material-react-table";
  import { ThemeProvider } from "@mui/material/styles";
  import { createTheme } from "@mui/material/styles";
  import { Box, Typography, TextField, Button, Select, MenuItem, SelectChangeEvent } from "@mui/material";
  import i18n from "../../assets/locales/translate";
  //Mock Data
  import { data as initialData } from "../../utils/getBooks";
  import Rating from "@mui/material/Rating";
  import { useNavigate, useLocation } from "react-router-dom";
  import { Book, getBooks, getAllRatingsByBook, searchBookByName, searchBookByAuthor, getAllBookComments, searchByYear, searchByReatings, getRatedBooks} from "../../utils/fetch/fetch";
  import {getBookCover} from "../../utils/books/getBookCover";

export type AllBookInfo = {
    id?: number;
    title: string;
    author: string;
    rating: number;
    votes: number;
    year: number;
    cover: string;
  };

  /**
   * Returns a styled TableBooksSearch component.
   * @returns {JSX.Element} - The rendered TableBooksSearch component.
   */
  const TableBooksSearch: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const isFetched = useRef(false);

    const [search, setSearch] = useState(location.state?.title || "");
    const [tableData, setTableData] = useState<AllBookInfo[]>([]);
    const [filteredData, setFilteredData] = useState<AllBookInfo[]>([]);

   useEffect(() => {
    const fetchData = async () => {
      console.log("useEffect");
      if (!isFetched.current) {
        try {
          const books = await getBooks();
          const modifiedBooks = await Promise.all(
            books.map(async (book: Book) => {
              const ratings = await getAllRatingsByBook(book.id);
              const averageRating =
                ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                  ratings.length || 0;
              return {
                id: book.id,
                title: book.title,
                author: book.author,
                rating: averageRating,
                votes: ratings.length,
                year: book.year,
                cover: await getBookCover(book.isbn),
              };
            })
          );
          setTableData(modifiedBooks);
          if(!search){
            setFilteredData(modifiedBooks as AllBookInfo[]);
          }
          console.log("tableData: ", modifiedBooks);
          console.log("filteredData: ", modifiedBooks);
        } catch (err) {
          console.log(err);
        }

        isFetched.current = true;
      }
    };

    fetchData();
  }, []);
  

    const handleFilterByTitle = async (value: string) => {
      console.log("title: ", value);
      console.log("data: ", tableData);
      if (!value) {
        console.log("empty");
        //isFetched.current = true;
        console.log("tableData: ", tableData);
        console.log("filteredData: ", filteredData);
        setFilteredData(tableData);
        //return;
      }else{
      try {
        const books = await searchBookByName(value);
        const modifiedBooks = await Promise.all(
          books.map(async (book: Book) => {
            const ratings = await getAllRatingsByBook(book.id);
            const averageRating =
              ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                ratings.length || 0;
            return {
              id: book.id,
              title: book.title,
              author: book.author,
              rating: averageRating,
              votes: ratings.length,
              year: book.year,
              cover: await getBookCover(book.isbn),
            };
          })
        );
        setFilteredData(modifiedBooks as AllBookInfo[]);
        console.log("bookInfo by title: ", modifiedBooks);
      } catch (err) {
        console.log(err);
      }
      };

    };

    function handleSetSearch(value: string) {
      setSearch(value);
    }
    

    console.log("search: ", search);

    useMemo(() => {
      if (!search) {
        setFilteredData(tableData);
      } else {
        handleFilterByTitle(search);
      }
    }, [search]);


      const handleFilterByAuthor = async (value: string) => {
        console.log("author: ", value);
        console.log("data: ", tableData);
        if (!value) {
          setFilteredData(tableData);
          return;
        }else{
      try {
        const books = await searchBookByAuthor(value);
        const modifiedBooks = await Promise.all(
          books.map(async (book: Book) => {
            const ratings = await getAllRatingsByBook(book.id);
            const averageRating =
              ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                ratings.length || 0;
            return {
              id: book.id,
              title: book.title,
              author: book.author,
              rating: averageRating,
              votes: ratings.length,
              year: book.year,
              cover: await getBookCover(book.isbn),
            };
          })
        );
        setFilteredData(modifiedBooks as AllBookInfo[]);
        console.log("bookInfo by author: ", modifiedBooks);
      } catch (err) {
        console.log(err);
      }
    }
    };

    
    const handleFilterByRatings = async (value: "" | '1' | '2' | '3' | '4' | '5', filterMode: 'greater' | 'lower' | 'none') => {
      console.log("ratings value: ", value);
      console.log("filter mode: ", filterMode);
  
      if (value === null) {
        isFetched.current = true;
        return;
      }else{
      try {
        const books = await searchByReatings(value, filterMode,  1, 10);
        const modifiedBooks = await Promise.all(
          books.map(async (book) => {
            const ratings = await getAllRatingsByBook(book.id);
            const averageRating =
              ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                ratings.length || 0;
            return {
              id: book.id,
              title: book.title,
              author: book.author,
              rating: averageRating,
              votes: ratings.length,
              year: book.year,
              cover: await getBookCover(book.isbn),
            };
          })
        );
        setFilteredData(modifiedBooks);
        console.log("bookInfo by year: ", modifiedBooks);
      } catch (err) {
        console.log(err);
      }}
    };

      const handleFilterByYear = async (value: number, type: 'greater' | 'lower' | 'none') => {
      console.log("author: ", value);
      console.log("data: ", tableData);

      if (value === null) {
        isFetched.current = true;
        //setFilteredData(tableData);
        return;
      }else{
      try {
        const books = await searchByYear(value=value, type=type, 1, 10);
        const modifiedBooks = await Promise.all(
          books.map(async (book) => {
            const ratings = await getAllRatingsByBook(book.id);
            const averageRating =
              ratings.reduce((sum, rating) => sum + rating.rating, 0) /
                ratings.length || 0;
            return {
              id: book.id,
              title: book.title,
              author: book.author,
              rating: averageRating,
              votes: ratings.length,
              year: book.year,
              cover: await getBookCover(book.isbn),
            };
          })
        );
        setFilteredData(modifiedBooks);
        console.log("bookInfo by year: ", modifiedBooks);
      } catch (err) {
        console.log(err);
      }}
    };

    const columns = useMemo<MRT_ColumnDef<AllBookInfo>[]>(
      () => [
        {
          accessorKey: "title",
          filterFn: "fuzzy",
          Filter: ({ header }) => (
            <TextField
              onChange={(e) =>
                header.column.setFilterValue(e.target.value || undefined)
              }
              value={header.column.getFilterValue() ?? ""}
              fullWidth
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  const inputElement = e.target as HTMLInputElement; // Rzutowanie na HTMLInputElement
                  handleFilterByTitle(inputElement.value);
                }
              }}
            />
          ),
          header: i18n.t("book") || "Book",
          size: 300,
          Cell: ({ renderedCellValue, row }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <img
                alt="cover"
                height={90}
                width={80}
                src={row.original.cover}
                loading="lazy"
                style={{ borderRadius: "0%" }}
              />
              <span>{renderedCellValue}</span>
            </Box>
          ),
        },
       {
  accessorFn: (row) => row.rating,
  header: i18n.t("ratings") || "ratings",
  size: 100,
  filterFn: 'greater',
  Cell: ({ row }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Rating value={row.original.rating} precision={0.1} readOnly />
      <Typography variant="body2" color="textSecondary">
        ({row.original.votes})
      </Typography>
    </Box>
  ),
  Filter: ({ header }) => {
    const filterValue = header.column.getFilterValue() ?? "";
    let ratingValue = filterValue;
    const filterMode = header.column.filterFn || "";
    let modeValue = filterMode as 'greater' | 'lower' | 'none';

    const handleFilterChange = (e: SelectChangeEvent<"" | '1' | '2' | '3' | '4' | '5'>) => {
      const value = e.target.value;
      header.column.setFilterValue(value);
      ratingValue = value;
      handleFilterByRatings(value as "" | '1' | '2' | '3' | '4' | '5', modeValue as 'greater' | 'lower' | 'none');
    };

    const handleFilterModeChange = (e: SelectChangeEvent<'greater' | 'lower' | 'none'>) => {
      const mode = e.target.value as 'greater' | 'lower' | 'none';
      modeValue = mode;
      handleFilterByRatings(ratingValue as "" | '1' | '2' | '3' | '4' | '5', mode);
    };

    return (
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Select
          value={filterValue as "" | '1' | '2' | '3' | '4' | '5'}
          onChange={handleFilterChange}
          sx={{ width: '80px' }}
        >
          <MenuItem value="">Any</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
        <Select
          value={filterMode as 'greater' | 'lower' | 'none'}
          onChange={handleFilterModeChange}
          sx={{ width: '120px' }}
        >
          <MenuItem value="greater">Greater</MenuItem>
          <MenuItem value="lower">Lower</MenuItem>
          <MenuItem value="none">Same</MenuItem>
        </Select>
      </Box>
    );
  },
},

       {
        accessorKey: "year",
        columnFilterModeOptions: [],
        filterFn: 'greater',
        Filter: ({ header }) => {
          const filterValue = header.column.getFilterValue() ?? "";
          let yearValue = Number(filterValue);
          const filterMode = header.column.filterFn || "";
          let modeValue = filterMode as 'greater' | 'lower' | 'none';

          const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            header.column.setFilterValue(value);
            yearValue = Number(value);
            if (yearValue > 1900 && yearValue < 2024) {
              handleFilterByYear(yearValue, modeValue);
            }
          };

          const handleFilterModeChange = (e: SelectChangeEvent<"greater" | "lower" | "none">) => {
            const mode = e.target.value as 'greater' | 'lower' | 'none';
            const value = header.column.getFilterValue() ?? "";
            modeValue = mode;
            if (yearValue > 1900 && yearValue < 2024) {
              handleFilterByYear(yearValue, modeValue);
            }
          };

          return (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <TextField
                value={filterValue}
                onChange={handleFilterChange}
                fullWidth
                style={{ width: '80px' }}
              />
              <Select
                value={filterMode as 'greater' | 'lower' | 'none'}
                onChange={handleFilterModeChange}
                sx={{ width: '120px' }}
              >
                <MenuItem value="greater">Greater</MenuItem>
                <MenuItem value="lower">Lower</MenuItem>
                <MenuItem value="none">Same</MenuItem>
              </Select>
            </Box>
          );
        },
        header: i18n.t("year") || "year",
        size: 100,
      },
        {
          accessorKey: "author",
          filterFn: "fuzzy",
          Filter: ({ header }) => (
            <TextField
              onChange={(e) =>
                header.column.setFilterValue(e.target.value || undefined)
              }
              value={header.column.getFilterValue() ?? ""}
              fullWidth
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  const inputElement = e.target as HTMLInputElement; // Rzutowanie na HTMLInputElement
                  handleFilterByAuthor(inputElement.value);
                }
              }}
            />
          ),
          columnFilterModeOptions: [],
          header: i18n.t("author") || "author",
          size: 250,
          // columnFilterMode: "fuzzy", // Ustawienie filtru na "fuzzy"
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
              backgroundColor: "#DFDFDE",
            },
          },
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          //data={data}
          data={filteredData}
          enableTopToolbar={true}
          enableColumnFilterModes
          initialState={{
            showColumnFilters: true,
            showGlobalFilter: true,
          }}
          renderTopToolbarCustomActions={({
            table
          }) => <Box>
                  <Button
                    onClick={async () => {
                      const sessionData = localStorage.getItem("sessionData") || "NO REFRESH TOKEN";
                      const { userID } = JSON.parse(sessionData);

                      table.resetColumnFilters();

                      try {
                        const books = await getRatedBooks(userID);

                        if (books !== null) {
                          const modifiedBooks = await Promise.all(
                            books.map(async (book: Book) => {
                              const ratings = await getAllRatingsByBook(book.id);
                              const averageRating =
                                ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length || 0;

                              return {
                                id: book.id,
                                title: book.title,
                                author: book.author,
                                rating: averageRating,
                                votes: ratings.length,
                                year: book.year,
                                cover: await getBookCover(book.isbn),
                              };
                            })
                          );

                          setFilteredData(modifiedBooks as AllBookInfo[]);
                          console.log("bookInfo by author: ", modifiedBooks);
                        } else {
                          console.log("Failed to retrieve rated books");
                        }
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                  >
                    Reviewed by user
                  </Button>
                  <Button onClick={() => {
                    table.resetColumnFilters();
                    setFilteredData(tableData);
                  }}>
                    Reset Filters
                  </Button>
                </Box>}
          muiTableBodyProps={{
            sx: {
              "& > .MuiTableRow-root": {
                height: 70,
                width: 1000,
                border: "10px solid black",
                borderRadius: 4,
                backgroundColor: "white",
                px: 4,
                py: 3,
                mb: 5,
              },
            },
          }}
          muiSearchTextFieldProps={() => ({
            onClick: () => setFilteredData(tableData),
            //table.resetColumnFilters();
            children: (
              <TextField
                variant="outlined"
                placeholder="Search in books..."
                label="All Search"
                InputLabelProps={{ shrink: true }}
                value={search || ""}
                onChange={(e) => handleSetSearch(e.target.value)}
              />
            ),
          })}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => navigate(`/book/${row.original.id}`),
            sx: {
              border: "1px solid black",
              borderRadius: 4,
              backgroundColor: "white",
            },
          })}
          muiTablePaperProps={{
            elevation: 0,
            sx: {
              backgroundColor: "white",
              px: 4,
              py: 3,
              mb: 5,
            },
          }}
          muiTableHeadCellFilterTextFieldProps={{
            sx: { m: "0.5rem 0", width: "100%" },
            variant: "outlined",
          }}
        />
      </ThemeProvider>
    );
  };

  export { TableBooksSearch };
