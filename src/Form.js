import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Model from "./component/Model";
import axios from "axios";
const Form = () => {
  const [openModal, setOpenModel] = useState(false);
  const handleOpenModel = () => {
    setOpenModel(true);
  };
  const handleCloseModel = () => {
    setOpenModel(false);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    // Axios GET request
    axios
      .get("http://localhost:5000/api/products/")
      .then((response) => {
        // Handle successful response
        setData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (id) => {
   try{
    const response = await axios.delete(`http://localhost:5000/api/products/${id}`)    
      console.log(response.data);   
   
  }catch(error){
    console.log(error);
  }
}
  return (
    <div className="">
      <div className="md:m-4 shadow-md px-10 py-5 min-h-max z-30 top-0">
        <Model openModel={openModal} closeModel={handleCloseModel} />
        <div className="flex justify-between bg-white">
          <div className="relative px-4 py-2 rounded-lg w-1/2 border-gray-400 border hover:border-blue-500">
            <div className=" absolute top-3">
              <IoSearchOutline />
              {/* <label className="top-0">Search</label> */}
            </div>
            <input
              className="w-full pl-4  outline-none ring-0 "
              type=" search"
              placeholder="Search"
            />
          </div>
          <div className="w-1/3 flex justify-end gap-4 items-center ">
            <div className="bg-blue-500 p-2 rounded-lg">
              <button className="text-white text-sm" onClick={handleOpenModel}>
                Add Section
              </button>
            </div>
            <div className="">
              <p className="px-4 py-1  border-gray-400 border-2 hover:border-blue-500">
                Filter
              </p>
            </div>
          </div>
        </div>
        <div className="flex  mt-10">
          <div className="overflow-x-auto ">
            <table className="my-0 text-dark border-neutral-200">
              <thead className="">
                <tr className="font-bold text-sm text-secondary-dark border-b">
                  <th className="">PRODUCT</th>
                  <th className="">CATEGORY</th>
                  <th className="">BRAND</th>
                  <th className="">DESCRIPTION</th>
                  <th className="">PRICE</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b font-semibold">
                    <td className="p-3  text-end text-sm">
                      {item.productName}
                    </td>
                    <td className="p-3  text-end text-sm">{item.category}</td>
                    <td className="p-3  text-end text-sm ">{item.brand}</td>
                    <td className="p-3  text-end text-sm ">
                      {item.description}
                    </td>
                    <td className="p-3  text-end text-sm ">{item.price}</td>
                    <td className="p-3  text-end text-sm "><button onClick={()=>handleDelete(item._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
