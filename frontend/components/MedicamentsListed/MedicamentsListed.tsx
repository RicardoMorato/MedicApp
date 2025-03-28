import { View, Text, Animated } from 'react-native';
import { styles } from '../styles/style';
import { Item } from '../Item/Item';
import { useState } from 'react';
import Header from '../Header';
import { Medication } from '../../interfaces/Medication';

interface MedicamentsListedProps {
    medications: Medication[];
    setSkip?: (skip: number) => void;
    setLimit?: (limit: number) => void;
}

export const MedicamentsListed = ({ medications }: MedicamentsListedProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = medications
        .filter((medicament) =>
            medicament.medicamento.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .reduce((sections: { titleLetter: string, data: Medication[] }[], medicament) => {
            const firstLetter = medicament.medicamento[0].toUpperCase();
            const section = sections.find(section => section.titleLetter === firstLetter);
            if (section) {
                section.data.push(medicament);
            } else {
                sections.push({ titleLetter: firstLetter, data: [medicament] });
            }
            return sections;
        }, []);
    return (
        <View style={styles.container}>
            <View style={styles.sectionMain}>                
                    <Animated.SectionList
                        sections={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Item item={item} />}
                        ListHeaderComponent={
                        <Header 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery} 
                        />}
                        ListEmptyComponent={<View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            Nenhum medicamento encontrado para "{searchQuery}"
                        </Text>
                    </View>}
                        renderSectionHeader={({ section: { titleLetter } }) => (
                            <View style={styles.containerSectionHeader}>
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionHeaderText}>{titleLetter}</Text>
                                </View>
                                <Text style={styles.sectionHeaderTextSide}>{titleLetter}</Text>
                            </View>
                        )}
                    />
            
            </View>
        </View>
    );
}