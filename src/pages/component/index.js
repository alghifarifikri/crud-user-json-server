import React, { Suspense, lazy } from "react";
import { header, mapUser } from "../../utils/data";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Searchbar from "../../components/Searchbar";
import Empty from "../../components/Empty";

const ModalData = lazy(() => import("./ModalData"));
const ModalDelete = lazy(() => import("./ModalDelete"));
const Alert = lazy(() => import("../../components/Alert"));

export default function ListUser({
  dataSource,
  isOpen,
  isDelete,
  isRow,
  isEdit,
  isAlert,
  isMessage,
  isType,
  paging,
  sortDirection,
  searchValue,
  handleModal,
  handleModalDelete,
  handleEdit,
  handleChangeRow,
  handleCrudUser,
  handlePageChange,
  handleChangeSearch,
  handleSubmit,
  handleSort,
}) {
  return (
    <div>
      <p className="App text-base sm:text-2xl mt-5">
        User Management Role Access
      </p>
      <br />
      {isAlert && (
        <Suspense>
          <Alert message={isMessage} type={isType} />
        </Suspense>
      )}
      <br />
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex flex-grow items-center">
          <Searchbar
            searchValue={searchValue}
            handleChange={(param) => handleChangeSearch(param)}
            handleSubmit={handleSubmit}
          />
        </div>
        <div>
          <Button
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto"
            }
            label={"Create"}
            onClick={() => handleModal(true)}
          />
        </div>
      </div>
      {dataSource?.length === 0 ? (
        <Empty />
      ) : (
        <Table
          dataSource={dataSource}
          column={header}
          mapping={mapUser}
          sortDirection={sortDirection}
          handleEdit={(param) => handleEdit(param)}
          handleModalDelete={(param) => handleModalDelete(param)}
          handleSort={(param) => handleSort(param)}
        />
      )}
      <Pagination
        currentPage={paging.currentPage}
        totalPages={paging.totalPages}
        onPageChange={(param) => handlePageChange(param)}
      />
      {isOpen && (
        <Suspense>
          <ModalData
            isRow={isRow}
            isEdit={isEdit}
            handleModal={(param) => handleModal(param)}
            handleChangeRow={(param) => handleChangeRow(param)}
            handleCrudUser={handleCrudUser}
          />
        </Suspense>
      )}
      {isDelete && (
        <Suspense>
          <ModalDelete
            handleModalDelete={(param) => handleModalDelete(param)}
            handleCrudUser={handleCrudUser}
          />
        </Suspense>
      )}
    </div>
  );
}
