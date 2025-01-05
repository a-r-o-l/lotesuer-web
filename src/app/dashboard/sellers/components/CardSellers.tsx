"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo, useState } from "react";
import SellerTable from "./SellerTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus2 } from "lucide-react";
import CreateSellerModal from "./CreateSellerModal";
import CustomAlert from "@/components/CustomAlert";
import { ISeller } from "@/models/Seller";
import { deleteSeller } from "@/server/sellerAction";
import { toast } from "sonner";

const initialModal = {
  open: false,
  seller: undefined,
  onClose: () => {},
};
const initialAlert = {
  open: false,
  seller: "",
};

function CardSellers({ sellers }: { sellers: ISeller[] }) {
  const [searchParam, setSearchParam] = useState("");
  const [openAlert, setOpenAlert] = useState(initialAlert);
  const [open, setOpen] = useState<{
    open: boolean;
    seller?: ISeller;
    onClose: () => void;
  }>(initialModal);

  const sellersFiltered = useMemo(() => {
    const sellersWithFilter = sellers.filter((seller) => {
      const name = seller.name.toLowerCase();
      const lastname = seller.lastname.toLowerCase();
      const sellerNumber = seller.sellerNumber.toLowerCase();
      if (sellerNumber.includes(searchParam)) return true;
      else if (name.includes(searchParam)) return true;
      else if (lastname.includes(searchParam)) return true;
      else {
        return false;
      }
    });
    return sellersWithFilter;
  }, [sellers, searchParam]);

  const handleOpenModal = (seller?: ISeller) => {
    setOpen({
      open: true,
      seller: seller ? seller : undefined,
      onClose: () => setOpen(initialModal),
    });
  };

  const handleCloseModal = () => {
    setOpen(initialModal);
  };

  const handleOpenAlert = (sellerId?: string) => {
    setOpenAlert({
      open: true,
      seller: sellerId ? sellerId : "",
    });
  };

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Label htmlFor="search">Buscar</Label>
            <Input
              id="search"
              placeholder="Buscar vendedor..."
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="w-60"
              autoComplete="off"
            />
          </div>
          <Button variant="secondary" onClick={() => handleOpenModal()}>
            <UserPlus2 size={16} className="mr-2" />
            Crear vendedor
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <SellerTable
            sellers={sellersFiltered}
            onOpenModal={handleOpenModal}
            onCloseModal={handleCloseModal}
            onOpenAlert={handleOpenAlert}
          />
        </ScrollArea>
      </CardContent>
      <CreateSellerModal data={open} />
      <CustomAlert
        open={openAlert.open}
        onClose={() => setOpenAlert(initialAlert)}
        title="Eliminar vendedor"
        description="¿Estás seguro que deseas eliminar este vendedor?"
        onAccept={async () => {
          const response = await deleteSeller(openAlert.seller);
          if (response.success) {
            toast.success(response.message);
            setOpenAlert(initialAlert);
          } else {
            toast.error(response.message);
            setOpenAlert(initialAlert);
          }
        }}
      />
    </Card>
  );
}

export default CardSellers;
