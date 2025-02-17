'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@tremor/react';
import { Clock, AlertCircle, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

const mockData = {
  currentTicket: {
    number: 'A123',
    priority: true,
    counter: '03',
    calledAt: new Date(),
  },
  recentTickets: [
    { number: 'A122', priority: false, counter: '01', calledAt: new Date(Date.now() - 5 * 60000) },
    { number: 'A121', priority: true, counter: '02', calledAt: new Date(Date.now() - 10 * 60000) },
    { number: 'A120', priority: false, counter: '03', calledAt: new Date(Date.now() - 15 * 60000) },
    { number: 'A119', priority: false, counter: '01', calledAt: new Date(Date.now() - 20 * 60000) },
  ],
  news: [
    {
      title: 'Dicas para uma vida saudável',
      content: 'Beba água regularmente e pratique exercícios físicos.',
    },
    {
      title: 'Campanha de Vacinação',
      content: 'Vacine-se contra a gripe! Disponível para todos os grupos.',
    },
    {
      title: 'Horário de Atendimento',
      content: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h',
    }
  ]
};

function formatTime(date: Date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function Display() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const DisplayContent = () => (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8 max-w-[1920px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-8 h-full">
          {/* Current Ticket */}
          <div className="col-span-8">
            <Card className="h-full flex flex-col items-center justify-center p-16 rounded-3xl shadow-sm bg-white border-2 border-gray-100">
              <div className="text-gray-500 font-medium tracking-wide uppercase text-2xl mb-12">
                Senha Atual
              </div>
              <div className="flex items-center gap-8 mb-12">
                <div className={`text-[240px] font-normal leading-none tracking-tight ${
                  mockData.currentTicket.priority ? 'text-rose-500' : 'text-blue-500'
                }`}>
                  {mockData.currentTicket.number}
                </div>
                {mockData.currentTicket.priority && (
                  <div className="bg-rose-50 p-6 rounded-full">
                    <AlertCircle size={64} className="text-rose-500" />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-7xl font-normal text-gray-800">
                  Guichê {mockData.currentTicket.counter}
                </div>
                <div className="flex items-center gap-3 text-gray-400 mt-4">
                  <Clock size={32} />
                  <span className="text-3xl">{formatTime(mockData.currentTicket.calledAt)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Tickets */}
          <div className="col-span-4">
            <Card className="h-full p-10 rounded-3xl shadow-sm bg-white border-2 border-gray-100">
              <h2 className="text-gray-500 font-medium tracking-wide uppercase text-2xl mb-8">
                Últimas Chamadas
              </h2>
              <div className="space-y-6">
                {mockData.recentTickets.map((ticket, index) => (
                  <div
                    key={ticket.number}
                    className="flex items-center justify-between p-6 rounded-2xl bg-gray-50 border-2 border-gray-100 transition-all hover:border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-4xl font-normal ${
                        ticket.priority ? 'text-rose-500' : 'text-blue-500'
                      }`}>
                        {ticket.number}
                      </span>
                      {ticket.priority && (
                        <AlertCircle size={28} className="text-rose-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-normal text-gray-600">Guichê {ticket.counter}</div>
                      <div className="text-xl text-gray-400 mt-2">{formatTime(ticket.calledAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* News Footer */}
      <div className="bg-white border-t-2 border-gray-200 py-6">
        <div className="container mx-auto px-8">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0 px-6 py-3 bg-gray-100 rounded-xl">
              <span className="text-2xl font-normal text-gray-600 uppercase tracking-wide">
                Notícias
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-16 animate-scroll items-center whitespace-nowrap">
                {mockData.news.map((item, index) => (
                  <div key={index} className="flex items-center gap-8 flex-shrink-0">
                    <div>
                      <span className="text-2xl font-normal text-gray-800">{item.title}</span>
                      <span className="mx-3 text-gray-300 text-2xl">•</span>
                      <span className="text-2xl text-gray-600">{item.content}</span>
                    </div>
                    {index < mockData.news.length - 1 && (
                      <ArrowRight size={24} className="text-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className="fixed bottom-6 right-6 p-3 bg-gray-900/50 hover:bg-gray-900/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        {isFullscreen ? (
          <Minimize2 size={20} />
        ) : (
          <Maximize2 size={20} />
        )}
      </button>
    </div>
  );

  return isFullscreen ? (
    <DisplayContent />
  ) : (
    <MainLayout>
      <DisplayContent />
    </MainLayout>
  );
}
