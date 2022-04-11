import React from "react";
import { FlatList } from "react-native";

import { ItemWrapper } from "./ItemWrapper";
import { Task, TaskItem } from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <ItemWrapper index={index}>
          <TaskItem
            index={index}
            item={item}
            removeTask={removeTask}
            toggleTaskDone={toggleTaskDone}
            editTask={editTask}
          />
        </ItemWrapper>
      )}
      style={{
        marginTop: 32,
      }}
    />
  );
}
