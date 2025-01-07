"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useMemo } from "react";
import SellerDropDownMenu from "./SellerDropDownMenu";
import { ISeller } from "@/models/Seller";

function SellerTable({
  sellers,
  onOpenModal,
  onOpenAlert,
}: {
  sellers: ISeller[];
  onOpenModal: (seller?: ISeller) => void;
  onCloseModal: () => void;
  onOpenAlert: (sellerId?: string) => void;
}) {
  const windowHeight = useMemo(() => {
    return window.innerHeight ? Math.floor(window.innerHeight / 2) : 500;
  }, []);

  return (
    <div className="relative w-full border rounded-lg">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background border-b">
          <TableRow className="">
            <TableHead className="w-[100px] text-left">N° Vendedor</TableHead>
            <TableHead className="w-[100px] text-left">Nombre</TableHead>
            <TableHead className="w-[100px] text-left">Apellido</TableHead>
            <TableHead className="w-[100px] text-left">DNI</TableHead>
            <TableHead className="w-[100px] text-left">Telefono</TableHead>
            <TableHead className="w-[100px] text-left">Direccion</TableHead>
            <TableHead className="w-[100px] text-left">N° Maquina</TableHead>
            <TableHead className="w-[100px] text-right"></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div
        className={`overflow-hidden overflow-y-auto`}
        style={{ maxHeight: windowHeight }}
      >
        <Table>
          <TableBody>
            {sellers?.map((seller) => (
              <TableRow key={seller._id}>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.sellerNumber}
                </TableCell>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.name}
                </TableCell>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.lastname}
                </TableCell>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.dni}
                </TableCell>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.phone}
                </TableCell>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.address}
                </TableCell>
                <TableCell className="w-[100px] text-left truncate max-w-[100px]">
                  {seller.machineNumber}
                </TableCell>
                <TableCell className="w-[100px] text-right max-w-[100px]">
                  <SellerDropDownMenu
                    seller={seller}
                    onOpenModal={onOpenModal}
                    onOpenAlert={onOpenAlert}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default SellerTable;
