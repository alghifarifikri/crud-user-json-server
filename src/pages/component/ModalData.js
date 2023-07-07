import React, { useEffect, useMemo, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import Dropdown from "../../components/Dropdown";
import { roleAccess } from "../../utils/data";
import { validateEmail } from "../../utils/regex";

export default function ModalData({
  isRow,
  isEdit,
  handleModal,
  handleChangeRow,
  handleCrudUser,
}) {
  const isDisabled = useMemo(() => {
    return (
      !isRow.username ||
      !isRow.firstname ||
      !isRow.lastname ||
      !isRow.email ||
      !isRow.groupAccess ||
      !isRow.expiredDate ||
      !isRow.password ||
      !isRow.confirmPassword ||
      isRow.password !== isRow.confirmPassword ||
      validateEmail(isRow.email) === false
    );
  }, [isRow]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg relative -mt-15">
          <h2 className="text-xl font-bold mb-4">
            {isEdit ? "Edit User" : "Create User"}
          </h2>
          <Input
            type="text"
            label={"First Name"}
            value={isRow.firstname}
            keyJson="firstname"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="text"
            label={"Last Name"}
            value={isRow.lastname}
            keyJson="lastname"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="text"
            label={"Username"}
            value={isRow.username}
            keyJson="username"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="email"
            label={"Email"}
            value={isRow.email}
            keyJson="email"
            onChange={(param) => handleChangeRow(param)}
          />
          <Dropdown
            type="password"
            label={"Group Access"}
            options={roleAccess}
            value={isRow.groupAccess}
            keyJson="groupAccess"
            onChange={(param) => handleChangeRow(param)}
          />
          <Input
            type="date"
            label={"Expired Date"}
            value={isRow.expiredDate}
            keyJson="expiredDate"
            onChange={(param) => handleChangeRow(param)}
          />
          <InputPassword
            type="password"
            label={"Password"}
            value={isRow.password}
            pass={isRow.confirmPassword}
            keyJson="password"
            onChange={(param) => handleChangeRow(param)}
          />
          <InputPassword
            type="password"
            label={"Conf. Password"}
            value={isRow.confirmPassword}
            pass={isRow.password}
            keyJson="confirmPassword"
            onChange={(param) => handleChangeRow(param)}
          />
          <div className="float-right">
            <Button
              className={
                "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mb-2"
              }
              label={"Cancel"}
              onClick={() => handleModal(false)}
            />
            <Button
              className={`${
                isDisabled
                  ? "bg-gray-500 hover:bg-gray-700"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-lg sm:w-auto mb-2 ml-1`}
              label={"Submit"}
              disabled={isDisabled}
              onClick={handleCrudUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
