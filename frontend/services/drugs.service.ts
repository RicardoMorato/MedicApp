import { drugsInteractions } from "@/data";
import { Drug } from "@/type";

export async function checkDrugInteraction(drugs: Drug[]) {
  const hasInteraction = hasDrugInteraction(drugs[0], drugs[1]);
  return hasInteraction;
}

function hasDrugInteraction(drugA: any, drugB: any) {
  console.log(drugA);
  console.log(drugB);
  for (const drug of drugsInteractions) {
    if (
      (drug.drugId == drugA && drug.interactedId == drugB) ||
      (drug.drugId == drugB && drug.interactedId == drugA)
    )
      return true;
  }
  return false;
}
