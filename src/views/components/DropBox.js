import React, { Component } from "react";

class DropBox extends Component {
  constructor(props) {
    super(props);
    // this.props.transferData(props.id, props.options[0].value);
  }
  ChangeHandler = (e) => {
    //this.props.ChangeHandler(e);
    if (this.props.id === "accountTypeText") {
      this.props.transferData(e.target.id, e.target.value);
    } else {
      this.props.ChangeHandler(e);
    }
  };
  render() {
    return (
      <div className={`col-md-${this.props.dim} d-inline-block`}>
        <div className="form-group">
          <label htmlFor="gender">
            {this.props.title}{" "}
            {this.props.isMandatory ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </label>

          <select
            id={this.props.id}
            className="form-control"
            disabled={this.props.disable}
            onChange={(e) => this.ChangeHandler(e)}
            //value={this.state.defalutval}

            //defaultValue={window.PersonalInformation.state[this.props.id]}
            // defaultValue={values.gender}
          >
            {this.props.options.map((v, k) => {
              //console.log(v);
              return (
                <option key={v.id + "_" + k} id={v.id} value={v.value}>
                  {v.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default DropBox;
