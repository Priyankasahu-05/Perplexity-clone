import { useEffect, useRef, useState } from "react";
import { ArrowUp, Paperclip } from "lucide-react";
import FocusModeSelector from "./FocusModeSelector";
import type { FocusMode } from "../../types";

interface Props {
  focusMode: FocusMode;
  onFocusModeChange: (mode: FocusMode) => void;
  onSubmit: (query: string, file?: File) => void;
  placeholder?: string;
  size?: "large" | "compact";
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function SearchBar({
  focusMode,
  onFocusModeChange,
  onSubmit,
  placeholder = "Ask anything...",
  size = "large",
  disabled = false,
  autoFocus = false,
}: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
  }, [value]);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  function handleSubmit() {
    const trimmed = value.trim();
    if ((!trimmed && !selectedFile) || disabled) return;
    onSubmit(trimmed, selectedFile ?? undefined);
    setValue("");
    setSelectedFile(null);
    if(fileInputRef.current){
      fileInputRef.current.value="";
    }
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const isLarge = size === "large";

  return (
    <div
      className={`w-full rounded-2xl border border-border-strong bg-surface shadow-lg shadow-black/20 focus-within:border-accent-dim transition-colors ${
        isLarge ? "p-3" : "p-2.5"
      }`}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
        className={`w-full resize-none bg-transparent outline-none placeholder:text-text-tertiary text-text-primary ${
          isLarge ? "text-base min-h-[28px]" : "text-sm min-h-[22px]"
        }`}
      />

      <div className={`flex items-center justify-between ${isLarge ? "mt-2.5" : "mt-2"}`}>
        <div className="flex items-center gap-2">
          <FocusModeSelector value={focusMode} onChange={onFocusModeChange} compact={!isLarge} />
          
            <>
              <input ref={fileInputRef}
                     type="file"
                     accept=".pdf,.txt,.doc,.docx"
                     className="hidden"
                     onChange={(e) => {
                       const file = e.target.files?.[0];

                       if (!file) return;
                       const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
                       if (file.size > MAX_FILE_SIZE) {
                         alert("File size exceeds the 50 MB limit.");
                         e.target.value = ""; // Reset the input
                         return;
                       }
                       setSelectedFile(file);
                      }
                    }
                  /> 
                  
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              title="Attach a file"
              className="flex items-center gap-1 rounded-full border border-border-strong px-2.5 py-1.5 text-xs text-text-primary hover:bg-surface-hover transition-colors"
            >
              <Paperclip size={13} />
              {selectedFile && (
               <span className="max-w-32 truncate">
                 {selectedFile.name}
               </span>
             )}
            </button>
          </> 
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || (!value.trim() && !selectedFile)}
          aria-label="Submit search"
          className={`flex items-center justify-center rounded-full transition-colors ${
            isLarge ? "w-9 h-9" : "w-7 h-7"
          } ${
            (value.trim() || selectedFile) && !disabled
              ? "bg-accent-light text-black hover:bg-white"
              : "bg-surface-2 text-text-tertiary cursor-not-allowed"
          }`}
        >
          <ArrowUp size={isLarge ? 18 : 15} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
