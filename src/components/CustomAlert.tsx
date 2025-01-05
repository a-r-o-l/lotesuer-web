import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

function CustomAlert({
  open,
  onClose,
  onAccept,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  description?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        onEscapeKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onClose();
        }}
        onKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter
          className="mt-10"
          onKeyDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.key === "Enter") {
              return onAccept();
            }
            if (e.key === "Escape") {
              return onClose();
            }
          }}
        >
          <Button onClick={onAccept}>Aceptar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CustomAlert;
