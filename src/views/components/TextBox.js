import React from "react"
import {
  Label,
  Input,
  Col
} from "reactstrap"

const TextBox = (props) => {

  return (
    <Col className={`col-md-${props.col} sm="12"`}>
      <Label className="form-label" htmlFor={props.id}>
        {props.title}
        {props.isMandatory ? (<span style={{ color: "red" }}>*</span>) : ""}
      </Label>
      <Input
          type={props.type !== undefined ? props.type : "text"}
          maxLength={props.maxLength}
          id={props.id}
          name={props.id}
          autoComplete="off"
          placeholder={props.placeholder}
          onChange={(e) => props.ChangeHandler(e)}
          disabled={props.disable ? true : false}
          value={props.val}
          required={props.isMandatory}
      />
    </Col>
  )
}

export default TextBox
