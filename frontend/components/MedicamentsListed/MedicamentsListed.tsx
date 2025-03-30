import { View, Text, Animated } from 'react-native';
import { styles } from '../styles/style';
import { Item } from '../Item/Item';
import Header from '../Header';
import { Medication } from '../../interfaces/Medication';
import SplashLoading from '../SplashLoading';

interface MedicamentsListedProps {
    medications: Medication[]
    setSkip?: React.Dispatch<React.SetStateAction<number>>
    setLimit?: React.Dispatch<React.SetStateAction<number>>
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    searchQuery: string
}


export const MedicamentsListed = ({ medications, setLimit, setSkip, searchQuery, setSearchQuery}: MedicamentsListedProps) => {
    

    const handleEndReached = () => {
        filteredData.length > 0 &&
        (setLimit?.((prevLimit) => prevLimit + 50),
        setSkip?.((prevSkip) => prevSkip + 50))
    }

    const filteredData = medications
        .filter((medicament) =>
            medicament.medicamento.toLowerCase().includes(searchQuery.toLowerCase()) || medicament.farmaco.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const startsWithA = a.medicamento.toLowerCase().startsWith(searchQuery.toLowerCase());
            const startsWithB = b.medicamento.toLowerCase().startsWith(searchQuery.toLowerCase());
            if (startsWithA && !startsWithB) return -1
            if (!startsWithA && startsWithB) return 1
            return 0
        })
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
                <Header 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} 
                />
                    <Animated.SectionList
                        sections={filteredData}
                        keyExtractor={(item, index) => `${item.id}-${index}`} 
                        renderItem={({ item }) => <Item item={item} />}
                        ListEmptyComponent={
                        <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>
                            Nenhum medicamento encontrado para "{searchQuery}"
                        </Text>
                        </View>}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.4}
                        ListFooterComponent={() => (
                            filteredData.length > 0 && (
                                <View style={{ marginVertical: 20 }}>
                                    <SplashLoading />
                                </View>
                            )
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