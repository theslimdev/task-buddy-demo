// IMPORTS
// Styling
import styles from "./TaskList.module.scss";
// Components
import TaskItem from "./TaskItem";

const TasksList = (props) => {
  return (
    <ul
      className={`${styles.nobullets} d-flex flex-wrap justify-content-center justify-content-md-start`}
    >
      {props.tasks.map((task) => (
        <TaskItem
          tasks={props.tasks}
          key={task.id}
          id={task.id}
          name={task.name}
          priority={task.priority}
          description={task.description}
          active={task.active}
          dateAdded={task.dateAdded}
          dateUpdated={task.dateUpdated}
          dateCompleted={task.dateCompleted}
          taskPoints={task.taskPoints}
          elapsedTime={task.elapsedTime}
          elapsedPoints={task.elapsedPoints}
          totalPoints={task.totalPoints}
          onUpdateTask={props.onUpdateTasks}
          onRemoveTask={props.onRemoveTasks}
          toggleCheckbox={props.toggleCheckbox}
          togglePriority={props.togglePriority}
        />
      ))}
    </ul>
  );
};

export default TasksList;
