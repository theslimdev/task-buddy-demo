// IMPORTS
import "./App.scss";
// React, hooks, libraries, etc.
import { useState, useEffect, useMemo } from "react";
// Components
import TaskBuddy from "./components/Buddy/TaskBuddy";
import TaskForm from "./components/TaskItems/TaskForm";
import TasksList from "./components/TaskItems/TasksList";
import Footer from "./components/Layout/Footer";

function App() {
  // Local Storage variable
  const LOCAL_STORAGE_KEY = "todoApp.tasks";

  /* STATES */
  // Tasks list state
  // If Local Storage isn't empty (null) then initialize tasks state with data, else an empty array
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
  });

  // Buddy state
  const [taskBuddy, setTaskBuddy] = useState("");

  /* VARIABLES */
  // Sum of points from all active tasks
  let sumOfPoints = 0;

  // READ - useEffect to display data whenever tasks state has changed
  // Add data from tasks state into Local Storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Calculates the amount of time (days) has passed for each task and adds points. Priority of a task determines how many additonal points are added.
  useEffect(() => {
    const currentDate = new Date();

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const daysElapsed = parseInt(
          (currentDate - new Date(task.dateAdded)) / (1000 * 60 * 60 * 24)
        );

        const pointsElapsed = task.priority ? daysElapsed * 5 : daysElapsed * 2;

        const total = task.taskPoints + pointsElapsed;

        return {
          ...task,
          elapsedTime: daysElapsed,
          elapsedPoints: pointsElapsed,
          totalPoints: total,
        };
      })
    );
  }, []);

  // CREATE - function to save tasks
  const addTask = (newTask) => {
    setTasks(newTask);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTask));
  };

  // Memoize and filter active/inactive tasks from main tasks array
  const activeTasks = useMemo(
    () => tasks.filter((task) => task.active),
    [tasks]
  );
  const completedTasks = useMemo(
    () => tasks.filter((task) => !task.active),
    [tasks]
  );

  // Calculate (iteratating) and store the total amount of points from each task
  activeTasks.map((task) => {
    return (sumOfPoints += task.totalPoints);
  });

  // Updates active property of a task when completed (checkmark) button is clicked
  const toggleCheckbox = (id) => {
    // Create new Date object for completion that is formatted as Day, Mon 00, 0000, 00:00 AM/PM
    const completedDate = new Date().toLocaleString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    // Iterate through each task and set the completed & active properties opposite to what they already are
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              dateCompleted: task.dateCompleted == null ? completedDate : null,
              active: !task.active,
            }
          : task
      )
    );
  };

  // DELETE - function to delete tasks
  const deleteTask = (id) => {
    const deletedTask = tasks.filter((task) => task.id !== id);
    setTasks(deletedTask);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deletedTask));
  };

  // Clear all tasks
  const clearHandler = () => {
    setTasks([]);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
  };

  return (
    <div id="taskbuddy-page" className="mx-3 mx-md-5">
      <div
        id="task-buddy-header"
        className="row d-flex justify-content-center align-items-center"
      >
        <div className="col-12">
          <h1>TaskBuddy - Beta Build 1.0</h1>
          <p>
            Welcome to TaskBuddy! A ReactJS based application to manage your
            to-do items and tasks while maintaining the health of your buddy.
            The more tasks you add and the longer they remain will negatively
            affect the status of your buddy. So get to it and compelete those
            tasks!
          </p>
        </div>

        {/* TASK BUDDY */}
        <div
          id="task-buddy"
          className={"col-sm-12 col-md-6 col-lg-7 text-center order-md-2"}
        >
          <TaskBuddy
            buddy={taskBuddy}
            setBuddy={setTaskBuddy}
            points={sumOfPoints}
          />
        </div>

        {/* TASK FORM */}
        <div
          id="task-form"
          className={"col-sm-12 col-md-6 col-lg-5 order-md-1"}
        >
          <TaskForm tasks={tasks} onSubmitTask={addTask} />
        </div>
      </div>
      {/* end .task-buddy-header .row */}

      {/* TASKS LISTS */}
      <div id="tasks-lists" className="row">
        <div className="col-12 col-md-8">
          <div className="list-label">
            <h2>Active</h2>
          </div>
          <TasksList
            tasks={activeTasks}
            onUpdateTasks={addTask}
            onRemoveTasks={deleteTask}
            toggleCheckbox={toggleCheckbox}
          />
        </div>

        <div className="col-12 col-md-4 mt-4 mt-md-0">
          <div className="list-label">
            <h2>Completed</h2>
          </div>
          <TasksList
            tasks={completedTasks}
            onRemoveTasks={deleteTask}
            toggleCheckbox={toggleCheckbox}
          />
        </div>
      </div>
      <Footer clearHandler={clearHandler} />
    </div> /* end #taskbuddy-page */
  );
}

export default App;
