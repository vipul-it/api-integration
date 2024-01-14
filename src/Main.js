import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "./component/Modal";
import axios from "axios";
import Update from "./component/Update";
const Form = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdatedModal, setUpdateModal] = useState(false);
  const [selectedId, setSelectedid] = useState(null);
  //For Search data
  const [serachItem, setSearchItem] = useState("");
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
    setSelectedid(id);
  };
  const closeUpdate = () => {
    setUpdateModal(false);
    setSelectedid(null);
    fetchData();
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // Call the fetchData function
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // Display a confirmation dialog
    const userConfirmed = window.confirm("Are you sure you want to delete?");

    // Check if the user confirmed
    if (userConfirmed) {
      // Perform the deletion logic here
      console.log("Deletion logic executed");
    } else {
      // User canceled the deletion
      console.log("Deletion canceled");
    }
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
  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };
  // filter item
  const filterData = data.filter((item) =>
    item.productName.toLowerCase().includes(serachItem.toLowerCase())
  );
  return (
    <div className="">
      <Modal openModal={openModal} closeModal={handleCloseModal} />
      <div className=" md:m-4  px-10 py-3  overflow-auto z-30 top-0">
        <div className="flex justify-between bg-white">
          <div className="relative px-5 py-3 text-start rounded-lg w-1/2 border-gray-400 border hover:border-blue-500">
            <div className="flex items-center">
              <IoSearchOutline />
              <input
                className="w-full pl-4 outline-none ring-0 "
                type=" search"
                value={serachItem}
                onChange={handleSearch}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 items-center ">
            <div className="bg-blue-500 p-2 rounded-lg">
              <button className="text-white " onClick={handleOpenModal}>
                Add Product
              </button>
            </div>
          </div>
        </div>
        <div className=" mt-10">
          <div className=" mx-auto   w-full overflow-x-auto  ">
            <table className="my-0 text-dark border-neutral-600  w-full">
              <thead className="">
                <tr className="  font-bold  text-secondary-dark border-b">
                  <th className="py-2 text-start">PRODUCT</th>
                  <th className="py-2 text-start">CATEGORY</th>
                  <th className="py-2 text-start">BRAND</th>
                  <th className="py-2 text-start">DESCRIPTION</th>
                  <th className="py-2 text-start">PRICE</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((item, index) => (
                  <tr key={index} className="border-b  ">
                    <td className="py-2 text-start">{item.productName}</td>
                    <td className="py-2 text-start">{item.category}</td>
                    <td className="py-2 text-start">{item.brand}</td>
                    <td className="py-2 text-start">{item.description}</td>
                    <td className="py-2 text-start">{item.price}</td>
                    <td className="py-2 text-start text-blue-500">
                      <button onClick={() => openUpdate(item._id)}>
                        Update
                      </button>
                    </td>
                    <td className="py-2 text-start  text-red-500">
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
      {openUpdatedModal && (
        <Update closeUpdate={closeUpdate} selectedId={selectedId} />
      )}
    </div>
  );
};

export default Form;
