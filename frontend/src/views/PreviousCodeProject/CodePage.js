import { basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import {StreamLanguage} from "@codemirror/stream-parser";
import { oCaml } from "@codemirror/legacy-modes/mode/mllike"
import { oneDark } from "@codemirror/theme-one-dark";
import {useEffect, useRef, useState} from "react";
import styles from "./CodePage.module.css";
import baseStyles from '../../components/Styling.module.css';
import axios from "axios";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";

export default function PreviousCode() {
  const [editor, setEditor] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [previousWork, setPreviousWork] = useState(false);
  const [loadState, setLoadState] = useState(0);
  const [jobResult, setJobResult] = useState("N/A");

  const editorRef = useRef();

  function sendJob() {
    // axios({
    //   method : "POST",
    //   url: "https://p65v01zgya.execute-api.us-east-1.amazonaws.com/prod/dispatchjob",
    //   data: {
    //     code: editor.contentDOM.innerText
    //   },
    //   responseType: 'json',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then((response) => {
    // }, (error) => {
    //   console.log(error);
    // });
  }

  useEffect(() => {
    const state = EditorState.create({
      doc: "(** Your code goes here *)",
      extensions: [basicSetup, StreamLanguage.define(oCaml), oneDark]
    });

    let view = new EditorView({ state, parent: editorRef.current });
    setEditor(view);

    // Load previous code
      view.contentDOM.innerText = "Never gonna give you up\nNever gonna let you down\nNever gonna run around and desert you\n\nClearly this is not valid ocaml code, this will fail";
      setPreviousWork(false);

    setLoadState(2);

    // // @todo might wanna destroy on page leave
    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={baseStyles.header}>Code Editor</h1>
      <div className={styles.editorWrapper}>
        {loadState === 1 && <DisplayBox
          bgColor="#90caf9"
          borderColor="#90caf9"
          color="#000"
          h="auto"
          text="Your code is currently processing, this could take up to 15 minutes."
          style={{ alignSelf: "center", marginBottom: "20px" }}
        />}
        <div ref={editorRef} />
      </div>
      <div className={styles.executeWrapper}>
        {previousWork && <p className={styles.loadedPrevious}>Auto-loaded code your from previous session</p>}
        <button
          className={baseStyles.btn}
          onClick={sendJob}
        >
          Execute Code
        </button>
        <br />
        <button
          className={`${baseStyles.btn} ${styles.requestUpdateButton}`}
        >
          Request job update
        </button>
      </div>
      {loadState === 2 && <div className={styles.responseWrapper}>
        <h2>Job response</h2>
        <div className={styles.successBox}>
          <p style={{ margin: 0, fontSize: 17 }}><b>Job run failed</b></p>
          <p style={{ margin: 0 }}>Algorithm: SE2GIS</p>
          <p style={{ margin: 0, marginBottom: 5 }}>Time elapsed: 0.004 seconds</p>
        </div>
        <br />
        <br />
      </div>}
    </div>
  );
}