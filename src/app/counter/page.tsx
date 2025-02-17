'use client';

import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@tremor/react';
import { useState } from 'react';
import { 
  Users, 
  ChevronRight, 
  Bell, 
  Clock, 
  User,
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react';

// Mock data - replace with API calls later
const mockCounters = [
  { id: '01', name: 'Guichê 01', status: 'available' },
  { id: '02', name: 'Guichê 02', status: 'busy' },
  { id: '03', name: 'Guichê 03', status: 'available' },
  { id: '04', name: 'Guichê 04', status: 'offline' },
];

const mockQueue = [
  { number: 'A124', priority: true, name: 'Maria Silva', age: 65, phone: '(11) 98765-4321', arrivalTime: new Date(Date.now() - 30 * 60000) },
  { number: 'A125', priority: false, name: 'João Santos', age: 45, phone: '(11) 98765-4322', arrivalTime: new Date(Date.now() - 25 * 60000) },
  { number: 'A126', priority: true, name: 'Ana Oliveira', age: 72, phone: '(11) 98765-4323', arrivalTime: new Date(Date.now() - 20 * 60000) },
  { number: 'A127', priority: false, name: 'Pedro Costa', age: 33, phone: '(11) 98765-4324', arrivalTime: new Date(Date.now() - 15 * 60000) },
];

const currentPatient = {
  number: 'A123',
  name: 'José Pereira',
  age: 58,
  phone: '(11) 98765-4320',
  arrivalTime: new Date(Date.now() - 35 * 60000),
  priority: true,
  waitTime: '35 min',
  notes: 'Paciente com prioridade por idade',
};

function formatTime(date: Date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function calculateWaitTime(date: Date) {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  return `${minutes} min`;
}

export default function Counter() {
  const [selectedCounter, setSelectedCounter] = useState<string | null>(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  return (
    <MainLayout>
      <div className="p-8 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-12 gap-8">
          {/* Counter Selection */}
          <div className="col-span-12 mb-6">
            <h1 className="text-2xl font-normal text-gray-800 mb-6">Selecione seu Guichê</h1>
            <div className="grid grid-cols-4 gap-4">
              {mockCounters.map((counter) => (
                <button
                  key={counter.id}
                  onClick={() => setSelectedCounter(counter.id)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    selectedCounter === counter.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  } ${counter.status === 'offline' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={counter.status === 'offline'}
                >
                  <div className="text-xl font-normal text-gray-800">{counter.name}</div>
                  <div className={`text-sm mt-2 ${
                    counter.status === 'available' ? 'text-green-500' :
                    counter.status === 'busy' ? 'text-orange-500' : 'text-gray-500'
                  }`}>
                    {counter.status === 'available' ? 'Disponível' :
                     counter.status === 'busy' ? 'Em Atendimento' : 'Offline'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedCounter && (
            <>
              {/* Current Patient */}
              <div className="col-span-8">
                <Card className="p-6 rounded-2xl">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-normal text-gray-800">Em Atendimento</h2>
                      <p className="text-gray-500 mt-1">Guichê {selectedCounter}</p>
                    </div>
                    <button
                      onClick={() => setShowPatientDetails(!showPatientDetails)}
                      className="px-4 py-2 text-sm font-normal text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {showPatientDetails ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                    </button>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-3xl font-normal ${
                          currentPatient.priority ? 'text-rose-500' : 'text-blue-500'
                        }`}>
                          {currentPatient.number}
                        </span>
                        {currentPatient.priority && (
                          <AlertCircle size={20} className="text-rose-500" />
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User size={18} />
                          <span>{currentPatient.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={18} />
                          <span>{currentPatient.age} anos</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={18} />
                          <span>{currentPatient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={18} />
                          <span>Aguardando há {currentPatient.waitTime}</span>
                        </div>
                      </div>

                      {showPatientDetails && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Observações</h3>
                          <p className="text-gray-600">{currentPatient.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                        Chamar Próximo
                      </button>
                      <button className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                        Finalizar Atendimento
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Queue */}
              <div className="col-span-4">
                <Card className="p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-gray-500" />
                      <h2 className="text-xl font-normal text-gray-800">Fila de Espera</h2>
                    </div>
                    <span className="text-sm text-gray-500">{mockQueue.length} pessoas</span>
                  </div>

                  <div className="space-y-4">
                    {mockQueue.map((patient) => (
                      <div
                        key={patient.number}
                        className="p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-normal ${
                              patient.priority ? 'text-rose-500' : 'text-blue-500'
                            }`}>
                              {patient.number}
                            </span>
                            {patient.priority && (
                              <AlertCircle size={16} className="text-rose-500" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {calculateWaitTime(patient.arrivalTime)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{patient.name}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
