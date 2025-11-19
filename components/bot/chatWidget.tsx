// components/ChatWidget.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: messages.length + 1, text: input, sender: "user" };
    setMessages([...messages, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Thanks! We'll get back to you shortly.",
          sender: "bot",
        },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger – only opens, no close */}
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-highlight p-0 text-background shadow-2xl transition-all hover:scale-110 hover:bg-highlight/90"
        size="icon"
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8" />
      </Button>

      {/* Chat Sheet – ONLY ONE close button (top-right X) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-96 flex flex-col p-0 sm:max-w-md">
          {/* Header with single X */}
          <SheetHeader className="border-b border-border/40 bg-background px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-highlight">
                  <span className="font-bold text-background">P</span>
                </div>
                <div>
                  <SheetTitle className="text-lg">PADECO Assistant</SheetTitle>
                  <p className="text-xs text-foreground/60">Online — replies instantly</p>
                </div>
              </div>

              {/* ← THIS IS THE ONLY CLOSE BUTTON */}
           
            </div>
          </SheetHeader>

          {/* Messages */}
          <ScrollArea className="flex-1 px-5 py-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      msg.sender === "user"
                        ? "bg-highlight text-background"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border/40 bg-background p-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="min-h-12 resize-none border-border"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button
                onClick={sendMessage}
                size="icon"
                className="bg-highlight hover:bg-highlight/90 text-background"
              >
                <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}