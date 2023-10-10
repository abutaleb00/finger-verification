import React, { Component } from "react";
import DatePicker from "react-datepicker";
class DateBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: "1989-10-04",
      age: 18,
    };
    window.datebox = this;
  }
  getNomineeDob = () => {
    return this.state.dob;
  };
  getNomineeAge = () => {
    return this.state.age;
  };
  calculate_age = (e) => {
    var today = new Date();
    var selectDate = e; // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - selectDate.getFullYear();
    var m = today.getMonth() - selectDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < selectDate.getDate())) {
      age_now--;
    }
    console.log("now", selectDate);
    return age_now;
  };
  ChangeHandler = (id) => {
    console.log("date ", id);
    let date2 = new Date(id.toISOString());
    let year = date2.getFullYear();
    let month = date2.getMonth() + 1;
    let dt = date2.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    let stringDate = year + "-" + month + "-" + dt;
    console.log("Change", year + "-" + month + "-" + dt);
    console.log("Age", this.calculate_age(date2));
    this.setState(
      {
        dob: stringDate,
        age: this.calculate_age(date2),
      },
      () => {
        this.props.callparent();
      }
    );
  };
  render() {
    return (
      <div className={`col-md-${this.props.dim} d-inline-block`}>
        <div className="form-group">
          <label htmlFor={this.props.title}>
            {this.props.title}{" "}
            {this.props.isMandatory ? (
              <span style={{ color: "red" }}>*</span>
            ) : (
              ""
            )}
          </label>
          <div className="input-group date">
            <DatePicker
              className="form-control"
              //selected={this.state.id}
              utcOffset={6}
              onChange={(id) => {
                this.ChangeHandler(id);
              }}
              dateFormat="Pp"
              value={this.state.dob}
              placeholderText={this.props.placeholder}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              disabled={this.props.disable ? true : false}
              required={this.props.isMandatory}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default DateBox;
