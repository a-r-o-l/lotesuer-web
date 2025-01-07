import { getAllSellers } from "@/server/sellerAction";
import React from "react";
import HomeTable from "./components/HomeTable";
import { getSalesBetweenSellers } from "@/server/saleAction";

export default async function HomeScreen({
  searchParams,
}: {
  searchParams: Promise<{ start: string; end: string; seller: string }>;
}) {
  const param = await searchParams;
  const start = param.start;
  const end = param.end;
  const seller = param.seller;
  const sellers = await getAllSellers();
  const sales = await getSalesBetweenSellers(start, end, seller);

  console.log(sales);

  return (
    <div className="container mx-auto p-5 py-5">
      <h1 className="text-2xl font-bold">Inicio</h1>
      <HomeTable sellers={sellers.data} />
    </div>
  );
}
