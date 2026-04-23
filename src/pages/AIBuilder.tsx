import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Send,
  Save,
  Download,
  Monitor,
  Smartphone,
  Sparkles,
  Bot,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const INITIAL_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    body { 
      font-family: 'Segoe UI', sans-serif; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      min-height: 100vh; 
      margin: 0; 
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #e2e8f0;
    }
    .container { text-align: center; padding: 2rem; }
    h1 { font-size: 2rem; margin-bottom: 0.5rem; }
    p { opacity: 0.7; }
  </style>
</head>
<body>
  <div class="container">
    <h1>✨ Your site preview will appear here</h1>
    <p>Describe your idea in the chat to get started</p>
  </div>
</body>
</html>`;

const AIBuilder = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(INITIAL_HTML);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [projectName, setProjectName] = useState(t("aiBuilder.untitled", "Untitled Project"));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load project name if projectId is provided
  useEffect(() => {
    if (projectId) {
      const loadProject = async () => {
        try {
          const data = await apiPost<{ project: { name: string; preview_url?: string } }>(
            API_ENDPOINTS.PROJECTS_GET,
            { projectId: Number(projectId) }
          );
          if (data.project) {
            setProjectName(data.project.name);
          }
        } catch {
          // silently fail — use default name
        }
      };
      loadProject();
    }
  }, [projectId]);

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    // Simulate AI response (to be replaced with real AI integration)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t(
          "aiBuilder.simResponse",
          "I've analyzed your request. In a production environment, this would generate a live website preview. The AI builder integration will be connected in a future update. For now, you can see how the interface works!"
        ),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSave = async () => {
    if (!projectId) {
      // Create a new project first
      try {
        await apiPost(API_ENDPOINTS.PROJECTS_CREATE, {
          name: projectName,
          type: "ai_build",
        });
      } catch (error) {
        console.error("Failed to save project:", error);
      }
    }
  };

  const handleExport = () => {
    const blob = new Blob([previewHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, "-")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-foreground focus:outline-none focus:ring-0 max-w-[200px]"
            id="project-name-input"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Preview Mode Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-1.5 rounded-md transition-colors ${
                previewMode === "desktop" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
              }`}
              id="preview-desktop-btn"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-1.5 rounded-md transition-colors ${
                previewMode === "mobile" ? "bg-card text-primary shadow-sm" : "text-muted-foreground"
              }`}
              id="preview-mobile-btn"
            >
              <Smartphone size={16} />
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleSave} id="save-btn">
            <Save size={14} className="mr-1.5" />
            {t("aiBuilder.save", "Save")}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} id="export-btn">
            <Download size={14} className="mr-1.5" />
            {t("aiBuilder.export", "Export")}
          </Button>
        </div>
      </header>

      {/* Split Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Chat Panel */}
        <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
          <div className="flex flex-col h-full bg-card/30">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                    <Bot size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {t("aiBuilder.chatTitle", "AI Website Builder")}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[250px]">
                    {t("aiBuilder.chatSubtitle", "Describe the website you want and I'll generate it for you")}
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} className="text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={t("aiBuilder.inputPlaceholder", "Describe the website you want...")}
                  className="min-h-[44px] max-h-[120px] resize-none"
                  rows={1}
                  id="ai-chat-input"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isGenerating}
                  size="icon"
                  className="shrink-0 bg-primary hover:bg-primary/90"
                  id="ai-send-btn"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={65} minSize={40}>
          <div className="h-full bg-muted/30 flex items-center justify-center p-4">
            <div
              className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-500 h-full ${
                previewMode === "mobile" ? "max-w-[375px] w-full" : "w-full"
              }`}
            >
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-scripts"
                id="preview-iframe"
              />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default AIBuilder;
