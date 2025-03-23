import { MedicamentsListed } from '@/components/MedicamentsListed/MedicamentsListed'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  API_URL from "../../config/config";

function MedicationList() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}drugs`)
      .then(response => {setMedications(response.data)})
      .catch(error => console.error('Erro ao buscar medicamentos:', error));
  }, []);

  return (
    <MedicamentsListed medications={medications} />
  )
}

export default MedicationList