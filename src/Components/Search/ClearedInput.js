import React from "react";
import styled from "styled-components";

export default styled('input')`
  :focus {
      outline: none;
  }
  :-internal-autofill-selected {
    background-color: white !important;
    background-image: none !important;
    color: #2C3E4B !important;
 }
`;