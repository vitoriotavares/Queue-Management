'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@tremor/react';
import { useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  LayoutGrid,
  FileText,
  Clock,
  Users,
  Shield,
  MonitorPlay,
  Newspaper,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

// Mock data - replace with API calls later
const mockServices = [
  { id: 1, name: 'Consulta Médica', description: 'Atendimento médico geral', active: true },
  { id: 2, name: 'Exames', description: 'Coleta de exames laboratoriais', active: true },
  { id: 3, name: 'Vacinação', description: 'Serviços de vacinação', active: false },
];

const mockCounters = [
  { id: 1, name: 'Guichê 01', status: 'active' },
  { id: 2, name: 'Guichê 02', status: 'active' },
  { id: 3, name: 'Guichê 03', status: 'inactive' },
];

const mockHistory = [
  { 
    id: 1,
    date: '2025-02-17',
    attendant: 'João Silva',
    counter: 'Guichê 01',
    patientsAttended: 45,
    averageTime: '12min',
    startTime: '08:00',
    endTime: '17:00'
  },
  { 
    id: 2,
    date: '2025-02-16',
    attendant: 'João Silva',
    counter: 'Guichê 02',
    patientsAttended: 38,
    averageTime: '15min',
    startTime: '08:00',
    endTime: '17:00'
  },
];

const mockUsers = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'attendant', active: true },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'admin', active: true },
  { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', role: 'attendant', active: false },
];

const mockTVs = [
  { 
    id: 1, 
    name: 'TV Recepção',
    description: 'Painel principal na área de espera',
    location: 'Recepção Principal',
    services: [1, 2, 3], // IDs dos serviços associados
    active: true
  },
  { 
    id: 2, 
    name: 'TV Laboratório',
    description: 'Painel de chamada para exames',
    location: 'Área de Coleta',
    services: [2], // Apenas exames
    active: true
  },
  { 
    id: 3, 
    name: 'TV Enfermaria',
    description: 'Painel de chamada para vacinação',
    location: 'Setor de Enfermagem',
    services: [3], // Apenas vacinação
    active: false
  },
];

const mockNews = [
  { 
    id: 1,
    title: 'Dica de Saúde',
    content: 'Beba água regularmente e pratique exercícios',
    active: true,
    priority: 1,
    tvs: [1, 2] // IDs das TVs onde essa notícia aparece
  },
  { 
    id: 2,
    title: 'Campanha de Vacinação',
    content: 'Vacine-se contra a gripe! Disponível para todas as idades',
    active: true,
    priority: 2,
    tvs: [1, 3]
  },
  { 
    id: 3,
    title: 'Horário Especial',
    content: 'Atendimento estendido às quartas-feiras até 20h',
    active: false,
    priority: 3,
    tvs: [1]
  },
];

type TabType = 'services' | 'counters' | 'history' | 'users' | 'tvs' | 'news';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [editingService, setEditingService] = useState<number | null>(null);
  const [editingCounter, setEditingCounter] = useState<number | null>(null);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [newCounter, setNewCounter] = useState({ name: '' });

  const tabs = [
    { id: 'services', label: 'Serviços', icon: FileText },
    { id: 'counters', label: 'Guichês', icon: LayoutGrid },
    { id: 'tvs', label: 'TVs', icon: MonitorPlay },
    { id: 'news', label: 'Notícias', icon: Newspaper },
    { id: 'history', label: 'Histórico', icon: Clock },
    { id: 'users', label: 'Usuários', icon: Users },
  ];

  return (
    <MainLayout>
      <div className="p-8 max-w-[1920px] mx-auto">
        <div className="flex gap-8">
          {/* Tabs */}
          <div className="w-64">
            <Card className="p-4 rounded-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-normal">{tab.label}</span>
                </button>
              ))}
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            <Card className="p-8 rounded-2xl">
              {/* Services Tab */}
              {activeTab === 'services' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-normal text-gray-800">Gerenciar Serviços</h2>
                    <button
                      onClick={() => setEditingService(0)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Plus size={20} />
                      <span>Novo Serviço</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {mockServices.map((service) => (
                      <div
                        key={service.id}
                        className={`p-4 rounded-xl border-2 ${
                          service.active ? 'border-gray-100' : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-lg font-normal text-gray-800">{service.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{service.description}</div>
                            <div className={`text-sm mt-2 ${
                              service.active ? 'text-green-500' : 'text-gray-400'
                            }`}>
                              {service.active ? 'Ativo' : 'Inativo'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingService(service.id)}
                              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Counters Tab */}
              {activeTab === 'counters' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-normal text-gray-800">Gerenciar Guichês</h2>
                    <button
                      onClick={() => setEditingCounter(0)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Plus size={20} />
                      <span>Novo Guichê</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {mockCounters.map((counter) => (
                      <div
                        key={counter.id}
                        className={`p-4 rounded-xl border-2 ${
                          counter.status === 'active' ? 'border-gray-100' : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-lg font-normal text-gray-800">{counter.name}</div>
                            <div className={`text-sm mt-2 ${
                              counter.status === 'active' ? 'text-green-500' : 'text-gray-400'
                            }`}>
                              {counter.status === 'active' ? 'Ativo' : 'Inativo'}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingCounter(counter.id)}
                              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TVs Tab */}
              {activeTab === 'tvs' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-normal text-gray-800">Gerenciar TVs</h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Plus size={20} />
                      <span>Nova TV</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {mockTVs.map((tv) => (
                      <div
                        key={tv.id}
                        className={`p-6 rounded-xl border-2 ${
                          tv.active ? 'border-gray-100' : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <MonitorPlay 
                                size={24} 
                                className={tv.active ? 'text-blue-500' : 'text-gray-400'} 
                              />
                              <div>
                                <div className="text-lg font-normal text-gray-800">{tv.name}</div>
                                <div className="text-sm text-gray-500">{tv.location}</div>
                              </div>
                            </div>
                            
                            <div className="mt-4 text-sm text-gray-600">{tv.description}</div>
                            
                            <div className="mt-4">
                              <div className="text-sm font-medium text-gray-600 mb-2">Serviços Associados:</div>
                              <div className="flex flex-wrap gap-2">
                                {tv.services.map(serviceId => {
                                  const service = mockServices.find(s => s.id === serviceId);
                                  return service && (
                                    <span
                                      key={serviceId}
                                      className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg"
                                    >
                                      {service.name}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            <div className={`text-sm mt-4 ${
                              tv.active ? 'text-green-500' : 'text-gray-400'
                            }`}>
                              {tv.active ? 'Ativo' : 'Inativo'}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News Tab */}
              {activeTab === 'news' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-normal text-gray-800">Gerenciar Notícias</h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Plus size={20} />
                      <span>Nova Notícia</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {mockNews.map((news) => (
                      <div
                        key={news.id}
                        className={`p-6 rounded-xl border-2 ${
                          news.active ? 'border-gray-100' : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <Newspaper 
                                    size={24} 
                                    className={news.active ? 'text-blue-500' : 'text-gray-400'} 
                                  />
                                  <div>
                                    <div className="text-lg font-normal text-gray-800">{news.title}</div>
                                    <div className="text-sm text-gray-500 mt-1">{news.content}</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                  title="Mover para cima"
                                >
                                  <ChevronUp size={20} />
                                </button>
                                <button
                                  className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                  title="Mover para baixo"
                                >
                                  <ChevronDown size={20} />
                                </button>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="text-sm font-medium text-gray-600 mb-2">Exibir nas TVs:</div>
                              <div className="flex flex-wrap gap-2">
                                {news.tvs.map(tvId => {
                                  const tv = mockTVs.find(t => t.id === tvId);
                                  return tv && (
                                    <span
                                      key={tvId}
                                      className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg"
                                    >
                                      {tv.name}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            <div className={`text-sm mt-4 ${
                              news.active ? 'text-green-500' : 'text-gray-400'
                            }`}>
                              {news.active ? 'Ativo' : 'Inativo'}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div>
                  <h2 className="text-xl font-normal text-gray-800 mb-6">Histórico de Atendimento</h2>
                  
                  <div className="space-y-4">
                    {mockHistory.map((record) => (
                      <div
                        key={record.id}
                        className="p-4 rounded-xl border-2 border-gray-100"
                      >
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">Data</div>
                            <div className="font-normal text-gray-800">{record.date}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Atendente</div>
                            <div className="font-normal text-gray-800">{record.attendant}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Guichê</div>
                            <div className="font-normal text-gray-800">{record.counter}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Horário</div>
                            <div className="font-normal text-gray-800">
                              {record.startTime} - {record.endTime}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-2xl font-normal text-blue-600">
                              {record.patientsAttended}
                            </div>
                            <div className="text-sm text-gray-500">Pacientes Atendidos</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-normal text-blue-600">
                              {record.averageTime}
                            </div>
                            <div className="text-sm text-gray-500">Tempo Médio</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-normal text-gray-800">Gerenciar Usuários</h2>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                    >
                      <Plus size={20} />
                      <span>Novo Usuário</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {mockUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`p-4 rounded-xl border-2 ${
                          user.active ? 'border-gray-100' : 'border-gray-100 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <Users size={20} className="text-gray-500" />
                            </div>
                            <div>
                              <div className="text-lg font-normal text-gray-800">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Shield size={16} className={user.role === 'admin' ? 'text-blue-500' : 'text-gray-400'} />
                              <span className="text-sm text-gray-600 capitalize">{user.role}</span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                              >
                                <Edit2 size={20} />
                              </button>
                              <button
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
