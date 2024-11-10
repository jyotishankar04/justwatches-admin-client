import axiosApi from "./axiosConfig";
import { ICreateProduct, IUpdateProduct } from "./type";

const fetchProducts = async () => {
  try {
    const res = await axiosApi.get("/products");
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch products",
    };
  }
};

const fetchSession = async () => {
  try {
    const res = await axiosApi.get("/auth");
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch session",
    };
  }
};

const deleteProductApi = async (id: string) => {
  try {
    const res = await axiosApi.delete(`/products/${id}`);
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete product",
    };
  }
};
const fetchCollections = async () => {
  try {
    const res = await axiosApi.get("/collections");
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch collections",
    };
  }
};
const createProduct = async (data: ICreateProduct) => {
  try {
    const res = await axiosApi.post("/products", data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to create product",
    };
  }
};

const getProductById = async (id: string) => {
  try {
    const res = await axiosApi.get(`/products/${id}`);
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch product",
    };
  }
};

const updateProductApi = async (id: string, data: IUpdateProduct) => {
  try {
    const res = await axiosApi.patch(`/products/${id}`, data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update product",
    };
  }
};

const deleteCollectionApi = async (id: string) => {
  try {
    const res = await axiosApi.delete(`/collections/${id}`);
    if (!res.data.success) {
      return res.data;
    }
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete collection",
    };
  }
};

const updateCollectionApi = async (id: string, data: any) => {
  try {
    const res = await axiosApi.patch(`/collections/${id}`, data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update collection",
    };
  }
};
const createCollection = async (data: any) => {
  try {
    const res = await axiosApi.post("/collections", data);
    if (!res.data.success) {
      return {
        success: false,
        message: res.data.message,
      };
    }
    return res.data.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to create collection",
    };
  }
};

export {
  fetchProducts,
  fetchSession,
  deleteProductApi,
  fetchCollections,
  createProduct,
  getProductById,
  updateProductApi,
  deleteCollectionApi,
  updateCollectionApi,
  createCollection,
};
