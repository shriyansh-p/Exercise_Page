import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const BodyPartScroll = ({ bodyParts, selectedBodyPart, setSelectedBodyPart }) => {
    // Calculate maximum width needed for the longest body part name
    const maxWidth = Math.max(...bodyParts.map(part => part.length * 8 + 30)); // Fixed missing parenthesis

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            style={styles.scrollContainer}
        >
            {bodyParts.map((part) => (
                <TouchableOpacity
                    key={part}
                    style={[
                        styles.item,
                        { width: Math.min(maxWidth, Dimensions.get('window').width * 0.3) }, // Cap at 30% screen width
                        selectedBodyPart === part && styles.selectedItem
                    ]}
                    onPress={() => setSelectedBodyPart(part)}
                >
                    <Text
                        style={styles.text}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {part}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        marginVertical: 10,
        maxHeight: 50, // Fixed height for the scroll container
    },
    scrollContent: {
        paddingHorizontal: 10,
        alignItems: 'center', // Vertically center items
    },
    item: {
        backgroundColor: '#ddd',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36, // Fixed height for buttons
        minWidth: 60, // Minimum width for very short names
    },
    selectedItem: {
        backgroundColor: '#4CAF50',
    },
    text: {
        textTransform: 'capitalize',
        color: '#000',
        fontWeight: '500',
        fontSize: 14,
    },
});

export default BodyPartScroll;