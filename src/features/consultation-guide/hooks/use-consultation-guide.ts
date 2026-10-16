'use client';
import { useState } from 'react';
export function useConsultationGuide(aiReady: boolean) {
  const [chat, setChat] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatBusy, setChatBusy] = useState(false);
  const [answer, setAnswer] = useState('');
  async function ask(text: string) {
    setQuestion(text);
    setChatBusy(true);
    setAnswer('');
    try {
      if (!aiReady) {
        const q = text.toLowerCase();
        setAnswer(
          q.includes('language')
            ? 'You can consult in Tamil, Telugu or English. Select your preferred language in the booking form.'
            : q.includes('prepare') || q.includes('details')
              ? 'Keep your date, exact time and place of birth ready. Marriage compatibility requires both partners’ details. You do not need to share birth details in this chat.'
              : q.includes('fee') || q.includes('price')
                ? 'Fees will be shared before you confirm your consultation. Prices are not yet published.'
                : 'Choose Horoscope consultation for personal, career and planetary guidance, or Marriage compatibility for a reading of both partners’ charts. Use the booking form to choose your preferred date and call mode.',
        );
        return;
      }
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      if (!r.ok) throw Error('The assistant is unavailable. Please use the FAQs or booking form.');
      const reader = r.body?.getReader();
      if (!reader) throw Error('No response received.');
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setAnswer((a) => a + decoder.decode(value, { stream: true }));
      }
    } catch (e) {
      setAnswer(e instanceof Error ? e.message : 'Please try again.');
    } finally {
      setChatBusy(false);
    }
  }

  return { chat, setChat, question, setQuestion, chatBusy, answer, ask };
}
