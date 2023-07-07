import React from "react";
import Button from "./Button";
import Sorting from "./Sorting";
import { roleAccess } from "../utils/data";

export default function Table({
  dataSource,
  column,
  mapping,
  sortDirection,
  handleEdit,
  handleModalDelete,
  handleSort,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {column?.map((item, index) => {
            return (
              <th
                key={index}
                className="py-3 px-6 bg-gray-100 font-bold text-sm sm:text-base"
              >
                <div className="flex items-center">
                  {item}
                  {["First Name", "Last Name", "Username", "Email"].includes(
                    item
                  ) && (
                    <div className="ml-1">
                      <Sorting
                        label="↑"
                        active={sortDirection === "asc"}
                        onClick={() =>
                          handleSort(item?.replace(/\s+/g, "")?.toLowerCase())
                        }
                      />
                      <Sorting
                        label="↓"
                        active={sortDirection === "desc"}
                        onClick={() =>
                          handleSort(item?.replace(/\s+/g, "")?.toLowerCase())
                        }
                      />
                    </div>
                  )}
                </div>
              </th>
            );
          })}
        </thead>
        <tbody>
          {dataSource?.map((data, index) => {
            return (
              <>
                <tr
                  className={
                    index % 2 === 0
                      ? "bg-blue-100 hover:bg-red-100 transition-colors"
                      : "bg-white hover:bg-red-100 transition-colors"
                  }
                  key={index}
                >
                  {mapping?.map((map, i) => {
                    return (
                      <td
                        key={i}
                        className="py-4 px-6 border-b border-gray-200 text-sm sm:text-base"
                      >
                        {map === "action" ? (
                          <>
                            <Button
                              className={
                                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto mr-2"
                              }
                              label={"Edit"}
                              onClick={() => handleEdit(data)}
                            />
                            |
                            <Button
                              className={
                                "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg sm:w-auto ml-2"
                              }
                              label={"Delete"}
                              onClick={() => handleModalDelete(data)}
                            />
                          </>
                        ) : map === "No." ? (
                          index + 1
                        ) : map === "groupAccess" ? (
                          <>
                            {
                              roleAccess?.filter((role) => {
                                return role.value === data?.[map];
                              })?.[0]?.label
                            }
                          </>
                        ) : (
                          data?.[map]
                        )}
                      </td>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
