import { colors, radius, spacing, tagStyles } from "@/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const STORAGE_KEY = "tasksDatabase";

const AddScreen = () => {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async () => {
    if (!name || !tag) return;

    const newTask = {
      id: Date.now().toString(),
      name,
      tag,
      isDone: false,
    };

    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...tasks, newTask]),
      );

      setName("");
      setTag("");
    } catch (error) {
      console.error(error);
    }
  };

  const isDisabled = !name.trim() || !tag;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionTitle}>Task name</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="What needs to be done?"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />

      <Text style={[styles.sectionTitle, styles.sectionSpacing]}>Priority</Text>

      <View style={styles.tagRow}>
        {Object.entries(tagStyles).map(([value, style]) => {
          const isSelected = tag === value;

          return (
            <Pressable
              key={value}
              onPress={() => setTag(value)}
              style={[
                styles.tagButton,
                {
                  backgroundColor: isSelected ? style.soft : colors.surface,
                  borderColor: isSelected ? style.color : colors.border,
                },
              ]}>
              <Text
                style={[
                  styles.tagButtonText,
                  {
                    color: isSelected ? style.color : colors.textSecondary,
                  },
                ]}>
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {tag ? (
        <View
          style={[
            styles.priorityPreview,
            {
              backgroundColor: tagStyles[tag].soft,
              borderColor: tagStyles[tag].color,
            },
          ]}>
          <Text
            style={[
              styles.priorityPreviewText,
              { color: tagStyles[tag].color },
            ]}>
            {tag} — {tagStyles[tag].label}
          </Text>
          <Text style={styles.priorityPreviewDescription}>
            {tagStyles[tag].description}
          </Text>
        </View>
      ) : null}

      <Pressable onPress={() => setVisible(true)} style={styles.infoButton}>
        <AntDesign name="info-circle" size={18} color={colors.accent} />
        <Text style={styles.infoButtonText}>What does ABCDE mean?</Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled }}
        style={({ pressed }) => [
          styles.submitButton,
          (isDisabled || pressed) && styles.submitButtonDisabled,
        ]}>
        <Text
          style={[
            styles.submitButtonText,
            isDisabled && styles.submitButtonTextDisabled,
          ]}>
          Add task
        </Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setVisible(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setVisible(false)}>
          <Pressable style={styles.modal} onPress={() => {}}>
            <Text style={styles.modalTitle}>ABCDE Method</Text>
            <Text style={styles.modalSubtitle}>
              Choose a priority that matches the task’s importance.
            </Text>

            {Object.entries(tagStyles).map(([key, value]) => (
              <View key={key} style={styles.modalRow}>
                <View
                  style={[
                    styles.modalBadge,
                    {
                      backgroundColor: value.soft,
                      borderColor: value.color,
                    },
                  ]}>
                  <Text style={[styles.modalBadgeText, { color: value.color }]}>
                    {key}
                  </Text>
                </View>

                <View style={styles.modalTextWrapper}>
                  <Text style={styles.modalLabel}>{value.label}</Text>
                  <Text style={styles.modalDescription}>
                    {value.description}
                  </Text>
                </View>
              </View>
            ))}

            <Pressable
              onPress={() => setVisible(false)}
              style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Got it</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  sectionSpacing: {
    marginTop: spacing.lg,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 16,
  },
  tagRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tagButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: "center",
  },
  tagButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  priorityPreview: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  priorityPreviewText: {
    fontSize: 14,
    fontWeight: "700",
  },
  priorityPreviewDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  infoButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  infoButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: "600",
  },
  submitButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submitButtonText: {
    color: "#171008",
    fontSize: 16,
    fontWeight: "700",
  },
  submitButtonTextDisabled: {
    color: colors.textSecondary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  modal: {
    width: "100%",
    backgroundColor: colors.surfaceElevated,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalCloseButton: {
    marginTop: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: "#171008",
    fontSize: 16,
    fontWeight: "700",
  },
  modalTitle: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  modalSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  modalBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBadgeText: {
    fontSize: 14,
    fontWeight: "800",
  },
  modalTextWrapper: {
    flex: 1,
  },
  modalLabel: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  modalDescription: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});

export default AddScreen;
