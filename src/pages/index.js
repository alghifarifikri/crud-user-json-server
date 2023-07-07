import React, { useEffect, useState } from "react";
import ListUser from "./component";
import { useDispatch, useSelector } from "react-redux";
import {
  clear,
  deleteUser,
  fetchUsers,
  postUser,
  updateUser,
} from "../redux/slice/userSlice";
import Loading from "../components/Loading";

const itemsPerPage = 5;

export default function Main() {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.users.users);
  const loadingData = useSelector((state) => state.users.loading);
  const errorData = useSelector((state) => state.users.error);
  const successData = useSelector((state) => state.users.success);
  const [users, setUsers] = useState(usersData);
  const [isOpen, setIsOpen] = useState(false);
  const [isRow, setIsRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isMessage, setIsMessage] = useState("");
  const [isType, setIsType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [paging, setIsPaging] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    setIsAlert(errorData || successData ? true : false);
    setIsMessage(errorData ? errorData : "Update Successfully");
    setIsType(errorData ? "error" : "success");
    setTimeout(() => {
      setIsAlert(false);
      setIsMessage("");
      setIsType("");
      dispatch(clear());
    }, 2000);
  }, [dispatch, errorData, successData]);

  useEffect(() => {
    setUsers(getCurrentPageData(usersData));
  }, [usersData]);

  useEffect(() => {
    const total = Math.ceil(usersData.length / itemsPerPage);
    setIsPaging({
      currentPage: paging.currentPage,
      totalPages: total > 0 ? total : 1,
    });
  }, [users]);

  useEffect(() => {
    setUsers(getCurrentPageData(usersData));
  }, [paging.currentPage]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!loadingData) {
      handleModal(false);
      setIsDelete(false);
      setIsRow({});
    }
  }, [loadingData]);

  const handleChangeSearch = (param) => {
    setSearchValue(param.target.value);
  };

  const handlePageChange = (page) => {
    setIsPaging({
      currentPage: page,
      totalPages: paging.totalPages,
    });
  };

  const handleModal = (param) => {
    setIsOpen(param);
    if (!param) {
      setIsEdit(false);
      setIsRow({});
    }
  };

  const handleModalDelete = (param) => {
    setIsDelete(!isDelete);
    setIsRow(!param ? {} : param);
  };

  const handleEdit = (param) => {
    setIsRow(param);
    setIsEdit(!isEdit);
    handleModal(!isOpen);
  };

  const handleChangeRow = (param) => {
    const temp = { ...isRow, ...param };
    setIsRow(temp);
  };

  const handleSubmit = () => {
    if (searchValue === "") {
      setUsers(getCurrentPageData(usersData));
    } else {
      const filteredData = usersData.filter((item) => {
        const { firstname, lastname, username, email } = item;
        return (
          firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
          lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
          username.toLowerCase().includes(searchValue.toLowerCase()) ||
          email.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setUsers(getCurrentPageData(filteredData));
    }
  };

  const handleSort = (key) => {
    let sorted;
    if (sortDirection === "asc") {
      sorted = [...usersData].sort((a, b) => a[key].localeCompare(b[key]));
      setSortDirection("desc");
    } else {
      sorted = [...usersData].sort((a, b) => b[key].localeCompare(a[key]));
      setSortDirection("asc");
    }
    setUsers(getCurrentPageData(sorted));
  };

  const handleCrudUser = () => {
    const payload = {
      ...isRow,
      id:
        isEdit || isDelete
          ? isRow.id
          : Math.random().toString(36).substring(2, 9), // Membuat ID unik secara acak
    };
    dispatch(
      isEdit
        ? updateUser(payload)
        : isDelete
        ? deleteUser(payload)
        : postUser(payload)
    );
  };

  const getCurrentPageData = (param) => {
    const startIndex = (paging.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const temp = param?.slice(startIndex, endIndex);
    return temp;
  };

  return (
    <>
      {loadingData ? (
        <Loading />
      ) : (
        <ListUser
          dataSource={users}
          isOpen={isOpen}
          isRow={isRow}
          isEdit={isEdit}
          isAlert={isAlert}
          isMessage={isMessage}
          isType={isType}
          isDelete={isDelete}
          paging={paging}
          searchValue={searchValue}
          sortDirection={sortDirection}
          handleModal={(param) => handleModal(param)}
          handleModalDelete={(param) => handleModalDelete(param)}
          handleEdit={(param) => handleEdit(param)}
          handleChangeRow={(param) => handleChangeRow(param)}
          handleCrudUser={handleCrudUser}
          handleSubmit={handleSubmit}
          handlePageChange={(param) => handlePageChange(param)}
          handleChangeSearch={(param) => handleChangeSearch(param)}
          handleSort={(param) => handleSort(param)}
        />
      )}
    </>
  );
}
