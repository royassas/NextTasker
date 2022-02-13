import api from "./api";

const addCategory = (description, color) => {
  return api.post("/categories/add", {
    description,
    color
  });
};
const getCategories = (description, color) => {
  return api.get("/categories/", {

  });
};

const CategoryService = {
  addCategory,getCategories
};

export default CategoryService;