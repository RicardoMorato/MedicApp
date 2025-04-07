export interface Medication {
  id: string;
  medicamento: string;
  data_inclusao: string;
  concentracao: string;
  farmaco: string;
}
export interface MedicationUser {
  id: number;
  name: string;
  principio_ativo: string;
  concentracao: string;
}
export interface MedicationDetails {
  id: string;
  medicamento: string;
  data_inclusao: string;
  concentracao: string;
  farmaco: string;
  detentor: string;
  forma_farmaceutica: string;
  registro: number;
}