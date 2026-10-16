import { handleChatRequest } from '@/features/consultation-guide/server/handle-chat-request';
export async function POST(request: Request) {
  return handleChatRequest(request);
}
