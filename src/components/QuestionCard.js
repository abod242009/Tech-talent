import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from '../i18n/translations';

/**
 * QuestionCard renders a multiple choice question. It highlights the selected
 * option and calls onSelect when an option is pressed.
 */
const QuestionCard = ({ question, options, selectedOption, onSelect }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((opt, index) => {
        const isSelected = selectedOption === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelect(index)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF33',
    borderColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
  },
});

export default QuestionCard;