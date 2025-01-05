"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Ellipsis, Percent } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ISeller } from "@/models/Seller";
import { nameParser } from "@/lib/utilsFunctions";
import LoadingButton from "@/components/LoadingButton";
import { updateSeller } from "@/server/sellerAction";
import { toast } from "sonner";

function SellerDropDownMenu({
  seller,
  onOpenModal,
  onOpenAlert,
}: {
  seller: ISeller;
  onOpenModal: (seller?: ISeller) => void;
  onOpenAlert: (sellerId?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      formData.append("id", seller._id.toString());
      const response = await updateSeller(formData, true);
      if (response.success) {
        toast.success(response.message);
        setLoading(false);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar las ganancias del vendedor.");
      setLoading(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(false)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setOpen(true)}
        >
          <Ellipsis size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          {nameParser(`${seller?.lastname} ${seller?.name}`)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onOpenModal(seller)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpenAlert(seller._id.toString());
            }}
          >
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Ganancias</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent sideOffset={5}>
                <div className="grid gap-4 p-1">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Ganancia</h4>
                    <p className="text-sm text-muted-foreground">
                      Porcentajes de ganancia del vendedor.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="quiniela" className="w-32">
                        Quiniela
                      </Label>
                      <Input
                        autoComplete="off"
                        id="quiniela"
                        name="quiniela"
                        defaultValue={`${seller?.percent?.quiniela || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="loto" className="w-32">
                        Loto
                      </Label>
                      <Input
                        autoComplete="off"
                        id="loto"
                        name="loto"
                        defaultValue={`${seller?.percent?.loto || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="quini6" className="w-32">
                        Quini 6
                      </Label>
                      <Input
                        autoComplete="off"
                        id="quini6"
                        name="quini6"
                        defaultValue={`${seller?.percent?.quini6 || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="brinco" className="w-32">
                        Brinco
                      </Label>
                      <Input
                        autoComplete="off"
                        id="brinco"
                        name="brinco"
                        defaultValue={`${seller?.percent?.brinco || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="poceada" className="w-32">
                        Poceada
                      </Label>
                      <Input
                        autoComplete="off"
                        id="poceada"
                        name="poceada"
                        defaultValue={`${seller?.percent?.poceada || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="express" className="w-32">
                        Express
                      </Label>
                      <Input
                        autoComplete="off"
                        id="express"
                        name="express"
                        defaultValue={`${seller?.percent?.express || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="telebingo" className="w-32">
                        Telebingo
                      </Label>
                      <Input
                        autoComplete="off"
                        id="telebingo"
                        name="telebingo"
                        defaultValue={`${seller?.percent?.telebingo || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="telekino" className="w-32">
                        Telekino
                      </Label>
                      <Input
                        autoComplete="off"
                        id="telekino"
                        name="telekino"
                        defaultValue={`${seller?.percent?.telekino || 0}`}
                        className="w-32 h-8"
                      />
                      <Percent size={15} />
                    </div>
                    <div className="w-full mt-4">
                      <LoadingButton
                        title="Guardar"
                        classname="w-full"
                        type="submit"
                        loading={loading}
                      />
                      {/* <Button
                        variant="default"
                        className="w-full"
                        onClick={() => setOpen(false)}

                      >
                        Guardar
                      </Button> */}
                    </div>
                  </form>
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SellerDropDownMenu;
