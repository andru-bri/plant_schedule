"use client";
import { useState, useEffect } from 'react';
import { Plant } from '@/models/plant';
import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
import 'react-day-picker/dist/style.css';
import {AddPlantsServer} from "@/app/plants/add/push";


export default function AddPlant() {
    const [newPlant, setNewPlant] = useState<Plant>({
        id: '',
        name: '',
        type: 'succulent',
        wateringFrequencyDays: 7,
        location: '',
    });

    const [error, setError] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewPlant({
            ...newPlant,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(await AddPlantsServer(newPlant));
    };

    // Limpiar el mensaje de error cuando cambien los valores del formulario
    useEffect(() => {
        setError('');
    }, [newPlant]);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Agregar Planta</h1>

            {/* Mostrar el mensaje de error */}
            {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
                {/* Nombre */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newPlant.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Tipo */}
                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                        Tipo:
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newPlant.type}
                        onChange={handleChange}
                    >
                        <option value="succulent">Suculenta</option>
                        <option value="tropical">Tropical</option>
                        <option value="herb">Hierba</option>
                        <option value="cacti">Cactus</option>
                    </select>
                </div>

                {/* Frecuencia de riego */}
                <div className="mb-4">
                    <label htmlFor="wateringFrequencyDays" className="block text-gray-700 font-bold mb-2">
                        Frecuencia de riego (días):
                    </label>
                    <input
                        type="number"
                        id="wateringFrequencyDays"
                        name="wateringFrequencyDays"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newPlant.wateringFrequencyDays}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                {/* Fecha del último riego */}
                <div className="mb-4">
                    <label htmlFor="lastWateredDate" className="block text-gray-700 font-bold mb-2">
                        Último riego:
                    </label>
                    <DayPicker
                        selected={newPlant.lastWateredDate}
                        onSelect={(day: Date) => setNewPlant({...newPlant, lastWateredDate: day})}
                        mode="single"
                        required
                        locale={es}
                        footer={
                            newPlant.lastWateredDate
                                ? `You picked ${newPlant.lastWateredDate.toLocaleDateString()}.`
                                : "Please pick a date."
                        }
                    />
                </div>

                {/* Ubicación */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                        Ubicación:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newPlant.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Botón para enviar */}
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </div>
    );
};
