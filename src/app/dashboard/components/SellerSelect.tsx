"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ISeller } from "@/models/Seller";
import { useRouter, useSearchParams } from "next/navigation";

function SellerSelect({
  sellers,
  url,
}: {
  sellers: ISeller[] | [];
  url: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSeller = searchParams.get("seller") || "all";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("seller", value);
    } else {
      params.delete("seller");
    }
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <Select
      name="category"
      value={selectedSeller}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full text-left font-normal">
        <SelectValue placeholder="Selecciona un usuario" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Usuarios</SelectLabel>
          <SelectItem value="all">Todos los vendedores</SelectItem>
          {sellers?.map((seller: ISeller) => (
            <SelectItem key={seller._id} value={seller._id}>
              <div className="flex flex-row items-center">
                <p>
                  {seller.sellerNumber} - {seller.lastname} {seller.name}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SellerSelect;
