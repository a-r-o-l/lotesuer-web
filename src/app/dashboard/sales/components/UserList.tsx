"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { nameParser } from "@/lib/utilsFunctions";
import { ISeller } from "@/models/Seller";
import { useMemo } from "react";
function UserList({
  sellers,
  selectedSeller,
  onSelect,
  disabled,
  setEditMode,
}: {
  sellers: ISeller[];
  selectedSeller?: ISeller;
  onSelect: (seller: ISeller) => void;
  disabled: boolean;
  setEditMode: (editMode: boolean) => void;
}) {
  const windowHeight = useMemo(() => {
    return Math.floor(window.innerHeight / 1.8);
  }, []);

  return (
    <Card style={{ maxHeight: windowHeight }} className="overflow-y-auto w-72">
      <CardHeader className="sticky top-0 bg-background z-10 border-b-2 py-5">
        <CardTitle>Vendedores</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="w-full py-1 px-0">
        <ScrollArea className="w-full">
          <Table className="w-full">
            <TableBody className="w-full">
              {sellers?.map((seller) => (
                <TableRow
                  key={seller._id}
                  onClick={() => {
                    if (disabled) {
                      return;
                    }
                    onSelect(seller);
                  }}
                  onDoubleClick={() => {
                    if (disabled) {
                      return;
                    }
                    setEditMode(true);
                  }}
                  className={`w-full flex items-center cursor-pointer ${
                    selectedSeller?._id === seller._id
                      ? "bg-zinc-200 text-black rounded-md"
                      : ""
                  }`}
                  aria-disabled={disabled}
                >
                  <TableCell>{seller.sellerNumber}</TableCell>
                  <TableCell>
                    {nameParser(`${seller.lastname} ${seller.name}`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default UserList;
