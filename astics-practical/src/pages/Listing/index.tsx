import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import { CSVLink } from "react-csv";
import Header from "../../components/Header";
import CustomTable from "../../components/CustomTable";
import * as ItemService from "../../services/Items";
import { IItem } from "../../types/item";
import { IColumn } from "../../types/common";
import AddItemDialog from "../../components/AddItemDialog";

const headers = [
  { label: "Name", key: "name" },
  { label: "Description", key: "description" },
  { label: "Category", key: "category" },
  { label: "Price", key: "price" },
];

const Listing = () => {
  const [data, setData] = useState<IItem[]>([]);
  const [filteredData, setFilteredData] = useState<IItem[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, rowsPerPage]);

  const applySorting = (key: any, newOrder: any, list: IItem[]) => {
    const newData = [...list];
    if (newOrder === "asc") {
      newData.sort((a: any, b: any) => {
        if (a[key] <= b[key]) {
          return -1;
        } else if (a[key] > b[key]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      newData.sort((a: any, b: any) => {
        if (a[key] >= b[key]) {
          return -1;
        } else if (a[key] < b[key]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return newData;
  };

  const applyFIlterAndPagination = (list: IItem[]) => {
    let filtered = [...list];
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
        item.description
          .toLowerCase()
          .trim()
          .includes(search.toLowerCase().trim()) ||
        item.category.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
    filtered = filtered.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    return filtered;
  };

  const getItems = async () => {
    const res = await ItemService.getAll();
    setData(res);
    let filtered = applySorting(orderBy, order, res);
    filtered = applyFIlterAndPagination(res);
    setFilteredData(filtered);
  };

  const handleDelete = async (id: string) => {
    const res = await ItemService.remove(id);
    if (res) {
      getItems();
    }
  };

  const handleSorting = (key: any) => {
    const newOrder = key === orderBy && order === "asc" ? "desc" : "asc";
    setOrderBy(key);
    setOrder(newOrder);
    let newData = applySorting(key, newOrder, [...data]);
    newData = applyFIlterAndPagination(newData);
    setFilteredData(newData);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const columns: IColumn[] = [
    {
      key: "name",
      column: "Name",
      sort: true,
    },
    {
      key: "description",
      column: "Description",
    },
    {
      key: "category",
      column: "Category",
    },
    {
      key: "price",
      column: "Price",
      sort: true,
    },
    {
      key: "",
      column: "",
      render: (row: IItem) => (
        <Button
          variant="outlined"
          title="Delete"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <h2>Items</h2>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "fit-content",
          }}
        >
          <TextField
            placeholder="Search..."
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <Button
            variant="outlined"
            title="Add Item"
            onClick={() => setOpen(true)}
            style={{ marginRight: "10px" }}
          >
            Add Item
          </Button>
          <CSVLink
            data={filteredData}
            headers={headers}
            filename="Items"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              padding: "10px",
              border: "1px solid rgba(25, 118, 210, 0.5)",
              borderRadius: "4px",
            }}
          >
            Export
          </CSVLink>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <CustomTable
          data={filteredData}
          columns={columns}
          handleSorting={handleSorting}
          order={order}
          orderBy={orderBy}
        />
        <TablePagination
          count={search ? filteredData.length : data.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
        />
      </Container>
      <AddItemDialog
        open={open}
        handleClose={() => setOpen(false)}
        getItems={getItems}
      />
    </>
  );
};

export default Listing;
