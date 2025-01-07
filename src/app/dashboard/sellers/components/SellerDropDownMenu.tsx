"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
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

const initFormValues = {
  quiniela: "",
  loto: "",
  quini6: "",
  brinco: "",
  loto5: "",
  poceada: "",
  express: "",
  telebingo: "",
  telekino: "",
};

function SellerDropDownMenu({
  seller,
  onOpenModal,
  onOpenAlert,
}: {
  seller: ISeller;
  onOpenModal: (seller?: ISeller) => void;
  onOpenAlert: (sellerId?: string) => void;
}) {
  const quinielaRef = useRef<HTMLInputElement>(null);
  const lotoRef = useRef<HTMLInputElement>(null);
  const quini6Ref = useRef<HTMLInputElement>(null);
  const brincoRef = useRef<HTMLInputElement>(null);
  const loto5Ref = useRef<HTMLInputElement>(null);
  const poceadaRef = useRef<HTMLInputElement>(null);
  const expressRef = useRef<HTMLInputElement>(null);
  const telebingoRef = useRef<HTMLInputElement>(null);
  const telekinoRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(initFormValues);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key as keyof typeof formValues]);
      });
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      nextRef.current?.focus();
    }
  };

  const disabledSubmit = useMemo(() => {
    const isEmpty = (value: string) => value === "";
    const emptyFields = Object.values(formValues).some(isEmpty);
    if (emptyFields) return true;
    if (
      Object.keys(formValues).every((key) => {
        const initValue = seller.percent[key as keyof ISeller["percent"]];
        const currentValue = formValues[key as keyof typeof formValues];
        return initValue === parseInt(currentValue);
      })
    ) {
      return true;
    }

    return false;
  }, [seller, formValues]);

  const handleChange = ({ target }: { target: HTMLInputElement }) => {
    const { name, value } = target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (seller) {
      setFormValues({
        quiniela: (seller.percent?.quiniela).toString() || "",
        loto: (seller.percent?.loto).toString() || "",
        quini6: (seller.percent?.quini6).toString() || "",
        brinco: (seller.percent?.brinco).toString() || "",
        loto5: (seller.percent?.loto5).toString() || "",
        poceada: (seller.percent?.poceada).toString() || "",
        express: (seller.percent?.express).toString() || "",
        telebingo: (seller.percent?.telebingo).toString() || "",
        telekino: (seller.percent?.telekino).toString() || "",
      });
    } else {
      setFormValues(initFormValues);
    }
  }, [seller, open]);

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
              onOpenAlert(seller?._id?.toString());
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="quiniela" className="w-32">
                        Quiniela
                      </Label>
                      <Input
                        autoComplete="off"
                        id="quiniela"
                        name="quiniela"
                        className="w-32 h-8"
                        ref={quinielaRef}
                        onKeyDown={(e) => handleKeyDown(e, lotoRef)}
                        value={formValues.quiniela}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={lotoRef}
                        onKeyDown={(e) => handleKeyDown(e, quini6Ref)}
                        value={formValues.loto}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={quini6Ref}
                        onKeyDown={(e) => handleKeyDown(e, brincoRef)}
                        value={formValues.quini6}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={brincoRef}
                        onKeyDown={(e) => handleKeyDown(e, loto5Ref)}
                        value={formValues.brinco}
                        onChange={handleChange}
                      />
                      <Percent size={15} />
                    </div>
                    <div className="flex flex-row justify-between items-center gap-4">
                      <Label htmlFor="loto5" className="w-32">
                        Loto 5
                      </Label>
                      <Input
                        autoComplete="off"
                        id="loto5"
                        name="loto5"
                        className="w-32 h-8"
                        ref={loto5Ref}
                        onKeyDown={(e) => handleKeyDown(e, poceadaRef)}
                        value={formValues.loto5}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={poceadaRef}
                        onKeyDown={(e) => handleKeyDown(e, expressRef)}
                        value={formValues.poceada}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={expressRef}
                        onKeyDown={(e) => handleKeyDown(e, telebingoRef)}
                        value={formValues.express}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={telebingoRef}
                        onKeyDown={(e) => handleKeyDown(e, telekinoRef)}
                        value={formValues.telebingo}
                        onChange={handleChange}
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
                        className="w-32 h-8"
                        ref={telekinoRef}
                        value={formValues.telekino}
                        onChange={handleChange}
                      />
                      <Percent size={15} />
                    </div>
                    <div className="w-full mt-4">
                      <LoadingButton
                        title="Guardar"
                        classname="w-full"
                        type="submit"
                        loading={loading}
                        disabled={disabledSubmit}
                      />
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
