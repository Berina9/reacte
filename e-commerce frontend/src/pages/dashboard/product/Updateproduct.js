import React, { useState } from "react";
import Genericinput from "../../../components/Genericinput";
import { Formik, Form } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../components/hooks/useFetch";
import usePut from "../../../components/hooks/usePut";
import Loading from "../../../components/Loading";

function UpdateProduct() {
  const [files, setfile] = useState([]);
  const { id } = useParams();
  const navigate=useNavigate();
  const {
    data: initialValues,
    loading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_URL}/Product/${id}`);
  const { loading: isUpdating, mutate } = usePut(
    `${process.env.REACT_APP_API_URL}/Product/${id}`,
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        navigate("/dashboard/listProduct");
      },
      onError: (error) => {
        toast.success(
          error?.response?.data?.message || "Product update failed"
        );
      },
    }
  );

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("brand", values.brand);
    formData.append("price", values.price);
    formData.append("images", files);
    [...files].forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });
    mutate(formData);
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/product`, formData)
    //   .then((res) => {
    //     toast.success(res.data?.message);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response?.data?.message);
    //   });
  };
  const onChange = (event) => {
    if (event.target.files) {
      setfile(event.target.files);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col items-start py-12 min-h-lvh sm:px-6 lg:px-8">
        <div className="mt-8 sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues?.data}
              enableReinitialize
            >
              <Form className="space-y-4">
                <Genericinput
                  label="Product Name"
                  name="name"
                  type="text"
                  placeholder="Product name"
                />
                <Genericinput
                  label="Price"
                  name="price"
                  type="number"
                  placeholder="Price"
                />
                <Genericinput
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Enter a Description"
                />
                <Genericinput
                  label="Brand"
                  name="brand"
                  type="text"
                  placeholder="Enter a brand name"
                />
                <Genericinput
                  label=" Select Images"
                  name="image"
                  type="file"
                  placeholder="Select Product Images"
                  multiple="multiple"
                  onChange={onChange}
                  required={false}
                />
                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex justify-center w-full disabled:bg-orange-950 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update a Product
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateProduct;
