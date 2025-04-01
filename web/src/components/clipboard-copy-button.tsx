"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

const ClipboardCopyButton = ({ url }: { url?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(url || window.location.href);
  }, [url]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setError(null);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log(":(");
      setError("Не удалось скопировать ссылку");
    }
  };

  if (!mounted) return null;

  return (
    <Button
      onClick={copyToClipboard}
      variant={isCopied ? "secondary" : error ? "destructive" : "outline"}
      size="lg"
    >
      <Share2 className="mr-2 h-5 w-5" />
      {isCopied ? "Cкопировано!" : error ? "Ошибка" : "Поделиться"}
    </Button>
  );
};

export default ClipboardCopyButton;
