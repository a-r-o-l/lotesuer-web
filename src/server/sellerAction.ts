"use server";
import dbConnect from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import models from "@/models/index";

export const getAllSellers = async () => {
  try {
    await dbConnect();
    const sellers = await models.Seller.find();
    const sortedSellers = sellers.sort((a, b) => {
      return a.sellerNumber.localeCompare(b.sellerNumber, undefined, {
        numeric: true,
      });
    });
    return {
      success: true,
      message: "Vendedores encontrados.",
      data: JSON.parse(JSON.stringify(sortedSellers)),
    };
  } catch (error) {
    console.error("Error obteniendo los vendedores:", error);
    return {
      success: false,
      message: "Error al obtener los vendedores, intente nuevamente.",
      data: [],
    };
  }
};

export const createSeller = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const existSeller = await models.Seller.findOne({
      sellerNumber: formData.sellerNumber,
    });
    if (existSeller) {
      return {
        success: false,
        message: "El número de vendedor ya existe.",
        data: null,
      };
    }
    const newSeller = new models.Seller({
      sellerNumber: formData.sellerNumber,
      name: formData.name,
      lastname: formData.lastname,
      dni: formData.dni,
      phone: formData.phone,
      address: formData.address,
      machineNumber: formData.machineNumber,
      percent: {},
    });
    await newSeller.save();
    revalidatePath("/dashboard/sellers");
    return {
      success: true,
      message: "Vendedor creado correctamente.",
      data: JSON.parse(JSON.stringify(newSeller)),
    };
  } catch (error) {
    console.error("Error creando el vendedor:", error);
    return {
      success: false,
      message: "Error al crear el vendedor, intente nuevamente.",
      data: null,
    };
  }
};

export const updateSeller = async (
  data: FormData,
  percent: boolean | undefined = false
) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const existSeller = await models.Seller.findOne({
      sellerNumber: formData.sellerNumber,
    });
    if (existSeller) {
      if (existSeller.id !== formData.id) {
        return {
          success: false,
          message: "El número de vendedor ya existe.",
          data: null,
        };
      }
    }
    const seller = await models.Seller.findById(formData.id);
    if (!seller) {
      return {
        success: false,
        message: "Vendedor no encontrado.",
        data: null,
      };
    }
    if (percent) {
      const objData = {
        quiniela: formData.quiniela,
        loto: formData.loto,
        quini6: formData.quini6,
        brinco: formData.brinco,
        loto5: formData.loto5,
        poceada: formData.poceada,
        express: formData.express,
        telekino: formData.telekino,
        telebingo: formData.telebingo,
      };
      seller.percent = objData;
    } else {
      seller.sellerNumber = formData.sellerNumber;
      seller.name = formData.name;
      seller.lastname = formData.lastname;
      seller.dni = formData.dni;
      seller.phone = formData.phone;
      seller.address = formData.address;
      seller.machineNumber = formData.machineNumber;
    }
    await seller.save();
    revalidatePath("/dashboard/sellers");
    return {
      success: true,
      message: "Vendedor actualizado correctamente.",
      data: JSON.parse(JSON.stringify(seller)),
    };
  } catch (error) {
    console.error("Error actualizando el vendedor:", error);
    return {
      success: false,
      message: "Error al actualizar el vendedor, intente nuevamente.",
      data: null,
    };
  }
};

export const deleteSeller = async (id: string) => {
  try {
    await dbConnect();
    const seller = await models.Seller.findByIdAndDelete(id);
    revalidatePath("/dashboard/sellers");
    return {
      success: true,
      message: "Vendedor eliminado correctamente.",
      data: JSON.parse(JSON.stringify(seller)),
    };
  } catch (error) {
    console.error("Error eliminando el vendedor:", error);
    return {
      success: false,
      message: "Error al eliminar el vendedor, intente nuevamente.",
      data: null,
    };
  }
};
