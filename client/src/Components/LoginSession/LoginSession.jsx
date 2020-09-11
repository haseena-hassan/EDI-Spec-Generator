import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import './login.css'

const FormPage = () => {
return (
<MDBContainer>
  <MDBRow>
    <MDBCol md="9">
        <div class="container">
      <form className="cardLogin">
        <p className="h4 text-center mb-4">Sign in</p>
        <label htmlFor="emailLogin" className="grey-text">
          Your email
        </label>
        <input type="email" id="emailLogin" className="form-control" />
        <br />
        <label htmlFor="passwordLogin" className="grey-text">
          Your password
        </label>
        <input type="password" id="passwordLogin" className="form-control" />
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