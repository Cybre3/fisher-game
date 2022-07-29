import React, { useEffect, useState } from "react";
import $ from "jquery";

import CodingChallengesContainer from "./CodingChallengesContainer/CodingChallengesContainer";

import "./ModalContainer.css";

function ModalContainer(props) {
  const [hide, setHide] = useState("fadein .4s linear");
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [modalStartListOption, setModalStartListOption] = useState("");
  const [data, setData] = useState({ hide, modalStartListOption });

  const { childToParent } = props;

  function handleEmptyListRequest(e) {
    if (e.target.innerText === "Empty") {
      setModalStartListOption("empty");
    } else if (e.target.innerText === "Example") {
      setModalStartListOption("example");
    }
  }

  useEffect(() => {
    setData({ hide, modalStartListOption });
  }, [hide, modalStartListOption]);

  useEffect(() => {
    childToParent(data);
  }, [childToParent, data]);

  function optionsToggle() {
    showProjectOptions === true ? setShowProjectOptions(false) : setShowProjectOptions(true);
  }

  if (hide.includes("fadein")) {
    $("input").attr("disabled", "disabled");
    $(".start-list-container button").attr("disabled", "disabled");
  } else {
    $("input").removeAttr("disabled");
    $(".start-list-container button").removeAttr("disabled");
  }

  return (
    <div style={{ animation: hide }} className="modal-body">
      <h2 className="modal-title">Welcome to Product-Sorter!</h2>
      <hr />
      <h4 className="modal-subtitle">Visit other Small Coding Projects</h4>
      <p className="modal-descript">
        This{" "}
        <button onClick={() => optionsToggle()} className="modal-popover-btn">
          button
        </button>
        {showProjectOptions ? <CodingChallengesContainer /> : null} allows you to view other Small
        Coding Challenge projects.
      </p>
      <hr />
      <h4 className="modal-subtitle">Start list choices</h4>
      <p className="modal-descript">
        Would you like to start with an{" "}
        <button className="ul-list-choice" onClick={(e) => handleEmptyListRequest(e)}>
          Empty
        </button>{" "}
        or{" "}
        <button className="ul-list-choice" onClick={(e) => handleEmptyListRequest(e)}>
          Example
        </button>{" "}
        list?
      </p>
      <hr />
      <div className="modal-button-container">
        <a href="http://starrika-mccloud-portfolio.herokuapp.com/">Back to portfolio</a>
        <button
          onClick={() => {
            setHide("fadeout .4s ease-out forwards");
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ModalContainer;
