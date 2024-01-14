import axios from "axios";
import React, { useState } from "react";
const Modal = ({ openModal, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
  };
  const [data, setData] = useState({
    productName: "",
    brand: "",
    category: "",
    description: "",
    price: "",
  });
  const [error, setError] = useState({});
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    if (data.productName === "" || !data.productName.trim()) {
      newError.productName = "Product name is required";
    }else{
      newError.productName = "";
    }
    if (data.brand === "") {
      newError.brand = "Brand name required";
    }
    if (data.category === "") {
      newError.category = "Category is required";
    }
    if (isNaN(data.price)) {
      newError.price = "Enter Only Number ";
    } else if (data.price === "") {
      newError.price = "Category is required";
    }
    if (Object.keys(newError).length === 0) {
      alert("Form Submited Succesfully");
      handleCloseModal();
    }
    setError(newError);

    try {
      const response = await axios.post(
        "https://backend-crud-tau.vercel.app/api/products/",
        data
      );
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching data:", error);
    } finally{
      handleCloseModal();
    }
    
  };
  return (
    <div>
      <div
        className={`fixed inset-0 z-50 overflow-auto bg-black/50 ${
          openModal ? "block" : "hidden"
        }`}
      >
        <form className="max-w-lg   shadow-lg rounded-lg bg-white mx-auto p-4 lg:p-10 ">
          <div className="flex justify-between items-baseline py-4">
            <h1 className="text-xl font-bold">Add Product</h1>
            <button
              className="hover:bg-theme1light text-black/50 border border-black/20 font-poppins py-1 px-3  rounded-lg "
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          <form className="md:flex gap-4 " >
            <div className="text-start w-full">
              <label className="">Product Name</label>
              <input
                onChange={changeHandler}
                type=" text"
                name="productName"
                className="p-2 w-full border bg-slate-100 border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder="" 
              />
              <div className="text-red-600 font-semibold">
                {error.productName}
              </div>
            </div>
            <div className="text-start w-full">
              <label className="">Brand</label>
              <input
                onChange={changeHandler}
                type=" text"
                name="brand"
                className="p-2 w-full bg-slate-100 border border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
              <div className="text-red-600 font-semibold">{error.brand}</div>
            </div>
          </form>
          <div className="md:flex gap-4 ">
            <div className="text-start w-full">
              <label className="">Category</label>
              <input
                onChange={changeHandler}
                type="text"
                name="category"
                className="p-2 w-full bg-slate-100 border border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
              <div className="text-red-600 font-semibold">{error.category}</div>
            </div>
            <div className="text-start w-full">
              <label className="">Price</label>
              <input
                type=" text"
                onChange={changeHandler}
                name="price"
                className="p-2 w-full bg-slate-100 border border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
              <div className="text-red-600 font-semibold">{error.price}</div>
            </div>
          </div>
          <div className="text-start w-full py-2">
            <label className="">Description</label>
            <input
              type="text"
              onChange={changeHandler}
              description="description"
              name="description"
              className="p-2 w-full border bg-slate-100  border-gray-200 hover:border-blue-500 rounded-lg"
              placeholder=""
            />
          </div>
          <div
            onClick={handleSubmit}
            className="bg-blue-800 flex justify-center mx-auto items-center m-4 rounded-lg w-28 p-2"
          >
            <button className="text-white ">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
