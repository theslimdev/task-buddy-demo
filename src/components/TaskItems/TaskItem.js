// IMPORTS
//Styling
import styles from "./TaskItem.module.scss";
// React, hooks, libraries, etc.
import React, { useState } from "react";
// Components
import PostIt from "../UI/PostIt";
import TaskForm from "./TaskForm";

const TaskItem = (props) => {
  /* STATES */

  // Boolean to determine if a task is being updated
  const [isUpdating, setIsUpdating] = useState(false);
  const [tempId, setTempId] = useState("");
  // Toggle for displaying details dropdown
  const [showDetails, setShowDetails] = useState(false);
  // Class for details dropdown
  const [detailsDisplayClass, setDetailsDisplayClass] =
    useState("collapse-details");

  // Variable to bring in CSS class to change color of a task's color based on which priority it is
  const postColorClass = props.priority ? "priority-sticky" : "yellow-sticky";

  const toggleHandler = () => {
    props.toggleCheckbox(props.id);
  };

  // Update handler - updates current task's fields
  const updateHandler = (event) => {
    // Prevent refresh of page/form
    event.preventDefault();

    // Set isUpdating to true to bring up the form
    setIsUpdating(true);
    setTempId(props.id);
  };

  // Cancel handler - hide form and show original list when Cancel button is clicked
  const cancelUpdateHandler = () => {
    setIsUpdating(false);
  };

  // Delete handler - removes task
  const deleteHandler = () => {
    props.onRemoveTask(props.id);
  };

  // Details handler - shows task details in another post
  const detailHandler = () => {
    // Set details state to opposite of what it is currently
    setShowDetails((prevPriority) => !prevPriority);

    // detailsDisplayClass = "expand-details";

    // Change details class to expand or collapse based on what it is currently
    if (detailsDisplayClass === "collapse-details") {
      setDetailsDisplayClass("expand-details");
    } else {
      setDetailsDisplayClass("collapse-details");
    }
  };

  return (
    // List data passed down through TasksList component
    // If task is being updated (isUpdating = true) then call Form component to show a form within the task
    // Else display the task
    <li>
      <PostIt typeClass="task-post" colorClass={postColorClass}>
        {isUpdating ? (
          <TaskForm
            tasks={props.tasks}
            updatingForm={isUpdating}
            key={props.id}
            id={tempId}
            name={props.name}
            priority={props.priority}
            description={props.description}
            active={props.active}
            dateAdded={props.dateAdded}
            dateUpdated={props.dateUpdated}
            dateCompleted={props.dateCompleted}
            taskPoints={props.taskPoints}
            elapsedPoints={props.elapsedPoints}
            totalPoints={props.totalPoints}
            onCancel={cancelUpdateHandler}
            togglePriority={props.togglePriority}
            onSubmitUpdatedTask={props.onUpdateTask}
          />
        ) : (
          // Post it
          <div className={`${styles["task-content-container"]}`}>
            {/* Task name & description */}
            <div className={`${styles["task-content"]}`}>
              <h2 className={styles.borderBtm}>{props.name}</h2>
              <p>{props.description}</p>
            </div>

            {/* Task options */}
            <div className={styles["task-options"]}>
              {/* Edit button (if active) */}
              {props.active && (
                <button
                  className={`btn btn-secondary me-2 ${styles.edit}`}
                  onClick={updateHandler}
                >
                  ✎
                </button>
              )}

              {/* Delete button */}
              <button className="btn btn-danger me-2" onClick={deleteHandler}>
                ✕
              </button>

              {/* Compelete/Incomplete button */}
              <button
                className={`btn btn-secondary me-2 ${styles.complete}`}
                onClick={toggleHandler}
              >
                {props.active ? "✓" : "↩"}
              </button>

              {/* Details expand/collapse button */}
              <button
                className={`btn btn-secondary me-2 ${styles.details}`}
                onClick={detailHandler}
              >
                {!showDetails ? "▼" : "▲"}
              </button>
            </div>
          </div>
        )}
      </PostIt>

      <PostIt
        typeClass="details-post"
        showClass={detailsDisplayClass}
        colorClass={postColorClass}
      >
        {/* Post it */}
        <div
          className={`${styles["task-content-container"]} ${styles["nomargin-post"]}`}
        >
          {/* Details content */}
          <div className={`${styles["task-content"]}`}>
            <p>
              <strong>Added on</strong>
              <br />
              {props.dateAdded}
            </p>
            <p>
              <strong>Updated on</strong>
              <br />
              {props.dateUpdated}
            </p>
            {!props.active && (
              <p>
                <strong>Completed</strong>
                <br />
                {props.dateCompleted}
              </p>
            )}
          </div>
        </div>
      </PostIt>
    </li>
  );
};

export default TaskItem;
