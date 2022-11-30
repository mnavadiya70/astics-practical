import { IUser } from "../../types/users";
import axios from "../../utils/axios";

const add = (data: IUser) => {
  const item = {
    id: "",
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
  };
  const res = axios.post(`users.json`, JSON.stringify(item));
  return res;
};

export { add };
