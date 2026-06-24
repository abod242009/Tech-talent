import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/translations';

const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];
const goals = [
  { id: 'tawjihi', labelEn: 'Palestinian / Tawjihi', labelAr: 'المسار الفلسطيني / التوجيهي' },
  { id: 'international', labelEn: 'International Track / Pre‑IB / A‑Levels', labelAr: 'المسار الدولي / ما قبل البكالوريا الدولية' },
  { id: 'notSure', labelEn: 'Not Sure Yet — Help Me Choose', labelAr: 'لست متأكداً بعد — ساعدني في الاختيار' },
];
const situations = [
  { id: 'regular', labelEn: 'I am studying regularly', labelAr: 'أدرس بانتظام' },
  { id: 'interrupted', labelEn: 'My schooling has been interrupted', labelAr: 'دراستي قد تعرقلت' },
  { id: 'weakInternet', labelEn: 'I have weak internet access', labelAr: 'لدي اتصال إنترنت ضعيف' },
  { id: 'knowLevel', labelEn: 'I need help knowing my level', labelAr: 'أحتاج معرفة مستواي' },
  { id: 'prepareStrong', labelEn: 'I want to prepare for a stronger academic track', labelAr: 'أريد الاستعداد لمسار أكاديمي أقوى' },
];

const ProfileScreen = ({ navigation }) => {
  const { t, language } = useTranslation();
  const { setProfile, setLanguage: setAppLanguage } = useApp();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState(grades[0]);
  const [preferredLang, setPreferredLang] = useState(language);
  const [goal, setGoal] = useState(goals[0].id);
  const [situation, setSituation] = useState(null);

  const handleSave = () => {
    if (!name || !age) {
      Alert.alert('Error', 'Name and age are required.');
      return;
    }
    const profile = {
      name,
      age: parseInt(age, 10),
      grade,
      preferredLanguage: preferredLang,
      goal,
      situation,
    };
    setProfile(profile);
    // update app language to preferred
    setAppLanguage(preferredLang);
    navigation.navigate('TestMenu');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('profileTitle')}</Text>
      <Text style={styles.label}>{t('studentName')}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={language === 'en' ? 'Enter your name' : 'أدخل اسمك'}
      />
      <Text style={styles.label}>{t('age')}</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder={language === 'en' ? 'Enter your age' : 'أدخل عمرك'}
        keyboardType="numeric"
      />
      <Text style={styles.label}>{t('grade')}</Text>
      {grades.map((g) => (
        <TouchableOpacity
          key={g}
          style={[styles.selectItem, grade === g && styles.selectedItem]}
          onPress={() => setGrade(g)}
        >
          <Text>{g}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.label}>{t('preferredLanguage')}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity
          style={[styles.langButton, preferredLang === 'en' && styles.langSelected]}
          onPress={() => setPreferredLang('en')}
        >
          <Text>{t('english')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, preferredLang === 'ar' && styles.langSelected]}
          onPress={() => setPreferredLang('ar')}
        >
          <Text>{t('arabic')}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{t('academicGoal')}</Text>
      {goals.map((g) => {
        const label = language === 'en' ? g.labelEn : g.labelAr;
        return (
          <TouchableOpacity
            key={g.id}
            style={[styles.selectItem, goal === g.id && styles.selectedItem]}
            onPress={() => setGoal(g.id)}
          >
            <Text>{label}</Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.label}>{t('currentSituation')}</Text>
      {situations.map((s) => {
        const label = language === 'en' ? s.labelEn : s.labelAr;
        return (
          <TouchableOpacity
            key={s.id}
            style={[styles.selectItem, situation === s.id && styles.selectedItem]}
            onPress={() => setSituation(situation === s.id ? null : s.id)}
          >
            <Text>{label}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{t('saveContinue')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{t('back')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  selectItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: '#007AFF33',
    borderColor: '#007AFF',
  },
  langButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  langSelected: {
    backgroundColor: '#007AFF33',
    borderColor: '#007AFF',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default ProfileScreen;