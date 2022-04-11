import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import penIcon from "../assets/icons/pen/pen.png";
import closeIcon from "../assets/icons/close/close.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  index: number;
  item: Task;

  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setEditedTitle(item.title);
    setEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, editedTitle);
    setEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={editedTitle}
            onChangeText={setEditedTitle}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskButtonsContainer}>
        {editing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={handleCancelEditing}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        )}

        {!editing && (
          <TouchableOpacity
            style={{ paddingHorizontal: 12 }}
            onPress={handleStartEditing}
          >
            <Image source={penIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.separator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 12, opacity: editing ? 0.2 : 1 }}
          onPress={() => removeTask(item.id)}
          disabled={editing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
    padding: 0,
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
    padding: 0,
  },
  taskButtonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});
