import { View, Text, Animated } from 'react-native';
import { styles } from '../styles/style';
import { Item } from '../Item/Item';
import { useState, useEffect } from 'react';
import Header from '../Header';
import { Medication } from '../../interfaces/Medication';
import SplashLoading from '../SplashLoading';

interface MedicamentsListedProps {
    medications: Medication[]
    setSkip?: React.Dispatch<React.SetStateAction<number>>
    setLimit?: React.Dispatch<React.SetStateAction<number>>
}

export const MedicamentsListed = ({ medications, setLimit, setSkip}: MedicamentsListedProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleEndReached = () => {
        setLimit?.((prevLimit) => prevLimit + 30)
        setSkip?.((prevSkip) => prevSkip + 30)
    }

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
                        keyExtractor={(item, index) => `${item.id}-${index}`} 
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
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={() => (
                            <View style={{marginVertical: 20}}>
                                <SplashLoading />
                            </View>
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