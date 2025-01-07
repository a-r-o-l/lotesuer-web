"use client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ISeller } from "@/models/Seller";
import React from "react";
import DatePicker from "./DatePicker";
import SellerSelect from "./SellerSelect";

function HomeTable({ sellers }: { sellers: ISeller[] }) {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row gap-5 justify-between">
        <div className="flex gap-4 p-4 items-center w-[300px]">
          <Label>Fecha</Label>
          <DatePicker url="/dashboard" />
        </div>
        <div className="flex gap-4 p-4 items-center w-[300px] justify-start">
          <Label>Usuario</Label>
          <SellerSelect sellers={sellers} url="/dashboard" />
        </div>
        <div className="flex border-b">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:border-l w-60">
            <span className="text-xs text-muted-foreground">
              Total recaudado
            </span>
            <span className="text-lg font-bold">
              {/* $ {total.toLocaleString("es-ES")} */}$ 25000
            </span>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>uno</TableHead>
            <TableHead>dos</TableHead>
            <TableHead>tres</TableHead>
            <TableHead>cuatro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>uno</TableCell>
            <TableCell>dos</TableCell>
            <TableCell>tres</TableCell>
            <TableCell>cuatro</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

export default HomeTable;
