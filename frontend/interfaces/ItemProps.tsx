import { Medication, MedicationDetails } from "./Medication";
import { MedicationUser } from "./Medication";
export interface ItemProps {
  item: Medication;
}
export interface ItemDetailsProps {
  item: MedicationDetails;
}

export interface ItemPropsUser {
  item: MedicationUser;
}