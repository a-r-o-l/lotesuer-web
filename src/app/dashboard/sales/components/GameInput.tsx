import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { forwardRef } from "react";

interface GameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  percent: string;
  label: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const GameInput = forwardRef<HTMLInputElement, GameInputProps>(
  (
    { value, onChange, name, onBlur, percent, label, onKeyDown, disabled },
    ref
  ) => {
    return (
      <div className="flex items-center gap-5 w-[500px]">
        <Label className="w-20">{label}</Label>
        <div className="flex items-center w-full h-8">
          <Input
            autoComplete="off"
            type="number"
            value={value}
            onChange={onChange}
            name={name}
            onFocus={(e) => e.target.select()}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            ref={ref}
            className="w-4/5"
            disabled={disabled}
          />
          <Badge className="h-full ml-2" variant="outline">
            % {percent ? percent : ""}
          </Badge>
        </div>
      </div>
    );
  }
);

GameInput.displayName = "GameInput";

export default GameInput;
