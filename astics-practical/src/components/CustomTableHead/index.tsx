import React, { FC } from "react";
import { IColumn } from "../../types/common";
import { Arrow } from "../../assets";

interface ICustomTableHeadProps {
  columns: IColumn[];
  handleSorting: (key: any) => void;
  order: any;
  orderBy: string;
}

const CustomTableHead: FC<ICustomTableHeadProps> = ({
  columns,
  handleSorting,
  order,
  orderBy,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((col: IColumn) => {
          return (
            <th
              key={col.key}
              onClick={col.sort ? () => handleSorting(col.key) : undefined}
              style={{ cursor: col.sort ? "pointer" : "inherit" }}
            >
              {col.column}{" "}
              {col.sort && col.key === orderBy && (
                <img
                  src={Arrow}
                  alt="sorting"
                  style={{
                    transform: `${
                      order === "asc" ? "rotate(0deg)" : "rotate(180deg)"
                    }`,
                  }}
                />
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CustomTableHead;
