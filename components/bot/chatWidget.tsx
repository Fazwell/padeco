// components/ChatWidget.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const STORAGE_KEY = "padeco-chat-history";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Format timestamp
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          id: Date.now().toString(),
          text: "Hey! I'm your PADECO assistant. How can I help you today?",
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    }
  }, []);

  // Save history
  useEffect(() => {
    if (messages.length > 0) {
      // Keep only last 50 messages to avoid bloat
      const limited = messages.slice(-50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Voice input setup
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      console.log("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join("");
      setInput(transcript);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const toggleVoice = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: data.reply.trim(),
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Oops! I'm having trouble connecting. Please try again.",
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-highlight p-0 text-background shadow-2xl transition-all hover:scale-110 hover:bg-highlight/90 md:bottom-8 md:right-8"
        size="icon"
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex h-full flex-col p-0 sm:max-w-md w-full sm:w-96">
          {/* Header */}
          <SheetHeader className="border-b border-border/40 bg-background px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight">
                  <span className="font-bold text-background text-lg">P</span>
                </div>
                <div>
                  <SheetTitle className="text-lg">PADECO Assistant</SheetTitle>
                  <p className="text-xs text-foreground/60">Welcome, am your Padeco assistant</p>
                </div>
              </div>
            
            </div>
          </SheetHeader>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-4 sm:px-6">
            <div className="space-y-5 pb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-highlight text-background"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 text-xs text-foreground/50 px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start">
                  <div className="bg-muted px-4 py-3 rounded-2xl text-sm">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:0.15s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:0.3s]"></span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input + Voice */}
          <div className="border-t border-border/40 bg-background p-4 sm:p-5">
            <div className="flex gap-3 items-end">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask me anything..."}
                className="min-h-12 max-h-32 resize-none flex-1 border-border focus-visible:ring-highlight/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                disabled={isLoading}
              />

              {/* Voice Button */}
              <Button
                onClick={toggleVoice}
                disabled={isLoading || !recognitionRef.current}
                size="icon"
                variant={isListening ? "default" : "outline"}
                className={`h-12 w-12 rounded-xl shrink-0 transition-all ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                    : "border-border text-foreground hover:bg-accent"
                }`}
              >
                <MicrophoneIcon className="h-5 w-5" />
              </Button>

              {/* Send Button */}
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-12 w-12 rounded-xl bg-highlight hover:bg-highlight/90 text-background disabled:opacity-50 shrink-0"
              >
                <PaperAirplaneIcon className="h-5 w-5 rotate-360" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}