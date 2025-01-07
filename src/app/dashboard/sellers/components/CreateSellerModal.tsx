import LoadingButton from "@/components/LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ISeller } from "@/models/Seller";
import { createSeller, updateSeller } from "@/server/sellerAction";
import { UserPen, UserPlus2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function CreateSellerModal({
  data,
}: {
  data: { open: boolean; onClose?: () => void; seller?: ISeller };
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      if (data.seller) {
        formData.append("id", data.seller._id);
      }
      const response = data.seller
        ? await updateSeller(formData)
        : await createSeller(formData);
      if (response.success) {
        toast.success(response.message);
        setLoading(false);
        if (data.onClose) data.onClose();
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error creando el vendedor:", err);
      toast.error("Error en el servidor, intente nuevamente.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={data.open} onOpenChange={data.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {!!data.seller ? (
              <>
                <UserPen size={24} className="mr-2" />
                <p>Editar vendedor</p>
              </>
            ) : (
              <>
                <UserPlus2 size={24} className="mr-2" />
                <p>Crear vendedor</p>
              </>
            )}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="flex gap-5 items-center">
              <Label className="w-28">Vendedor n°</Label>
              <Input
                defaultValue={data.seller?.sellerNumber}
                name="sellerNumber"
              />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">Máquina n°</Label>
              <Input
                defaultValue={data.seller?.machineNumber}
                name="machineNumber"
              />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">Nombre</Label>
              <Input defaultValue={data.seller?.name} name="name" />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">Apellido</Label>
              <Input defaultValue={data.seller?.lastname} name="lastname" />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">D.N.I.</Label>
              <Input defaultValue={data.seller?.dni} name="dni" />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">Teléfono</Label>
              <Input defaultValue={data.seller?.phone} name="phone" />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">Dirección</Label>
              <Input defaultValue={data.seller?.address} name="address" />
            </div>
            <div className="flex gap-5 items-center">
              <Label className="w-28">Alquiler de maquina</Label>
              <Input
                defaultValue={
                  !data.seller?.machineRent ? 0 : data.seller.machineRent
                }
                name="machineRent"
                type="number"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <LoadingButton
              title={!!data.seller ? "Editar" : "Crear"}
              loading={loading}
              type="submit"
              classname="w-full"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSellerModal;
