import React, { FC } from "react";
import { IColumn } from "../../types/common";
import CustomTableHead from "../CustomTableHead";

interface ICustomTableProps {
  data: any[];
  columns: IColumn[];
  handleSorting: (key: any) => void;
  order: any;
  orderBy: string;
}

const CustomTable: FC<ICustomTableProps> = ({
  data,
  columns,
  handleSorting,
  order,
  orderBy,
}) => {
  return (
    <table>
      <CustomTableHead
        columns={columns}
        handleSorting={handleSorting}
        order={order}
        orderBy={orderBy}
      />
      <tbody>
        {data && data.length > 0 ? (
          data.map((item: any, index) => {
            return (
              <tr key={index}>
                {columns.map((col) => {
                  const value = col.render
                    ? col.render(item)
                    : item[col.key]
                    ? item[col.key]
                    : "-";
                  return <td>{value}</td>;
                })}
              </tr>
            );
          })
        ) : (
          <tr className="no-data">No data found</tr>
        )}
      </tbody>
    </table>
  );
};

export default CustomTable;
