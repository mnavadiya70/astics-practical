import { IItem } from "../../types/item";
import axios from "../../utils/axios";

const getAll = async () => {
  const items: IItem[] = [];
  await axios.get("items.json").then((res) => {
    Object.keys(res.data)?.map((key) =>
      items.push({
        ...res.data[key],
        id: key,
      })
    );
  });
  return items;
};

const add = (data: IItem) => {
  const item = {
    id: "",
    name: data.name,
    category: data.category,
    description: data.description,
    price: data.price,
  };
  const res = axios.post(`items.json`, JSON.stringify(item));
  return res;
};

const update = (id: string, data: IItem) => {
  const item = {
    id: id,
    name: data.name,
    category: data.category,
    description: data.description,
    price: data.price,
  };
  const res = axios.put(`items/${id}.json`, JSON.stringify(item));
  return res;
};

const remove = (id: string) => {
  const res = axios.delete(`items/${id}.json`);
  return res;
};

export { getAll, add, update, remove };
