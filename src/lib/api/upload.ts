// src/lib/api/upload.ts
import axiosInstance from "./axios";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};