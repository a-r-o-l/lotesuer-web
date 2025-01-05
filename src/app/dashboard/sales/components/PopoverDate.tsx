"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PopoverDate({
  open,
  setOpen,
  disabled,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("date") || ""
  );

  useEffect(() => {
    setSearchQuery(searchParams.get("date") || "");
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set("date", searchQuery);
    } else {
      params.delete("date");
    }
    router.push(`/dashboard/sales/quiniela?${params.toString()}`);
  }, [searchQuery, router]);

  const handleSelect = (date: string) => {
    setSearchQuery(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disabled}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !searchQuery && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {searchQuery ? (
            <>
              <span className="w-full">
                {format(parseISO(searchQuery), "PPP", { locale: es })}
              </span>
            </>
          ) : (
            <span>Seleccionar fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <Calendar
          mode="single"
          selected={searchQuery ? parseISO(searchQuery) : new Date()}
          onSelect={(e) => {
            if (e) {
              handleSelect(format(e, "yyyy-MM-dd"));
            }
          }}
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>
  );
}

export default PopoverDate;
