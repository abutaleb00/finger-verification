// ** Reactstrap Imports
// ** React Imports
import { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormFeedback,
} from "reactstrap";
import "flatpickr/dist/themes/airbnb.css";
// ** Third Party Components
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import { User } from "react-feather";
import FingerPrintModal from "./FingerPrintModal";

// ** Utils
import { selectThemeColors } from "@utils";
import finger from "@src/assets/images/pages/fingerprint.svg";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const defaultValues = {
  companyName: "",
  billingEmail: "",
};

const NewGrantors = () => {
  const source = finger;
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [picker, setPicker] = useState(new Date());
  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
        window.location = '/grantors'
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader className="border-bottom">
        <CardTitle tag="h4">NID Information</CardTitle>
      </CardHeader>
      <CardBody className="my-2 py-50">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="companyName">
                NID Number
              </Label>
              <Controller
                id="companyName"
                control={control}
                name="companyName"
                render={({ field }) => (
                  <Input
                    placeholder="Enter NID Number"
                    invalid={errors.companyName && true}
                    {...field}
                  />
                )}
              />
              {errors.companyName && (
                <FormFeedback>Please enter a valid NID Number</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="country">
                Date of Birth
              </Label>
              <Flatpickr
                className="form-control"
                value={picker}
                onChange={(date) => setPicker(date)}
                id="default-picker"
              />
            </Col>
          </Row>
          <Row>
            <Col
              sm={{
                offset: 6,
                order: 2,
                size: 2,
              }}
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <FingerPrintModal />
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default NewGrantors;