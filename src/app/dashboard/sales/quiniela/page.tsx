import React from "react";
import SalesCard from "../components/SalesCard";
import { getAllSellers } from "@/server/sellerAction";
import { getSaleByDate } from "@/server/saleAction";

interface SearchParams {
  date?: string;
  seller?: string;
}

async function page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = await getAllSellers();
  const sellers = query.data;
  const param = await searchParams;
  const date = param.date;
  const { data } = await getSaleByDate(date);
  return (
    <div className="container mx-auto p-5 py-20">
      <h1 className="text-3xl font-bold">Quiniela</h1>
      <SalesCard sellers={sellers} sales={data} />
    </div>
  );
}

export default page;
