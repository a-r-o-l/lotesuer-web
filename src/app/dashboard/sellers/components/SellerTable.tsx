"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>N° Vendedor</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Dni</TableCell>
          <TableCell>Telefono</TableCell>
          <TableCell>Direccion</TableCell>
          <TableCell>N° Maquina</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sellers?.map((seller, index) => (
          <TableRow key={index}>
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
  );
}

export default SellerTable;
