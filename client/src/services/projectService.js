import axios from "axios";
import API_URL from "../config/api";

export const getProjects = async () => {
  const response = await axios.get(
    `${API_URL}/project`
  );

  return response.data;
};