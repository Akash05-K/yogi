'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowRight, ArrowUpRight, MessageCircle, Send, Sparkles, X } from 'lucide-react';

import { useConsultationGuide } from '../hooks/use-consultation-guide';
export function ConsultationGuide({ aiReady }: { aiReady: boolean }) {
  const { chat, setChat, question, setQuestion, chatBusy, answer, ask } =
    useConsultationGuide(aiReady);
  return (
    <>
      <button
        className="chat-launch"
        aria-label="Open consultation guide"
        onClick={() => setChat(!chat)}
      >
        {chat ? <X size={22} /> : <MessageCircle size={23} />}
        <span>Need a little guidance?</span>
      </button>
      <Dialog open={chat} onOpenChange={setChat}>
        <DialogContent className="guide-dialog">
          <DialogHeader>
            <DialogTitle>
              <Sparkles size={21} />{' '}
              {aiReady ? 'Yogi Astro AI assistant' : 'Your consultation guide'}
            </DialogTitle>
            <DialogDescription>
              {aiReady
                ? 'AI assistance for services and booking.'
                : 'Quick answers to help you plan your consultation.'}
            </DialogDescription>
          </DialogHeader>
          <div className="guide-welcome">Namaste. What would you like to know before booking?</div>
          <div className="guide-prompts">
            {[
              'Which service should I choose?',
              'What should I prepare?',
              'What languages are available?',
              'What is the fee?',
            ].map((q) => (
              <button key={q} onClick={() => ask(q)} disabled={chatBusy}>
                {q}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          {(answer || chatBusy) && (
            <div role="status" className="guide-answer">
              {answer || 'Thinking…'}
            </div>
          )}
          {aiReady && (
            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                if (question.trim()) ask(question);
              }}
            >
              <input
                aria-label="Your question"
                value={question}
                maxLength={500}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about a consultation…"
              />
              <button aria-label="Send question" disabled={chatBusy || !question.trim()}>
                <Send size={18} />
              </button>
            </form>
          )}
          <a href="#booking" className="button full" onClick={() => setChat(false)}>
            Go to booking <ArrowRight size={16} />
          </a>
          <small className="field-help">
            Please keep birth details and personal information for your private consultation.
          </small>
        </DialogContent>
      </Dialog>
    </>
  );
}
