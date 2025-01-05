"use server";

import dbConnect from "@/lib/mongoose";
import models from "@/models";

export const createAccount = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const newAccount = new models.Account({
      username: formData.username,
      password: formData.password,
      role: formData.role,
      imageUrl: formData.imageUrl,
    });
    await newAccount.save();
    return {
      success: true,
      message: "Cuenta creada correctamente",
      product: JSON.parse(JSON.stringify(newAccount)),
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Error al crear el producto, intente nuevamente",
    };
  }
};
