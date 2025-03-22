import { View, Text, Animated } from 'react-native';
import { styles } from '../styles/style';
import { DATA } from '../Medicaments/Medication';
import { Item } from '../Item/Item';
import { useEffect, useState } from 'react';
import Header from '../Header';

export const MedicamentsListed = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = DATA.map((section) => ({
        titleLetter: section.titleLetter,
        data: section.data.filter((medicament) =>
            medicament.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(section => section.data.length > 0);

    return (
        <View style={styles.container}>
            <View style={styles.sectionMain}>                
                    <Animated.SectionList
                        sections={filteredData}
                        keyExtractor={(item, index) => item.id + index}
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