import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "human";
  timestamp: Date;
}

interface Operator {
  id: string;
  name: string;
  avatar: string;
  fallback: string;
  isOnline: boolean;
}

const predefinedQA = [
  {
    keywords: ["how", "apply", "passport", "application"],
    answer:
      "To apply for an e-passport, click on 'Apply Now' and follow the step-by-step process. You'll need to fill out personal information, upload documents, and pay the required fees.",
  },
  {
    keywords: ["track", "status", "application"],
    answer:
      "You can track your application status by going to the 'Track Application' section and entering your application reference number.",
  },
  {
    keywords: ["documents", "required", "need"],
    answer:
      "Required documents include: National ID card, birth certificate, photographs (passport size), and any additional documents based on your application type.",
  },
  {
    keywords: ["fees", "cost", "price", "payment"],
    answer:
      "The fees vary based on the type of passport and processing time. Regular processing is ৳3,000 and express processing is ৳5,000. You can pay online using mobile banking or cards.",
  },
  {
    keywords: ["time", "how long", "processing"],
    answer:
      "Regular processing takes 21 working days, while express processing takes 7 working days. You'll receive SMS updates on your application status.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    answer:
      "Hello! I'm here to help you with your e-passport application. What would you like to know?",
  },
  {
    keywords: ["help", "support"],
    answer:
      "I'm here to help! You can ask me about the application process, required documents, fees, or tracking your application. What specific information do you need?",
  },
];

const mockOperators: Operator[] = [
  { id: "1", name: "Sarah Ahmed", avatar: "", fallback: "SA", isOnline: true },
  {
    id: "2",
    name: "Mohammad Rahman",
    avatar: "",
    fallback: "MR",
    isOnline: true,
  },
  { id: "3", name: "Fatima Khan", avatar: "", fallback: "FK", isOnline: true },
  {
    id: "4",
    name: "Abdul Hassan",
    avatar: "",
    fallback: "AH",
    isOnline: false,
  },
];

export function ChatHead() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your e-passport assistant. I can help you with application questions or connect you with a human operator. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isConnectedToHuman, setIsConnectedToHuman] = useState(false);
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (userMessage: string): string | null => {
    const lowerMessage = userMessage.toLowerCase();

    for (const qa of predefinedQA) {
      if (qa.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return qa.answer;
      }
    }

    return null;
  };

  const connectToHuman = () => {
    const availableOperators = mockOperators.filter((op) => op.isOnline);
    if (availableOperators.length > 0) {
      const randomOperator =
        availableOperators[
          Math.floor(Math.random() * availableOperators.length)
        ];
      setCurrentOperator(randomOperator);
      setIsConnectedToHuman(true);

      const connectMessage: Message = {
        id: Date.now().toString(),
        text: `You've been connected to ${randomOperator.name}. They'll be with you shortly!`,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, connectMessage]);

      // Simulate human operator joining after a delay
      setTimeout(() => {
        const humanMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Hello! This is ${randomOperator.name}. I'm here to help you with your e-passport queries. How can I assist you today?`,
          sender: "human",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, humanMessage]);
      }, 2000);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");

    if (isConnectedToHuman) {
      // Simulate human response
      setIsTyping(true);
      setTimeout(
        () => {
          setIsTyping(false);
          const humanResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Thank you for your question. Let me help you with that. Our team will look into this and provide you with detailed information.",
            sender: "human",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, humanResponse]);
        },
        2000 + Math.random() * 3000
      );
    } else {
      // Check if user wants to connect to human
      if (
        currentInput.toLowerCase().includes("human") ||
        currentInput.toLowerCase().includes("person") ||
        currentInput.toLowerCase().includes("operator") ||
        currentInput.toLowerCase().includes("agent")
      ) {
        setTimeout(() => {
          const connectPrompt: Message = {
            id: (Date.now() + 1).toString(),
            text: "Would you like me to connect you with a human operator? They can provide more personalized assistance.",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, connectPrompt]);
        }, 1000);
        return;
      }

      // Bot response with predefined answers
      setIsTyping(true);
      setTimeout(
        () => {
          setIsTyping(false);
          const answer = findAnswer(currentInput);
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            text:
              answer ||
              "I'm not sure about that specific question. Would you like me to connect you with a human operator for more detailed assistance?",
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        },
        1000 + Math.random() * 2000
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Head Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-80"
          style={{ height: "400px" }}
        >
          <div className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl flex flex-col">
            {/* Header - Fixed height */}
            <div
              className="bg-green-600 text-white p-3 rounded-t-lg flex items-center justify-between"
              style={{ minHeight: "60px" }}
            >
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-white text-green-600 text-sm font-medium">
                    {isConnectedToHuman ? currentOperator?.fallback : "🤖"}
                  </AvatarFallback>
                  {currentOperator?.avatar && (
                    <AvatarImage
                      src={currentOperator.avatar}
                      alt={currentOperator.name}
                    />
                  )}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {isConnectedToHuman
                      ? currentOperator?.name
                      : "e-Passport Assistant"}
                  </p>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span className="text-xs opacity-90">
                      {isConnectedToHuman ? "Human Agent" : "AI Assistant"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                {!isConnectedToHuman && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={connectToHuman}
                    className="text-white hover:bg-green-700 p-1 h-auto"
                    title="Connect to human agent"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-green-700 p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area - Scrollable with fixed height */}
            <div
              className="flex-1 overflow-y-auto bg-white dark:bg-gray-800 p-3"
              style={{ height: "calc(400px - 60px - 80px)" }}
            >
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      {message.sender !== "user" && (
                        <Avatar className="w-6 h-6 mt-1 flex-shrink-0">
                          <AvatarFallback className="text-xs bg-gray-100 dark:bg-gray-700">
                            {message.sender === "bot"
                              ? "🤖"
                              : currentOperator?.fallback || "👤"}
                          </AvatarFallback>
                          {message.sender === "human" &&
                            currentOperator?.avatar && (
                              <AvatarImage
                                src={currentOperator.avatar}
                                alt={currentOperator.name}
                              />
                            )}
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <div
                          className={`p-2.5 rounded-lg text-sm break-words ${
                            message.sender === "user"
                              ? "bg-green-600 text-white ml-auto"
                              : message.sender === "human"
                                ? "bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-700"
                                : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                          }`}
                          style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {message.text}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 max-w-[80%]">
                      <Avatar className="w-6 h-6 flex-shrink-0">
                        <AvatarFallback className="text-xs bg-gray-100 dark:bg-gray-700">
                          {isConnectedToHuman
                            ? currentOperator?.fallback || "👤"
                            : "🤖"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area - Fixed height */}
            <div
              className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 rounded-b-lg"
              style={{ minHeight: "80px" }}
            >
              <div className="flex space-x-2 mb-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {!isConnectedToHuman && (
                <div className="flex flex-wrap gap-1">
                  <Badge
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20"
                    onClick={() =>
                      setInputValue("How do I apply for a passport?")
                    }
                  >
                    How to apply?
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20"
                    onClick={() => setInputValue("What documents do I need?")}
                  >
                    Required docs
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/20"
                    onClick={() => setInputValue("Connect me to a human")}
                  >
                    Human agent
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
