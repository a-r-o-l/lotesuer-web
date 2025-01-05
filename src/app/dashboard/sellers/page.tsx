import React from "react";
import CardSellers from "./components/CardSellers";
import { getAllSellers } from "@/server/sellerAction";

async function page() {
  const query = await getAllSellers();
  const sellers = query.data;
  return (
    <div className="container mx-auto p-5 py-20">
      <h1 className="text-3xl font-bold">Vendedores</h1>
      <CardSellers sellers={sellers} />
    </div>
  );
}

export default page;
