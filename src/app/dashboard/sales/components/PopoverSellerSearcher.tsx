"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { ISeller } from "@/models/Seller";
import { nameParser } from "@/lib/utilsFunctions";
import { useMemo } from "react";

function PopoverSellerSearcher({
  open,
  setOpen,
  sellers,
  disabled,
  onSelect,
  selectedSeller,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sellers: ISeller[];
  disabled: boolean;
  onSelect: (seller: ISeller) => void;
  selectedSeller: ISeller | undefined;
}) {
  const fullname = useMemo(() => {
    return `${selectedSeller?.lastname} ${selectedSeller?.name}`;
  }, [selectedSeller]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
          disabled={disabled}
        >
          {selectedSeller
            ? `${selectedSeller.sellerNumber} - ${nameParser(fullname)}`
            : "Seleccionar vendedor..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            e.preventDefault();
          } else if (e.key === "Enter") {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <Command>
          <CommandInput
            placeholder="Buscar vendedor..."
            className="h-9"
            autoComplete="off"
          />
          <CommandList>
            <CommandEmpty>No se encontro ningun vendedor.</CommandEmpty>
            <CommandGroup>
              {sellers?.map((seller) => (
                <CommandItem
                  key={seller._id}
                  value={seller.sellerNumber}
                  onSelect={() => {
                    onSelect(seller);
                    setOpen(false);
                  }}
                >
                  {seller.sellerNumber} -{" "}
                  {nameParser(`${seller.lastname} ${seller.name}`)}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedSeller?._id === seller._id ? "" : "hidden"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverSellerSearcher;
