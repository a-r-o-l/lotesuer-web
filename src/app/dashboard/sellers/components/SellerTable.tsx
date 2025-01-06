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
    return Math.floor(window.innerHeight / 2);
  }, []);

  return (
    <div className="relative w-full border rounded-lg">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background border-b">
          <TableRow>
            <TableHead className="w-[100px]">N° Vendedor</TableHead>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead className="w-[200px]">Apellido</TableHead>
            <TableHead className="w-[100px]">DNI</TableHead>
            <TableHead className="w-[100px]">Telefono</TableHead>
            <TableHead className="w-[100px]">Direccion</TableHead>
            <TableHead className="w-[100px] text-right">Amount</TableHead>
            <TableHead className="w-[150px]">N° Maquina</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className={`overflow-auto`} style={{ maxHeight: windowHeight }}>
        <Table>
          <TableBody>
            {sellers?.map((seller) => (
              <TableRow key={seller._id}>
                <TableCell>{seller.sellerNumber}</TableCell>
                <TableCell>{seller.name}</TableCell>
                <TableCell>{seller.lastname}</TableCell>
                <TableCell>{seller.dni}</TableCell>
                <TableCell>{seller.phone}</TableCell>
                <TableCell>{seller.address}</TableCell>
                <TableCell>{seller.machineNumber}</TableCell>
                <TableCell align="right">
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
