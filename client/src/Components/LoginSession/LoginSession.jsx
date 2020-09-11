import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './login.css'

const FormPage = () => {
return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="9">
        <div className="cardLogin">
      <form>
        <p className="h4 text-center mb-4">Sign in</p>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Your email
        </label>
        <input type="email" id="defaultFormLoginEmailEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Your password
        </label>
        <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
        <div className="text-center mt-4">
          <MDBBtn color="indigo" type="submit">Login</MDBBtn>
        </div>
      </form>
      </div>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default FormPage;