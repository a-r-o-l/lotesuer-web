"use server";
import dbConnect from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import models from "@/models/index";
import { toDate } from "date-fns-tz";

export const getAllSales = async () => {
  try {
    await dbConnect();
    const sales = await models.Sale.find();
    return {
      success: true,
      message: "Ventas encontradas.",
      data: JSON.parse(JSON.stringify(sales)),
    };
  } catch (error) {
    console.error("Error obteniendo las ventas:", error);
    return {
      success: false,
      message: "Error al obtener las ventas, intente nuevamente.",
      data: [],
    };
  }
};

export const getSaleById = async (id: string) => {
  try {
    await dbConnect();
    const sale = await models.Sale.findById(id);
    return {
      success: true,
      message: "Venta encontrada.",
      data: JSON.parse(JSON.stringify(sale)),
    };
  } catch (error) {
    console.error("Error obteniendo la venta:", error);
    return {
      success: false,
      message: "Error al obtener la venta, intente nuevamente.",
      data: null,
    };
  }
};

export const getSaleByDate = async (date?: string) => {
  if (!date) {
    return {
      success: false,
      message: "No selecciono ninguna fecha.",
      data: null,
    };
  }
  try {
    await dbConnect();
    const sales = await models.Sale.find({ date });
    return {
      success: true,
      message: "Venta encontrada.",
      data: JSON.parse(JSON.stringify(sales)),
    };
  } catch (error) {
    console.error("Error obteniendo las ventas:", error);
    return {
      success: false,
      message: "Error al obtener las ventas, intente nuevamente.",
      data: null,
    };
  }
};

export const createSale = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const newSale = new models.Sale({
      quiniela: formData.quiniela,
      loto: formData.loto,
      quini6: formData.quini6,
      brinco: formData.brinco,
      poceada: formData.poceada,
      loto5: formData.loto5,
      express: formData.express,
      premios: formData.premios,
      total: formData.total,
      paga: formData.paga,
      saldo: formData.saldo,
      sellerId: formData.sellerId,
      date: formData.date,
    });
    await newSale.save();
    revalidatePath(`/dashboard/sales/quiniela?date=${formData.date}`);
    return {
      success: true,
      message: "Venta creada correctamente.",
      data: JSON.parse(JSON.stringify(newSale)),
    };
  } catch (error) {
    console.error("Error creando la venta:", error);
    return {
      success: false,
      message: "Error al crear la venta, intente nuevamente.",
      data: null,
    };
  }
};

export const updateSale = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const sale = await models.Sale.findById(formData.id);
    sale.quiniela = formData.quiniela;
    sale.loto = formData.loto;
    sale.quini6 = formData.quini6;
    sale.brinco = formData.brinco;
    sale.poceada = formData.poceada;
    sale.loto5 = formData.loto5;
    sale.express = formData.express;
    sale.premios = formData.premios;
    sale.total = formData.total;
    sale.paga = formData.paga;
    sale.saldo = formData.saldo;
    await sale.save();
    revalidatePath(`/dashboard/sales/quiniela?date=${formData.date}`);
    return {
      success: true,
      message: "Venta actualizada correctamente.",
      data: JSON.parse(JSON.stringify(sale)),
    };
  } catch (error) {
    console.error("Error actualizando la venta:", error);
    return {
      success: false,
      message: "Error al actualizar la venta, intente nuevamente.",
      data: null,
    };
  }
};

export const deleteSale = async (id: string, date: string) => {
  try {
    await dbConnect();
    await models.Sale.findByIdAndDelete(id);
    revalidatePath(`/dashboard/sales/quiniela?date=${date}`);
    return {
      success: true,
      message: "Venta eliminada correctamente.",
      data: null,
    };
  } catch (error) {
    console.error("Error eliminando la venta:", error);
    return {
      success: false,
      message: "Error al eliminar la venta, intente nuevamente.",
      data: null,
    };
  }
};

export const getSalesBetweenSellers = async (
  start: string,
  end: string,
  seller: string
) => {
  await dbConnect();
  const query: {
    $expr?: {
      $and: [
        { $gte: [{ $dateFromString: { dateString: string } }, Date] },
        { $lte: [{ $dateFromString: { dateString: string } }, Date] }
      ];
    };
    sellerId?: string;
  } = {};
  if (start && end) {
    const timeZone = "America/Argentina/Buenos_Aires";

    const startDate = toDate(start, { timeZone });
    const endDate = toDate(end, { timeZone });
    // endDate.setHours(23, 59, 59, 999);

    // console.log("sd -> ", startDate);
    // console.log("ed -> ", endDate);

    query.$expr = {
      $and: [
        { $gte: [{ $dateFromString: { dateString: "$date" } }, startDate] },
        { $lte: [{ $dateFromString: { dateString: "$date" } }, endDate] },
      ],
    };
  }
  if (seller && seller !== "all") {
    query.sellerId = seller;
  }
  const sales = await models.Sale.find(query).populate("sellerId");

  // let allUsers = [];
  // if (seller === "all" || !seller) {
  // allUsers = await models.Account.find().select("username").lean();
  // allUsers = allUsers.map((u) => u.username);
  // }

  // const groupedSales = sales.reduce((acc, sale) => {
  //   const date = new Date(sale.date).toLocaleDateString("en-US", {
  //     timeZone: "UTC",
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });
  //   const username = sale.accountId.username;

  //   if (!acc[date]) {
  //     acc[date] = { date };
  //   }
  //   if (!acc[date][username]) {
  //     acc[date][username] = 0;
  //   }
  //   acc[date][username] += sale.total;

  //   return acc;
  // }, {});

  // if (seller === "all" || !seller) {
  //   Object.values(groupedSales).forEach((entry) => {
  //     allUsers.forEach((username) => {
  //       if (!entry[username]) {
  //         entry[username] = 0;
  //       }
  //     });
  //   });
  // }
  // const result = Object.values(groupedSales);

  return JSON.parse(JSON.stringify(sales));
};
