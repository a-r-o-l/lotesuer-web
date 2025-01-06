import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Badge } from "@/components/ui/badge";
import { ISeller } from "@/models/Seller";
import { toast } from "sonner";
import { createSale, updateSale, deleteSale } from "@/server/saleAction";
import { useSearchParams } from "next/navigation";
import { ISale } from "@/models/Sale";
import {
  nameParser,
  priceParser,
  priceParserToInt,
  priceParserToString,
} from "@/lib/utilsFunctions";
import GameInput from "./GameInput";
import CustomAlert from "@/components/CustomAlert";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Printer, Trash2 } from "lucide-react";

const initform = {
  quiniela: "0.00",
  loto: "0.00",
  quini6: "0.00",
  brinco: "0.00",
  loto5: "0.00",
  poceada: "0.00",
  express: "0.00",
  premios: "0.00",
  paga: "0.00",
};

const initAlert = {
  open: false,
  title: "",
  description: "",
  onAccept: () => {},
  onCancel: () => {},
};

function SaleFormCard({
  seller,
  selectedSale,
  editMode,
  setEditMode,
}: {
  seller?: ISeller;
  selectedSale: ISale | null;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const quinielaRef = useRef<HTMLInputElement>(null);
  const lotoRef = useRef<HTMLInputElement>(null);
  const quini6Ref = useRef<HTMLInputElement>(null);
  const brincoRef = useRef<HTMLInputElement>(null);
  const loto5Ref = useRef<HTMLInputElement>(null);
  const poceadaRef = useRef<HTMLInputElement>(null);
  const expressRef = useRef<HTMLInputElement>(null);
  const premiosRef = useRef<HTMLInputElement>(null);
  const pagaRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const [formValues, setFormValues] = useState(initform);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [focusSet, setFocusSet] = useState(false);
  const [alert, setAlert] = useState(initAlert);
  const total = useMemo(() => {
    const fieldsToExclude = ["premios", "total", "paga", "saldo"];
    const total = Object.entries(formValues)
      .filter(([key]) => !fieldsToExclude.includes(key))
      .reduce((acc, [key, value]) => {
        if (!value || value === "0.00") return acc;
        const percentage =
          seller?.percent?.[key as keyof typeof seller.percent] || 0;
        const adjustedValue = priceParserToInt(value) * (1 - percentage / 100);
        return acc + adjustedValue;
        // return acc + priceParserToInt(value);
      }, 0);
    return priceParserToString(total - priceParserToInt(formValues?.premios));
  }, [formValues, seller]);

  const balance = useMemo(() => {
    return priceParserToString(
      priceParserToInt(total) - priceParserToInt(formValues?.paga)
    );
  }, [formValues, total]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, val?: string) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: val ? val : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("sellerId", seller?._id || "");
      formData.append("date", date);
      if (selectedSale) {
        formData.append("id", selectedSale._id);
      }
      const response = !!selectedSale
        ? await updateSale(formData)
        : await createSale(formData);
      if (response.success) {
        toast.success(response.message);
        setLoading(false);
        setEditMode(false);
        setFocusSet(false);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error creando la venta:", err);
      toast.error("Error en el servidor, intente nuevamente.");
      setLoading(false);
    }
  }, [
    formValues,
    seller?._id,
    date,
    selectedSale,
    setLoading,
    setEditMode,
    setFocusSet,
  ]);

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      handleChange(e, priceParser(value));
    },
    [handleChange]
  );

  const updateForm = useCallback(() => {
    if (selectedSale) {
      setFormValues((prevValues) => ({
        ...prevValues,
        quiniela: priceParserToString(selectedSale?.quiniela),
        loto: priceParserToString(selectedSale?.loto),
        quini6: priceParserToString(selectedSale?.quini6),
        brinco: priceParserToString(selectedSale?.brinco),
        poceada: priceParserToString(selectedSale?.poceada),
        express: priceParserToString(selectedSale?.express),
        premios: priceParserToString(selectedSale?.premios),
        paga: priceParserToString(selectedSale?.paga),
      }));
    } else {
      setFormValues(initform);
    }
  }, [selectedSale]);

  const handleCancelEditMode = useCallback(() => {
    updateForm();
    setEditMode(false);
    setAlert(initAlert);
    setFocusSet(false);
    formRef.current?.focus();
  }, [updateForm, setEditMode, setAlert, setFocusSet, formRef]);

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      nextRef: React.RefObject<HTMLInputElement | null>
    ) => {
      if (e.key === "Enter" && editMode) {
        nextRef.current?.focus();
      }
      if (e.key === "Escape" && editMode) {
        e.currentTarget.blur();
        setAlert({
          open: true,
          title: "Salir del modo editar",
          description: "¿Está seguro que desea salir del modo editar?",
          onAccept: () => handleCancelEditMode(),
          onCancel: () => {
            setAlert(initAlert);
            setFocusSet(false);
          },
        });
      }
    },
    [editMode, setAlert, handleCancelEditMode]
  );

  const handleDeleteSale = useCallback(async () => {
    const response = await deleteSale(selectedSale?._id || "", date);
    if (response.success) {
      toast.success(response.message);
      setEditMode(false);
      setFocusSet(false);
      setAlert({
        open: true,
        title: "Eliminar venta",
        description: "¿Está seguro que desea eliminar la venta?",
        onAccept: () => {
          handleDeleteSale();
        },
        onCancel: () => setAlert(initAlert),
      });
    } else {
      toast.error(response.message);
    }
  }, [selectedSale, date, setAlert, setEditMode]);

  useEffect(() => {
    setDate(searchParams.get("date") || "");
  }, [searchParams]);

  useEffect(() => {
    updateForm();
  }, [updateForm]);

  useEffect(() => {
    if (editMode && !focusSet) {
      quinielaRef.current?.focus();
      setFocusSet(true);
    }
  }, [editMode, focusSet]);

  if (loading || !seller || !date) {
    return (
      <Card className="flex flex-col flex-1">
        <CardHeader className="w-full flex flex-col gap-2 justify-center items-center">
          <div className="flex items-center gap-3 w-[500px] py-5">
            <CardTitle></CardTitle>
            <CardDescription className="text-lg"></CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-full">
          <div className={`flex flex-col items-center h-full py-40`}>
            {loading ? (
              <LoaderCircle size={30} className="animate-spin" />
            ) : date ? (
              <h1 className="text-md font-bold text-center">
                Seleccione un vendedor para continuar
              </h1>
            ) : (
              <h1 className="text-md font-bold text-center">
                Seleccione una fecha para continuar
              </h1>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col flex-1">
      <CardHeader className="w-full flex flex-row justify-between items-center">
        <div className="flex items-center gap-3 w-[500px] py-5">
          <Badge variant="secondary" className="text-md w-12 justify-center">
            {seller?.sellerNumber}
          </Badge>
          <h1 className="text-xl text-zinc-600 dark:text-zinc-400">
            {nameParser(
              `${seller?.lastname || ""} ${seller?.name || ""}`,
              true
            )}
          </h1>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </div>
        <div className="flex items-center gap-5">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() =>
              setAlert({
                open: true,
                title: "Eliminar venta",
                description: "¿Está seguro que desea eliminar la venta?",
                onAccept: () => {
                  handleDeleteSale();
                },
                onCancel: () => setAlert(initAlert),
              })
            }
            disabled={!selectedSale || editMode}
          >
            <Trash2 />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() => {}}
            disabled={!selectedSale || editMode}
          >
            <Printer />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="w-full flex flex-row justify-center mt-10"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div className="flex flex-col gap-2">
            <GameInput
              label="Quiniela"
              name="quiniela"
              value={formValues.quiniela}
              percent={seller?.percent?.quiniela?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={quinielaRef}
              onKeyDown={(e) => handleKeyDown(e, lotoRef)}
              disabled={!editMode}
            />
            <GameInput
              label="Loto"
              name="loto"
              value={formValues.loto}
              percent={seller?.percent?.loto?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={lotoRef}
              onKeyDown={(e) => handleKeyDown(e, quini6Ref)}
              disabled={!editMode}
            />
            <GameInput
              label="Quini 6"
              name="quini6"
              value={formValues.quini6}
              percent={seller?.percent?.quini6?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={quini6Ref}
              onKeyDown={(e) => handleKeyDown(e, brincoRef)}
              disabled={!editMode}
            />
            <GameInput
              label="Brinco"
              name="brinco"
              value={formValues.brinco}
              percent={seller?.percent?.brinco?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={brincoRef}
              onKeyDown={(e) => handleKeyDown(e, loto5Ref)}
              disabled={!editMode}
            />
            <GameInput
              label="Loto 5"
              name="loto5"
              value={formValues.loto5}
              percent={seller?.percent?.loto5?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={loto5Ref}
              onKeyDown={(e) => handleKeyDown(e, poceadaRef)}
              disabled={!editMode}
            />
            <GameInput
              label="Poceada"
              name="poceada"
              value={formValues.poceada}
              percent={seller?.percent?.poceada?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={poceadaRef}
              onKeyDown={(e) => handleKeyDown(e, expressRef)}
              disabled={!editMode}
            />
            <GameInput
              label="Express"
              name="express"
              value={formValues.express}
              percent={seller?.percent?.express?.toString() || "0"}
              onChange={handleChange}
              onBlur={handleBlur}
              ref={expressRef}
              onKeyDown={(e) => handleKeyDown(e, premiosRef)}
              disabled={!editMode}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-5 w-[500px]">
              <Label className="w-20">Premios</Label>
              <Input
                autoComplete="off"
                type="number"
                value={formValues.premios}
                onChange={handleChange}
                name="premios"
                onFocus={(e) => e.target.select()}
                onBlur={handleBlur}
                ref={premiosRef}
                onKeyDown={(e) => handleKeyDown(e, pagaRef)}
                disabled={!editMode}
                className="bg-zinc-500 text-white dark:bg-zinc-800"
              />
            </div>
            <div className="flex items-center gap-5 w-[500px]">
              <Label className="w-20">Total</Label>
              <Input
                autoComplete="off"
                type="number"
                value={total}
                name="total"
                readOnly
                disabled={!editMode}
                className="bg-zinc-500 text-white dark:bg-zinc-800"
              />
            </div>
            <div className="flex items-center gap-5 w-[500px]">
              <Label className="w-20">Paga</Label>
              <Input
                autoComplete="off"
                type="number"
                value={formValues.paga}
                onChange={handleChange}
                name="paga"
                onFocus={(e) => e.target.select()}
                ref={pagaRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setAlert({
                      open: true,
                      title: "Guardar",
                      description: "¿Está seguro que desea guardar la venta?",
                      onAccept: () => {
                        handleSubmit();
                        setAlert(initAlert);
                      },
                      onCancel: () => setAlert(initAlert),
                    });
                  } else if (e.key === "Escape") {
                    e.currentTarget.blur();
                    setAlert({
                      open: true,
                      title: "Salir del modo editar",
                      description:
                        "¿Está seguro que desea salir del modo editar?",
                      onAccept: () => handleCancelEditMode(),
                      onCancel: () => {
                        setAlert(initAlert);
                        setFocusSet(false);
                      },
                    });
                  }
                }}
                disabled={!editMode}
                className="bg-zinc-500 text-white dark:bg-zinc-800"
              />
            </div>
            <div className="flex items-center gap-5 w-[500px]">
              <Label className="w-20">Saldo</Label>
              <Input
                autoComplete="off"
                type="number"
                name="saldo"
                value={balance}
                readOnly
                disabled={!editMode}
                className={`font-bold text-white bg-zinc-100 dark:text-black ${
                  priceParserToInt(balance) <= 0 ? "bg-green-400" : "bg-red-500"
                }`}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CustomAlert
        open={alert.open}
        onClose={alert.onCancel}
        title={alert.title}
        description={alert.description}
        onAccept={alert.onAccept}
      />
    </Card>
  );
}

export default SaleFormCard;
