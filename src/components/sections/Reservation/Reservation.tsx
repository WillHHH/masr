import React, { FC, useRef, useState, useEffect } from "react";
import cx from "classnames";
import styles from "./Reservation.module.scss";
import Reveal from "components/Layout/Reveal";
import Container from "components/Layout/Container";
import SectionTitle, {
  SectionTitleProps,
} from "components/common/SectionTitle/SectionTitle";
import { useForm, ValidationError } from "@formspree/react";
import {
  Input,
  NativeSelect,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";

type ReservationProps = {
  className?: string;
};

const Reservation: FC<ReservationProps & SectionTitleProps> = ({
  className,
  title,
  content,
}) => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const [state, handleSubmit] = useForm("mlevwbjv");
  const [status, setStatus] = useState("");

  useEffect(() => {
    state.succeeded && setStatus("succeed");
  }, [state.succeeded]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!nameRef.current.value) {
      setStatus("name");
    } else if (!phoneRef.current.value) {
      setStatus("phone");
    } else if (state.succeeded) {
      setStatus("submitted");
    } else handleSubmit(e);
  };
  return (
    <div className={cx(styles.base, className)}>
      <Container>
        <Reveal>
          <SectionTitle title={title} content={content} />
          <form onSubmit={onSubmit} className={styles.form}>
            <label htmlFor="email">Name</label>
            <Input id="name" type="text" name="name" inputRef={nameRef} />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <label htmlFor="vehicle">Vehicle</label>
            <Input id="vehicle" type="text" name="vehicle" />
            <ValidationError
              prefix="Vehicle"
              field="vehicle"
              errors={state.errors}
            />
            <label htmlFor="vehicle">Year</label>
            <Input id="year" type="text" name="year" />
            <ValidationError prefix="Year" field="year" errors={state.errors} />
            <label htmlFor="vehicle">Phone</label>
            <Input id="phone" type="tel" name="phone" inputRef={phoneRef} />
            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
            />
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" name="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label htmlFor="service">Service</label>
            <NativeSelect
              id="service"
              type="text"
              name="service"
              className={styles.select}
            >
              <option>Repairing</option>
              <option>Buy</option>
              <option>Sell</option>
              <option>Car Wash</option>
            </NativeSelect>
            <ValidationError
              prefix="Service"
              field="service"
              errors={state.errors}
            />
            <label htmlFor="message">Message</label>
            <Input id="message" name="message" />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={state.submitting}
              className={styles.button}
            >
              Submit
            </Button>
          </form>
        </Reveal>
      </Container>
      <Dialog
        open={!!status}
        onClose={() => setStatus("")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!!status && status === "succeed"
            ? "Submit Successfully"
            : "Something Went Wrong"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status === "succeed" &&
              "We have received your appointment and will contact you soon for confirmation."}
            {(status === "name" || status === "phone") &&
              `Missing ${status} field.`}
            {status === "submitted" &&
              "You've already submitted, please try again later."}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reservation;
