import { View, Text, FlatList, Image } from 'react-native';
import { styles } from './styles/style';
import  UserDrugsList  from '../components/ListMedicationUser/index';
import { MedicationUser } from '@/interfaces/Medication';
import nullMedicine from '@/assets/icons/nullMedicin.png';

interface MedicamentsListedProps {
    medications: MedicationUser[]
}

export const MedicamentsListedUser = ({ medications}: MedicamentsListedProps) => {
    const fakeMedications: MedicationUser[] = [
        {
          
            name: 'Paracetamol',
            concentracao: '500mg',
            principio_ativo: 'Paracetamol',
        },
        { name: 'Paracetamol',
          concentracao: '500mg',
          principio_ativo: 'Paracetamol',
        },
        {
          name: 'Paracetamol',
          concentracao: '500mg',
          principio_ativo: 'Paracetamol',
        },{
          name: 'Paracetamol',
          concentracao: '500mg',
          principio_ativo: 'Paracetamol',
        }
      ];
    return (
        <View style={styles.container}>
            <View style={styles.sectionMain}>                
                    <FlatList
                        data={fakeMedications}
                        keyExtractor={(item, index) => `${index}`} 
                        renderItem={({ item }) => <UserDrugsList item={item} />}
                        ListEmptyComponent={
                                <View style={styles.emptyState}>
                                    <Text style={styles.emptyStateTitle}>
                                        Nenhum medicamento cadastrado
                                    </Text>
                                    <Image source={nullMedicine} resizeMode="contain" style={{height: 100, marginTop: 10}}/>
                                    <Text style={styles.emptyStateSubtitle}>Adicione medicamentos para que eles possam aparecer aqui.</Text>
                                </View>
                        }
                    />
            </View>
        </View>
    );
}