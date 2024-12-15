import { redirect } from 'next/navigation'
import {Plant} from "@/models/plant";

export async function AddPlantsServer(newPlant: Plant) {
    let error = ""

    // Validación de la frecuencia de riego
    if (newPlant.wateringFrequencyDays <= 0) {
        error = 'La frecuencia de riego debe ser mayor que cero.';
        return error;
    }

    try {
        const response = await fetch('https://localhost:7216/api/plants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlant),
        });
console.log(response.ok);
        if (response.ok) {
            redirect('./');
        } else {
            // Mostrar el mensaje de error en la pantalla
            try {
                const errorData = await response.json();
                // Intenta obtener el mensaje de error del backend
                if (errorData.errors) {
                    // Si hay errores de validación, muestra el primer error
                    const firstError = errorData.errors[0][0];
                    error = firstError;
                } else {
                    // Si no hay errores específicos, muestra un mensaje genérico
                    error = errorData.message || 'Error al agregar la planta.';
                }
            } catch (error) {
                console.error(error);
                error = 'Error al agregar la planta.';
            }
        }
    } catch (error) {
        console.error(error);
        error = 'Error al agregar la planta.';
    }

    return error;
}
