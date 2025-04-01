"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

const ClipboardCopyButton = ({
  url = window.location.href,
}: {
  url?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copyToClipboard = async () => {
    try {
      navigator.clipboard.writeText(url);
      setError(null);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      setError("Не удалось скопировать ссылку");
    }
  };

  return (
    <Button onClick={copyToClipboard} variant="outline" size="lg">
      <Share2 className="mr-2 h-5 w-5" />
      {isCopied ? "Cкопировано!" : error ? "Ошибка" : "Поделиться"}
    </Button>
  );
};

export default ClipboardCopyButton;
