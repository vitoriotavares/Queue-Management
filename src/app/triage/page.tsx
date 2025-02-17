'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@tremor/react';
import { useState } from 'react';
import {
  User,
  Phone,
  Calendar,
  Printer,
  AlertCircle,
  X,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';

// Mock data - replace with API calls later
const mockServices = [
  { id: 1, name: 'Consulta Médica', description: 'Atendimento médico geral' },
  { id: 2, name: 'Exames', description: 'Coleta de exames laboratoriais' },
  { id: 3, name: 'Vacinação', description: 'Serviços de vacinação' },
  { id: 4, name: 'Farmácia', description: 'Retirada de medicamentos' },
];

const mockRecentPatients = [
  { 
    id: 1,
    number: 'A128',
    name: 'Maria Silva',
    service: 'Consulta Médica',
    priority: true,
    createdAt: new Date(Date.now() - 5 * 60000),
    status: 'waiting'
  },
  { 
    id: 2,
    number: 'A127',
    name: 'João Santos',
    service: 'Exames',
    priority: false,
    createdAt: new Date(Date.now() - 10 * 60000),
    status: 'waiting'
  },
  { 
    id: 3,
    number: 'A126',
    name: 'Ana Oliveira',
    service: 'Vacinação',
    priority: true,
    createdAt: new Date(Date.now() - 15 * 60000),
    status: 'cancelled'
  },
];

interface PatientForm {
  name: string;
  phone: string;
  age: string;
  serviceId: number;
  priority: boolean;
  priorityReason?: string;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function Triage() {
  const [form, setForm] = useState<PatientForm>({
    name: '',
    phone: '',
    age: '',
    serviceId: 0,
    priority: false,
    priorityReason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', form);
  };

  const handlePrint = () => {
    // Handle ticket printing
    console.log('Printing ticket...');
  };

  const handleCancel = (patientId: number) => {
    // Handle cancellation
    console.log('Cancelling patient:', patientId);
  };

  return (
    <MainLayout>
      <div className="p-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Patient Registration Form */}
          <div className="col-span-8">
            <Card className="p-8 rounded-2xl">
              <h1 className="text-2xl font-normal text-gray-800 mb-8">Triagem de Paciente</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-normal text-gray-700 mb-4">Dados do Paciente</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Nome Completo</label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white text-black placeholder:text-gray-400"
                          placeholder="Digite o nome do paciente"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Telefone</label>
                      <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white text-black placeholder:text-gray-400"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Idade</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={form.age}
                          onChange={(e) => setForm({ ...form, age: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white text-black placeholder:text-gray-400"
                          placeholder="Idade"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                  <h2 className="text-lg font-normal text-gray-700 mb-4">Serviço</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {mockServices.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setForm({ ...form, serviceId: service.id })}
                        className={`p-4 text-left rounded-xl border-2 transition-all ${
                          form.serviceId === service.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        <div className="font-normal text-gray-800">{service.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{service.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Selection */}
                <div className="space-y-4">
                  <h2 className="text-lg font-normal text-gray-700 mb-4">Classificação</h2>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, priority: false })}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        !form.priority
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="font-normal text-gray-800">Normal</div>
                      <div className="text-sm text-gray-500 mt-1">Atendimento padrão</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, priority: true })}
                      className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                        form.priority
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="font-normal text-gray-800">Prioritário</div>
                      <div className="text-sm text-gray-500 mt-1">Atendimento preferencial</div>
                    </button>
                  </div>

                  {form.priority && (
                    <div className="mt-4">
                      <label className="block text-sm text-gray-600 mb-2">Motivo da Prioridade</label>
                      <div className="relative">
                        <FileText size={18} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          value={form.priorityReason}
                          onChange={(e) => setForm({ ...form, priorityReason: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white text-black placeholder:text-gray-400"
                          placeholder="Descreva o motivo da prioridade"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Cadastrar e Gerar Senha
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <Printer size={20} />
                  </button>
                </div>
              </form>
            </Card>
          </div>

          {/* Recent Patients */}
          <div className="col-span-4">
            <Card className="p-8 rounded-2xl">
              <h2 className="text-xl font-normal text-gray-800 mb-6">Últimos Cadastros</h2>
              
              <div className="space-y-4">
                {mockRecentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-lg font-normal ${
                            patient.priority ? 'text-rose-500' : 'text-blue-500'
                          }`}>
                            {patient.number}
                          </span>
                          {patient.priority && (
                            <AlertCircle size={16} className="text-rose-500" />
                          )}
                          {patient.status === 'cancelled' && (
                            <span className="text-sm text-red-500">Cancelado</span>
                          )}
                        </div>
                        <div className="text-gray-800">{patient.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{patient.service}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                          <Clock size={14} />
                          <span>{formatTime(patient.createdAt)}</span>
                        </div>
                      </div>

                      {patient.status !== 'cancelled' && (
                        <button
                          onClick={() => handleCancel(patient.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
