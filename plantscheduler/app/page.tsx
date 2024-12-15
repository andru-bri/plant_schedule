"use client";
import { useState, useEffect } from 'react';
import { Plant } from '@/models/plant'
import Link from 'next/link';

interface DashboardProps {
  plants: Plant[];
}

const Dashboard: React.FC<DashboardProps> = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchPlants = async () => {
      const response = await fetch('https://localhost:7216/api/plants');
      const data = await response.json();
      setPlants(data);
    };

    fetchPlants();
  }, []);

  const daysUntilNextWatering = (plant: Plant): number => {
    const today = new Date();
    const lastWatered = new Date(plant.lastWateredDate ?? '');
    const nextWatering = new Date(lastWatered);
    nextWatering.setDate(lastWatered.getDate() + plant.wateringFrequencyDays);
    const diff = nextWatering.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const sortPlantsByNextWateringDate = (a: Plant, b: Plant) => {
    const daysA = daysUntilNextWatering(a);
    const daysB = daysUntilNextWatering(b);

    return daysA - daysB; // Ordenar ascendentemente por días hasta el próximo riego
  };

  const plantStatus = (days: number): string => {
    if (days <= 0) {
      return 'Overdue';
    } else if (days <= 3) {
      return 'Due Soon';
    } else {
      return 'OK';
    }
  };

  const filteredPlants = plants.sort(sortPlantsByNextWateringDate).filter((plant) => {
    const typeMatch = filterType === 'all' || plant.type === filterType;
    const statusMatch = filterStatus === 'all' || plantStatus(daysUntilNextWatering(plant)) === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Mis Plantas</h1>
        {/* Botón para agregar planta */}
        <div className="mb-4">
          <Link href="/plants/add">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Agregar Planta
            </button>
          </Link>
        </div>
        {/* Filtros */}
        <div className="filters flex justify-between items-center mb-4">
          <div>
            <label htmlFor="filterType" className="mr-2">Tipo de planta:</label>
            <select
                id="filterType"
                className="border border-gray-400 rounded px-2 py-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="succulent">Suculenta</option>
              <option value="tropical">Tropical</option>
              <option value="herb">Hierba</option>
              <option value="cacti">Cactus</option>
            </select>
          </div>

          <div>
            <label htmlFor="filterStatus" className="mr-2">Estado:</label>
            <select
                id="filterStatus"
                className="border border-gray-400 rounded px-2 py-1"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="Overdue">Vencido</option>
              <option value="Due Soon">Próximamente</option>
              <option value="OK">OK</option>
            </select>
          </div>
        </div>

        {/* Lista de plantas */}
        {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPlants.map((plant) => (
              <div key={plant.id} className="border border-gray-400 rounded-lg p-4">
                <div className="font-bold">{plant.name}</div>
                <div>Tipo: {plant.type}</div>
                <div>Ubicación: {plant.location}</div>
                <div>Próximo riego: {daysUntilNextWatering(plant)} días</div>
                <div
                    className={`
                ${plantStatus(daysUntilNextWatering(plant)) === 'Overdue' ? 'text-red-500 font-bold' : ''}
                ${plantStatus(daysUntilNextWatering(plant)) === 'Due Soon' ? 'text-orange-500' : ''}
                ${plantStatus(daysUntilNextWatering(plant)) === 'OK' ? 'text-green-500' : ''}
              `}
                >
                  Estado: {plantStatus(daysUntilNextWatering(plant))}
                </div>
              </div>
          ))}
        </div>
        ) : (
            <div className="text-center text-gray-500">No hay plantas para mostrar.</div>
        )}
      </div>
  );
}

export default Dashboard;
