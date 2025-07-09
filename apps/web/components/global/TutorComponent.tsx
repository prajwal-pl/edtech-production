"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Message {
  id: string;
  sender: "user" | "ai" | "system";
  content: string;
  timestamp: Date;
}

interface Topic {
  id: string;
  title: string;
  description: string;
}

const TutorComponent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      content: "Welcome to your AI Tutor! How can I help you today?",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const suggestedTopics: Topic[] = [
    {
      id: "topic1",
      title: "Solving Quadratic Equations",
      description: "Learn the quadratic formula and factoring methods",
    },
    {
      id: "topic2",
      title: "Forces and Motion",
      description: "Understand Newton's laws and kinetic energy",
    },
    {
      id: "topic3",
      title: "Essay Structure",
      description: "Master thesis statements and paragraph organization",
    },
    {
      id: "topic4",
      title: "Grammar Rules",
      description: "Review punctuation and sentence structure",
    },
  ];

  const pastSessions: { id: string; title: string; date: string }[] = [
    { id: "session1", title: "Algebra Problem Solving", date: "Yesterday" },
    { id: "session2", title: "Chemical Reactions", date: "3 days ago" },
    { id: "session3", title: "Essay Writing Tips", date: "Last week" },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `I'll help you with "${inputValue}". Let's break this down step by step...`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: `Can you help me with ${topic.title}?`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        content: `I'd be happy to help you with ${topic.title}! ${topic.description}. Let's start with the fundamentals...`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Banner */}
      <div className="flex-shrink-0 rounded-2xl relative px-4 py-8 md:px-8 md:py-10 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <h1 className="text-3xl font-bold tracking-tight relative z-10">
          AI Tutor
        </h1>
        <p className="text-muted-foreground relative z-10 max-w-3xl">
          Get personalized help with your studies and assignments. Our AI tutor
          adapts to your learning style and provides detailed explanations.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Topics sidebar */}
        <div className="lg:col-span-1 flex flex-col h-full overflow-hidden">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex flex-col h-full"
          >
            <TabsList className="grid w-full grid-cols-2 p-1 bg-accent/50 rounded-xl flex-shrink-0">
              <TabsTrigger
                value="chat"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-card"
              >
                Topics
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-card"
              >
                History
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 flex-1 overflow-hidden">
              <div className="h-full border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <TabsContent
                    value="chat"
                    className="m-0 p-0 h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="border-b p-3 flex-shrink-0">
                      <h3 className="text-sm font-medium">Suggested Topics</h3>
                    </div>
                    <div className="flex flex-col overflow-y-auto">
                      {suggestedTopics.map((topic) => (
                        <button
                          key={topic.id}
                          className="flex flex-col gap-1 border-b p-4 text-left transition-colors hover:bg-accent/50 last:border-b-0"
                          onClick={() => handleTopicSelect(topic)}
                        >
                          <span className="font-medium">{topic.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {topic.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="history"
                    className="m-0 p-0 h-full data-[state=active]:flex data-[state=active]:flex-col"
                  >
                    <div className="border-b p-3 flex-shrink-0">
                      <h3 className="text-sm font-medium">Past Sessions</h3>
                    </div>
                    <div className="flex flex-col overflow-y-auto">
                      {pastSessions.map((session) => (
                        <button
                          key={session.id}
                          className="flex flex-col gap-1 border-b p-4 text-left transition-colors hover:bg-accent/50 last:border-b-0"
                        >
                          <span className="font-medium">{session.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {session.date}
                          </span>
                        </button>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </div>
            </div>
          </Tabs>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-3 flex flex-col h-full overflow-hidden">
          <div className="flex flex-col h-full border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
            {/* Chat header */}
            <div className="border-b px-6 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/30 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold leading-none">
                    AI Tutor Session
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Using advanced math and science capabilities
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                New Chat
              </Button>
            </div>

            {/* Scrollable messages area */}
            <div className="flex-1 overflow-y-auto bg-accent/5 p-6">
              <div className="flex flex-col gap-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col gap-2 ${
                      message.sender === "user"
                        ? "ml-auto items-end"
                        : "mr-auto items-start"
                    } max-w-[85%]`}
                  >
                    <div className="flex items-center gap-2 px-2">
                      {message.sender !== "user" && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                          </svg>
                        </div>
                      )}
                      <span className="text-xs font-medium">
                        {message.sender === "user"
                          ? "You"
                          : message.sender === "ai"
                            ? "AI Tutor"
                            : "System"}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div
                      className={`rounded-xl p-4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                          : message.sender === "ai"
                            ? "bg-card border border-border/50"
                            : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="mr-auto flex max-w-[80%] items-center gap-2 rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary animation-delay-200"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-primary animation-delay-400"></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      AI Tutor is typing...
                    </span>
                  </div>
                )}

                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Fixed input area */}
            <div className="border-t p-4 bg-card flex-shrink-0">
              <div className="flex w-full items-center gap-2">
                <Input
                  placeholder="Ask your question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorComponent;
