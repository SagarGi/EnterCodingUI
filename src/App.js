import React, { Component } from "react";
import "./App.css";
import "./entercoding.css";
import axios from "axios";
import AceEditor from "react-ace";
import ReactLoading from "react-loading";
import 'bootstrap/dist/css/bootstrap.min.css';

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-github";
import Select from "react-select"

const options = [{ value: 'c', label: 'C' },
{ value: 'cpp', label: 'CPP' }, { value: 'java', label: 'JAVA' }
]

class App extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      input: "",
      output: "",
      submit: false
    };
  }

  //normal function use bind in constructor
  // handleCodeChange(event) {
  //   this.setState({ code: event.target.value });
  // };
  //-------------------------------------------------------//
  //es6 function to handle change in code and it avoid using bind in the default constructor
  handleCodeChange = newValue => {
    this.setState({ code: newValue });
  };

  //es6 function to handle change in input
  handleInputChange = event => {
    this.setState({ input: event.target.value });
  };

  //es6 function to handle change on submit which is asynchronous using async await
  //https://entercoding-api-gces.herokuapp.com/compiler/java
  handleSubmit = async event => {
    this.setState({ submit: true });
    // console.log(this.state.code);
    //event.preventDefault();
    await axios
      .post("https://entercoding-api-gces.herokuapp.com/compiler/java", {
        code: this.state.code,
        input: this.state.input
      })
      .then(response => {
        console.log(response);
        this.setState({ submit: false });
        this.setState({
          output:
            response.data.output +
            "\n-------------------------------- " +
            "\nCpu Memory : " +
            response.data.memory +
            "\nExecution Time : " +
            response.data.cpuTime
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      //   <div className="main-body">
      //     <div className="top-menu-bar"></div>
      //     <div className="code-editor">
      //       <AceEditor
      //         className="aceditor"
      //         ref="ace"
      //         mode="java"
      //         theme="terminal"
      //         name="codeditor"
      //         onLoad={this.onLoad}
      //         value={this.state.code}
      //         onChange={this.handleCodeChange}
      //         fontSize={16}
      //         showPrintMargin={true}
      //         showGutter={true}
      //         highlightActiveLine={true}
      //         setOptions={{
      //           enableBasicAutocompletion: true,
      //           enableLiveAutocompletion: true,
      //           enableSnippets: false,
      //           showLineNumbers: true,
      //           tabSize: 2
      //         }}
      //         commands={[
      //           {
      //             name: "commandName",
      //             bindKey: { win: "Ctrl-enter", mac: "Command-enter" },
      //             exec: () => {
      //               this.handleSubmit();
      //             }
      //           }
      //         ]}
      //       // height="731px"
      //       // width="800px"
      //       />
      //     </div>
      //     <div className="bottom-menu-bar">
      //       <button
      //         style={{
      //           height: "40px",
      //           width: "100px",
      //           backgroundColor: "green",
      //           color: "white",
      //           marginLeft: "5px",
      //           border: 0,
      //           borderRadius: 7,
      //           display: "flex",
      //           justifyContent: "center"
      //         }}
      //         onClick={this.handleSubmit}
      //         disabled={this.state.submit}
      //       >
      //         {this.state.submit && (
      //           <ReactLoading
      //             type="spokes"
      //             color="#fff"
      //             height="25px"
      //             width="25px"
      //           />
      //         )}
      //         {!this.state.submit && <span>Run</span>}
      //       </button>
      //     </div>
      //   </div>
      <div>
        <div className="main-div">
          <div className="row no-gutters">
            <div className="col-md-6 no-gutters">

              <div className="leftside ">
                {/* <div className="code-editor"> */}
                <div className="top-bar">

                  <Select className="drop-down"
                    value={this.state.language}
                    onChange={this.handleChange}
                    options={options}
                  />

                  <button
                    className="run"

                    onClick={this.handleSubmit}
                    disabled={this.state.submit}
                  >
                    {this.state.submit && (
                      <ReactLoading
                        type="spokes"
                        color="#fff"
                        height="25px"
                        width="25px"
                      />
                    )}
                    {!this.state.submit && <span>Run</span>}
                  </button>
                </div>

                <div className="ace-editor">
                  <AceEditor
                    ref="ace"
                    mode="java"
                    theme="twilight"
                    name="codeditor"
                    height="100%"
                    width="inherit"
                    onLoad={this.onLoad}
                    value={this.state.code}
                    onChange={this.handleCodeChange}
                    fontSize={18}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2
                    }}
                    commands={[
                      {
                        name: "commandName",
                        bindKey: { win: "Ctrl-enter", mac: "Command-enter" },
                        exec: () => {
                          this.handleSubmit();
                        }
                      }
                    ]}
                  />
                </div>

              </div>
            </div>

            <div className="col-md-6 no-gutters">
              <div className="rightside text-white">
                <div className="top-bar-right">
                  <button
                    className="output"
                  >
                    Output
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div >
    );
  }
}
export default App;