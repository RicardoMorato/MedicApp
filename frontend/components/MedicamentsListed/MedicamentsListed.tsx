import { View, Text, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import { styles } from '../styles/style';
import { Item } from '../Item/Item';
import Header from '../Header';
import { Medication, MedicationDetails } from '../../interfaces/Medication';
import SplashLoading from '../SplashLoading';
import { Colors } from '@/constants/Colors';

interface MedicamentsListedProps {
    medications: MedicationDetails[]
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    searchQuery: string
    handleEndReached?: () => void
    hasMore?: boolean
}


export const MedicamentsListed = ({ medications, searchQuery, setSearchQuery, handleEndReached, hasMore}: MedicamentsListedProps) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        const timeout = setTimeout(() => setIsFetching(false), 1200)
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const normalizeLetter = (letter: string) => letter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const filteredData = medications
        .filter((medicament) => 
            normalizeLetter(medicament.medicamento.toLowerCase()).includes(searchQuery.toLowerCase()) 
            || 
            normalizeLetter(medicament.farmaco.toLowerCase()).includes(searchQuery.toLowerCase())   
            || 
            medicament.medicamento.toLowerCase().includes(searchQuery.toLowerCase()) 
            ||
            medicament.farmaco.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .reduce((sections: { titleLetter: string, data: MedicationDetails[] }[], medicament) => {
            const firstLetter = normalizeLetter(medicament.medicamento[0].toUpperCase());
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
                <Header 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} 
                />
                    <Animated.SectionList
                        sections={filteredData}
                        keyExtractor={(item, index) => `${item.id}-${index}`} 
                        renderItem={({ item }) => <Item item={item} />}
                        ListEmptyComponent={
                            isFetching ? (
                                <View style={{ alignItems: 'center', top: 300 }}>
                                    <SplashLoading />
                                </View>
                            ) : (
                                <View style={styles.emptyState}>
                                    <Text style={styles.emptyStateText}>
                                        Nenhum medicamento encontrado para "{searchQuery}"
                                    </Text>
                                </View>
                            )
                        }
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={() => (
                            (hasMore && filteredData.length > 0) ? (
                                <View style={{ marginVertical: 20 }}>
                                    <SplashLoading />
                                </View>
                            )
                            : filteredData.length > 0 &&(
                            <View style={{ marginVertical: 20, alignItems: 'center' }}>
                                    <Text style={{color: Colors.light.backgroundGreyBlack}}>Sem mais resultados</Text>
                                </View>)
                        )}
                        
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