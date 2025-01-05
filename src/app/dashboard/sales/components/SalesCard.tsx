"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
import UserList from "./UserList";
import SaleFormCard from "./SaleFormCard";
import { Label } from "@/components/ui/label";
import PopoverSellerSearcher from "./PopoverSellerSearcher";
import PopoverDate from "./PopoverDate";
import { ISeller } from "@/models/Seller";
import { useRouter, useSearchParams } from "next/navigation";
import { ISale } from "@/models/Sale";
import { Button } from "@/components/ui/button";
import { CalendarOff, UserMinus } from "lucide-react";

function SalesCard({ sellers, sales }: { sellers: ISeller[]; sales: ISale[] }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<ISeller | undefined>(
    undefined
  );
  const searchParams = useSearchParams();

  const [dateQuery, setDateQuery] = useState(searchParams.get("date") || "");

  const handleSelectSeller = React.useCallback(
    (seller: ISeller) => {
      setSelectedSeller(seller);
      const index = sellers.findIndex((s) => s._id === seller._id);
      setSelectedIndex(index);
    },
    [sellers]
  );

  useEffect(() => {
    setDateQuery(searchParams.get("date") || "");
  }, [searchParams]);

  const selectedSale = useMemo(() => {
    if (!!sales?.length) {
      const saleFound = sales.find(
        (sale) => sale.sellerId.toString() === selectedSeller?._id
      );
      if (saleFound) {
        return saleFound;
      }
    }
    return null;
  }, [selectedSeller, sales]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F1") {
        if (dateQuery) {
          setOpen(true);
        }
      }
      if (event.key === "F2") {
        if (!dateQuery) {
          setOpenDate(true);
        }
      }
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
        } else if (openDate) {
          setOpenDate(false);
        } else if (selectedSeller && !editMode && dateQuery && !open) {
          setSelectedSeller(undefined);
        } else if (!selectedSeller && dateQuery) {
          setDateQuery("");
          setOpenDate(true);
        }
      }
      if (event.key === "Enter") {
        if (selectedSeller && !editMode && dateQuery && !open && !openDate) {
          setEditMode(true);
        }
      }
      if (event.key === "ArrowDown") {
        if (!editMode && dateQuery && !open) {
          if (selectedIndex === null) {
            handleSelectSeller(sellers[0]);
          } else if (selectedIndex < sellers.length - 1) {
            const newIndex = selectedIndex + 1;
            handleSelectSeller(sellers[newIndex]);
          } else {
            handleSelectSeller(sellers[0]);
          }
        }
      }
      if (event.key === "ArrowUp") {
        if (!editMode && dateQuery && !open) {
          if (selectedIndex === null) {
            handleSelectSeller(sellers[sellers.length - 1]);
          } else if (selectedIndex > 0) {
            const newIndex = selectedIndex - 1;
            handleSelectSeller(sellers[newIndex]);
          } else {
            handleSelectSeller(sellers[sellers.length - 1]);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    dateQuery,
    selectedSeller,
    editMode,
    sellers,
    handleSelectSeller,
    selectedIndex,
    open,
    openDate,
  ]);

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
        <div className="flex flex-row gap-10 items-center justify-around">
          <div className="flex items-center gap-5">
            <Label>Vendedor</Label>
            <PopoverSellerSearcher
              sellers={sellers}
              open={open}
              setOpen={setOpen}
              disabled={!dateQuery || editMode}
              onSelect={handleSelectSeller}
              selectedSeller={selectedSeller}
            />
            {!!selectedSeller && (
              <Button
                size="icon"
                variant="outline"
                className="rounded-full text-xs border-red-500 w-6 h-6"
                onClick={() => setSelectedSeller(undefined)}
                disabled={!dateQuery || editMode}
              >
                <UserMinus className="text-red-500" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-5">
            <Label>Fecha</Label>
            <PopoverDate
              open={openDate}
              setOpen={setOpenDate}
              disabled={!!dateQuery || editMode}
            />
            {!!dateQuery && (
              <Button
                size="icon"
                variant="outline"
                className="rounded-full text-xs border-red-500 w-6 h-6"
                onClick={() => {
                  setSelectedSeller(undefined);
                  router.push("/dashboard/sales/quiniela");
                }}
                disabled={editMode}
              >
                <CalendarOff className="text-red-500" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={`flex flex-row gap-6 ${!dateQuery ? "opacity-30" : ""}`}
      >
        <UserList
          sellers={sellers}
          selectedSeller={selectedSeller}
          onSelect={handleSelectSeller}
          disabled={!dateQuery || editMode}
          setEditMode={setEditMode}
        />
        <SaleFormCard
          seller={selectedSeller}
          selectedSale={selectedSale}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </CardContent>
    </Card>
  );
}

export default SalesCard;
