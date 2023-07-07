import React from "react";
import Button from "../../components/Button";

export default function ModalDelete({ handleModalDelete, handleCrudUser }) {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg relative -mt-20">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          Are you sure want to delete this user ?
          <div className="float-right mt-5">
            <Button
              className={
                "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mb-2"
              }
              label={"Cancel"}
              onClick={() => handleModalDelete({})}
            />
            <Button
              className={
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mb-2 ml-1"
              }
              label={"Delete"}
              onClick={handleCrudUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
