import React from "react";
import Modal from "../UI/Modal";

const Footer = ({ clearHandler }) => {
  return (
    <footer>
      {/* Clear All tasks button */}
      <div className="">
        <button className="btn btn-danger me-2" onClick={clearHandler}>
          Clear All Tasks
        </button>

        {/* Logs button - opens a Bootstrap modal */}
        <button
          className="btn btn-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#ftrModal"
        >
          Logs
        </button>

        {/* Credits button - opens a Bootstrap modal */}
        <button
          className="btn btn-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#credits"
        >
          Credits
        </button>
      </div>

      {/* Logs modal */}
      <Modal id={"ftrModal"} title={"Updates"}>
        <p>
          <strong>02/2024</strong>
        </p>
        <ul>
          <li>Interface design is updated</li>
          <li>
            Buddy will now change based on each post's duration and priority
          </li>
          <li>Accessibility fixes</li>
          <li>
            Post creation, updated and completion dates are now viewable via the
            dropdown on each post
          </li>
          <li>
            Changed the method of completing tasks from clicking a checkbox to
            clicking a button
          </li>
          <li>Modified form input fields</li>
        </ul>

        <p>
          <strong>10/2023</strong>
        </p>
        <ul>
          <li>Tasks can now be switched between active and complete</li>
          <li>Accessibility fixes</li>
          <li>Adding a bit of color and fixed some styling</li>
          <li>All tasks can now be cleared by button next to the title</li>
          <li>Added logs</li>
        </ul>
      </Modal>

      {/* Credits modal */}
      <Modal id={"credits"} title={"Credits"}>
        <a
          href="https://dev.to/thormeier/fully-responsive-html-css-sticky-note-4okl"
          target="_blank"
          rel="noreferrer"
        >
          Responsive post it note
        </a>{" "}
        developed by{" "}
        <a href="https://dev.to/thormeier" target="_blank" rel="noreferrer">
          Pascal Thormeier
        </a>
      </Modal>
    </footer>
  );
};

export default Footer;
