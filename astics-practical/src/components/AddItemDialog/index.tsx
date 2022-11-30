import React, { FC, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import * as ItemService from "../../services/Items";
import { IItem } from "../../types/item";

interface IAddItemDialogProps {
  open: boolean;
  handleClose: any;
  getItems: any;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  description: Yup.string().required("Description is required."),
  price: Yup.number().required("Price is required."),
  category: Yup.string().required("Category is required"),
});

const initialData: IItem = {
  id: "",
  name: "",
  description: "",
  category: "",
  price: 0,
};

const AddItemDialog: FC<IAddItemDialogProps> = ({
  open,
  handleClose,
  getItems,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (values: IItem) => {
    const res = await ItemService.add(values);

    if (res.status === 200) {
      const updateRes = await ItemService.update(res.data.name, values);
      if (updateRes.status === 200) {
        handleClose();
        getItems();
      } else {
        setErrorMessage("Error while adding new item.");
      }
    } else {
      setErrorMessage("Error while adding new item.");
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Item</DialogTitle>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          isValid,
        }) => (
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                margin="dense"
                fullWidth
                autoComplete="off"
                name="name"
                value={values.name}
                label="Name"
                type="text"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(!values.name && touched.name && errors.name)}
                helperText={!values.name && touched.name && errors.name}
              />
              <TextField
                margin="dense"
                fullWidth
                autoComplete="off"
                name="description"
                value={values.description}
                label="Description"
                type="text"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  !values.description &&
                    touched.description &&
                    errors.description
                )}
                helperText={
                  !values.description &&
                  touched.description &&
                  errors.description
                }
              />
              <TextField
                margin="dense"
                fullWidth
                autoComplete="off"
                name="category"
                value={values.category}
                label="Category"
                type="text"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(
                  !values.category && touched.category && errors.category
                )}
                helperText={
                  !values.category && touched.category && errors.category
                }
              />
              <TextField
                margin="dense"
                fullWidth
                autoComplete="off"
                name="price"
                value={values.price}
                label="Price"
                type="number"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(!values.price && touched.price && errors.price)}
                helperText={!values.price && touched.price && errors.price}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddItemDialog;
