import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyAddedTasks = tasks.find((task) => task.title === newTaskTitle);
    if (alreadyAddedTasks)
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
