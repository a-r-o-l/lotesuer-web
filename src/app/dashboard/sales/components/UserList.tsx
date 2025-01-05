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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendedores</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <Table>
            <TableBody>
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
