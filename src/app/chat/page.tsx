import { ChatBotConversations } from "@/components/chat";
import ChatTextarea from "@/components/forms/chat-input";

export default function ChatPage() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <ChatBotConversations />
      </div>

      <div className="bg-white dark:bg-black sticky bottom-0 py-2 z-50 mt-auto">
        <ChatTextarea />
      </div>
    </>
  );
}
