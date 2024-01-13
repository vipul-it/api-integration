import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "./component/Modal";
import axios from "axios";
import Update from "./component/Update";
const Form = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdatedModal, setUpdateModal] = useState(false);
  const[selectedId, setSelectedid] = useState(null);
  const fetchData = async () => {
    try {
      // Make a GET request
      const response = await axios.get(
        "https://backend-crud-tau.vercel.app/api/products/"
      );
      console.log("Received data from GET request:", response.data);
      // Update state with the fetched data
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };  
  const openUpdate = (id) => {
    setUpdateModal(true);
    setSelectedid(id)
  };
  const closeUpdate = () => {
    setUpdateModal(false);
    setSelectedid(null);
  };
  const handleOpenModal =() => {
    setOpenModal(true);
  };
  const handleCloseModal =() => {
    setOpenModal(false);
    fetchData();
  };
  

  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://backend-crud-tau.vercel.app/api/products/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
    }
  };
  return (
    <div className="">
      <Modal openModal={openModal} closeModal={handleCloseModal} />
      <div className=" md:m-4 shadow-md px-10 py-5  overflow-auto z-30 top-0">
        <div className="flex justify-between bg-white">
          <div className="relative px-4 py-2 rounded-lg w-1/2 border-gray-400 border hover:border-blue-500">
            <div className=" absolute top-3">
              <IoSearchOutline />
              {/* <label className="top-0">Search</label> */}
            </div>
            <input
              className="w-full pl-4 outline-none ring-0 "
              type=" search"
              placeholder="Search"
            />
          </div>
          <div className="w-1/3 flex justify-end gap-4 items-center ">
            <div className="bg-blue-500 p-2 rounded-lg">
              <button className="text-white text-sm" onClick={handleOpenModal}>
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
        <div className="  mt-10">
          <div className="flex justify-center mx-auto   w-full overflow-x-auto  ">
            <table className="my-0 text-dark border-neutral-600 w-full">
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
                    <td className="p-3 text-sm">{item.productName}</td>
                    <td className="p-3 text-sm">{item.category}</td>
                    <td className="p-3 text-sm ">{item.brand}</td>
                    <td className="p-3 text-sm ">{item.description}</td>
                    <td className="p-3 text-sm ">{item.price}</td>
                    <td className="p-3 text-sm ">
                    <button onClick={()=>openUpdate(item._id)} >
                    Update
                      </button> 
                    </td>
                    <td className="p-3 text-sm ">
                      <button onClick={() => handleDelete(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {openUpdatedModal && ( <Update  closeUpdate={closeUpdate}  selectedId={selectedId} />)}
    </div>
  );
};

export default Form;
