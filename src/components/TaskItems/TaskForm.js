// IMPORTS
import formStyles from "./TaskForm.module.scss";
// React, hooks, libraries, etc.
import React, { useState } from "react";

const TaskForm = (props) => {
  /* STATES */

  // Task name input states
  const [enteredTaskName, setEnteredTaskName] = useState("");
  // Checks if user clicked on input, assume it's false upon render
  const [enteredTaskNameTouched, setEnteredTaskNameTouched] = useState(false);
  // State for updating Task name
  const [updatedTaskName, setUpdatedTaskName] = useState(props.name);

  // Priority input states
  const [isHighPriority, setisHighPriority] = useState(false);
  // State for updating Task priority
  const [updatedHighPriority, setUpdatedHighPriority] = useState(
    props.priority
  );
  // State for text displayed on Priority button
  const [priorityBtnText, setPriorityBtnText] = useState("Set priority?");
  // State for updating the text displayed on Priority button
  const [updatePriorityBtnText, setUpdatePriorityBtnText] = useState(
    props.priority === true ? "Prioritized!" : "Set priority?"
  );

  // Description input states
  const [enteredTaskDescription, setEnteredTaskDescription] = useState("");
  // State for updating Task description
  const [updatedTaskDescription, setUpdatedTaskDescription] = useState(
    props.description
  );

  /* OBJECTS & VARIABLES */

  // Date object for when a task is created. Formatted as Day, Mon 00, 0000, 00:00 AM/PM
  const initializedDate = new Date().toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // Date object for when a task is updated. Formatted as Day, Mon 00, 0000, 00:00 AM/PM
  const updatedDate = new Date().toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // Base amount of points attached to a task upon its creation based on its priority
  const initialTaskPoints = isHighPriority ? 50 : 5;
  // Toggle the base amount of points attached to a task based on its priority
  const updatedTaskPoints = updatedHighPriority ? 50 : 5;

  /* VALIDATION */

  // Task name input validation
  const enteredTaskNameIsBlank = enteredTaskName.trim() === "";
  //Trigger invalid if input is left blank and user had already clicked inside the input
  const enteredTaskIsInvalid = enteredTaskNameIsBlank && enteredTaskNameTouched;

  /* HANDLERS */

  // Task name handler - Sets input as value
  const taskInputChangeHandler = (event) => {
    // Set entered Task name value with current title if updating
    // Populates Task name field with existing input when updating
    props.updatingForm && setUpdatedTaskName(event.target.value);

    setEnteredTaskName(event.target.value);
  };

  // Task name bluer handler - When user clicks on field, blur turns true to signal field has been interacted with
  const taskInputBlurHandler = () => {
    setEnteredTaskNameTouched(true);
  };

  //Priority handler - Toggles Priority state when Priority button is clicked & changes text
  const priorityInputChangeHandler = (event) => {
    // Toggle pirority boolean to opposite of what it is currently when updating
    props.updatingForm &&
      setUpdatedHighPriority((prevPriority) => !prevPriority);

    // Change text on Priority button based on what it says currently
    props.updatingForm &&
      setUpdatePriorityBtnText(
        updatePriorityBtnText === "Set priority?"
          ? "Prioritized!"
          : "Set priority?"
      );

    setisHighPriority((prevPriority) => !prevPriority);

    setPriorityBtnText(
      priorityBtnText === "Set priority?" ? "Prioritized!" : "Set priority?"
    );
  };

  // Description handler - Sets input as value
  const descriptionInputChangeHandler = (event) => {
    // Set entered Task Description value with current text if updating
    // Populates Task Description field with existing input when updating
    props.updatingForm && setUpdatedTaskDescription(event.target.value);

    setEnteredTaskDescription(event.target.value);
  };

  // Cancel handler - hide form and show original list when Cancel button is clicked
  const cancelUpdateHandler = () => {
    props.onCancel();
  };

  // UPDATE
  const updateTaskHandler = () => {
    const updatedTasks = props.tasks.map((task) => {
      // create new array object with modified values for name, priority, description, updated date and points properties
      if (task.id === props.id) {
        return {
          ...task,
          id: props.id,
          name: updatedTaskName,
          priority: updatedHighPriority,
          description: updatedTaskDescription,
          active: props.active,
          dateAdded: props.dateAdded,
          dateUpdated: updatedDate,
          dateCompleted: props.dateCompleted,
          taskPoints: updatedTaskPoints,
          elapsedTime: props.elapsedTime,
          elapsedPoints: props.elapsedPoints,
          totalPoints: updatedTaskPoints + props.elapsedPoints,
        };
      }
      return task;
    });

    // Send to addTask function in App.js to save into setTasks and Local Storage
    // Will allow page to display updated info
    props.onSubmitUpdatedTask(updatedTasks);

    // Call cancel handler to close out form after updating
    cancelUpdateHandler();
  };

  // Form submission handler
  const submitTaskHandler = (event) => {
    // Prevent refresh of page/form
    event.preventDefault();

    // Cancels function and form submission if Task name is blank and Priority is below 1 or above 3
    if (enteredTaskNameIsBlank) {
      return;
    }

    // Create new array copy of tasks with submitted values using states
    const newTasks = [
      {
        id: crypto.randomUUID(), // Recommended by Greg (Code Mentor) to use for cleaner ids
        name: enteredTaskName,
        priority: isHighPriority,
        description: enteredTaskDescription,
        active: true,
        dateAdded: initializedDate,
        dateUpdated: null,
        dateCompleted: null,
        taskPoints: initialTaskPoints,
        elapsedTime: 0,
        elapsedPoints: 0,
        totalPoints: initialTaskPoints,
      },
      ...props.tasks,
    ];

    // Pass array copy to addTask function in App
    props.onSubmitTask(newTasks);

    // Reset inputs and touches back to empty
    setEnteredTaskName("");
    setEnteredTaskNameTouched(false);
    setisHighPriority(false);
    setEnteredTaskDescription("");
    setPriorityBtnText("Set priority?");
  };

  return (
    <form
      onSubmit={submitTaskHandler}
      className={props.updatingForm && formStyles["update-form"]}
    >
      {/* If updating, then display fields in the style of the current task items */}
      {props.updatingForm ? (
        // Post it
        <div className={`${formStyles["task-content-container"]}`}>
          {/* Task name and description */}
          <div className={formStyles["task-content"]}>
            {/* Task Name input */}
            <div className={`${formStyles["form-element"]}`}>
              <label style={{ display: "none" }} htmlFor={formStyles.task}>
                Task
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id={formStyles.task}
                  value={updatedTaskName}
                  onChange={taskInputChangeHandler}
                  className="form-control"
                  required
                  autoFocus
                />
              </div>
            </div>

            {/* Task Description input */}
            <div className={formStyles["form-element"]}>
              <label style={{ display: "none" }} htmlFor="task-descrp">
                Task Description (120 Character Limit)
              </label>
              <textarea
                id="task-descrp-ind"
                value={updatedTaskDescription}
                onChange={descriptionInputChangeHandler}
                className="form-control"
                maxLength="120"
              ></textarea>
            </div>

            {enteredTaskIsInvalid && (
              <p role="alert" className={formStyles.validate}>
                Task name cannot be empty!
              </p>
            )}
          </div>

          {/* Task options: set priority, update, delete */}
          <div className={formStyles["task-options"]}>
            {/* Set Priority button */}
            <button
              type="button"
              id={formStyles.priority}
              className={`${formStyles["high-priority"]} ${
                updatedHighPriority && formStyles["high-priority-selected"]
              } me-2`}
              onClick={priorityInputChangeHandler}
            >
              {updatePriorityBtnText}
            </button>

            {/* Update button */}
            <button
              className="btn btn-secondary me-2"
              onClick={updateTaskHandler}
            >
              Update
            </button>

            {/* Cancel button */}
            <button className="btn btn-danger" onClick={cancelUpdateHandler}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Else show the standard form at the top
        <div>
          {/* Task Name input */}
          <div className={formStyles["form-element"]}>
            <label htmlFor={formStyles.task}>
              Task<span className={formStyles.validate}>*</span>
            </label>
            <br />
            <div className={`input-group ${formStyles["input-group-mobile"]}`}>
              <input
                type="text"
                id={formStyles.task}
                value={enteredTaskName}
                onBlur={taskInputBlurHandler}
                onChange={taskInputChangeHandler}
                className="form-control"
                required
                aria-required="true"
              />

              <button
                type="button"
                id={formStyles.priority}
                className={`${formStyles["high-priority"]} ${
                  isHighPriority && formStyles["high-priority-selected"]
                }`}
                onClick={priorityInputChangeHandler}
              >
                {priorityBtnText}
              </button>
            </div>
            {enteredTaskIsInvalid && (
              <p role="alert" className={formStyles.validate}>
                Task name cannot be empty!
              </p>
            )}
          </div>

          {/* Task Description input */}
          <div className={formStyles["form-element"]}>
            <label htmlFor="task-descrp">
              Task Description (120 Character Limit)
            </label>
            <br />
            <textarea
              id="task-descrp"
              value={enteredTaskDescription}
              onChange={descriptionInputChangeHandler}
              className="form-control"
              maxLength="120"
            ></textarea>
          </div>

          {/* Submit button */}
          <div className={formStyles["form-element"]}>
            <button
              type="submit"
              className={`${formStyles.addtask} ${
                priorityBtnText === "Prioritized!" &&
                formStyles["submit-priority"]
              } btn btn-secondary`}
            >
              Post it!
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default TaskForm;
