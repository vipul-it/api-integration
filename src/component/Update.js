import axios from "axios";
import React, { useEffect, useState } from "react";
const Update = ({ selectedId, closeUpdate }) => {
  const handleCloseModal = () => {
    closeUpdate();
  };
  const [data, setData] = useState({
    productName: "",
    brand: "",
    category: "",
    description: "",
    price: "",
  });
  const handleInputChange = (e, field) => {
    setData({ ...data, [field]: e.target.value });
  }; 
  const fetchExitData = async () => {
   try{
    const response = await axios.get(
      `https://backend-crud-tau.vercel.app/api/products/${(selectedId)}`
    );
    setData(response.data)
    console.log(response.data);
   }catch(error){
    console.log(error);
   }
  };
  const fetchData = async () => {
    // e.preventDefault();
    try {
      const response = await axios.put(
        `https://backend-crud-tau.vercel.app/api/products/${selectedId}`,
        data
      );      
      console.log("Data updated successfully:", response.data);
      handleCloseModal();     
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  useEffect(() => {
    fetchExitData();
  }, [selectedId]);
  const handleSubmit = () => {
    fetchData();
  };
  return (
    <div>
      <div className="fixed inset-0 z-50 overflow-auto bg-black/50">
        <div className="max-w-lg   shadow-lg rounded-lg bg-white mx-auto p-4 lg:p-10 ">
          <div className="flex justify-between items-baseline py-4">
            <h1 className="text-xl font-bold">Update Product</h1>
            <button
              className="hover:bg-theme1light text-black/50 border border-black/20 font-poppins py-1 px-3  rounded-lg "
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          <div className="md:flex gap-4 ">
            <div className="text-start w-full">
              <label className="">Product Name</label>
              <input
                type=" text"
                name="productName"
                value={data.productName}
                onChange={(e) => handleInputChange(e, "productName")}
                className="p-2 w-full border bg-slate-100 border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
            </div>
            <div className="text-start w-full">
              <label className="">Brand</label>
              <input
                onChange={(e) => handleInputChange(e, "brand")}
                type=" text"
                name="brand"
                value={data.brand}
                className="p-2 w-full bg-slate-100 border border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
            </div>
          </div>
          <div className="md:flex gap-4 ">
            <div className="text-start w-full">
              <label className="">Category</label>
              <input
                onChange={(e) => handleInputChange(e, "category")}
                type="text"
                name="category"
                value={data.category}
                className="p-2 w-full bg-slate-100 border border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
            </div>
            <div className="text-start w-full">
              <label className="">Price</label>
              <input
                type=" text"
                onChange={(e) => handleInputChange(e, "price")}
                name="price"
                value={data.price}
                className="p-2 w-full bg-slate-100 border border-gray-200 hover:border-blue-500 rounded-lg"
                placeholder=""
              />
            </div>
          </div>
          <div className="text-start w-full py-2">
            <label className="">Description</label>
            <input
              type="text"
              onChange={(e) => handleInputChange(e, "description")}
              value={data.description}
              name="description"
              className="p-2 w-full border bg-slate-100  border-gray-200 hover:border-blue-500 rounded-lg"
              placeholder=""
            />
          </div>
          <div className="bg-blue-800 flex justify-center mx-auto items-center m-4 rounded-lg w-28 p-2">
            <button className="text-white " onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Update;
