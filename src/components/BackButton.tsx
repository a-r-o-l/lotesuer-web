import React from "react";
import GoToButton from "./GoToButton";
import { MoveLeft } from "lucide-react";

function BackButton({ url }: { url: string }) {
  return (
    <GoToButton
      goTo={url}
      size="icon"
      variant="outline"
      className="  rounded-full"
    >
      <MoveLeft />
    </GoToButton>
  );
}

export default BackButton;
