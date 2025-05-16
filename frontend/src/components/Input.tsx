import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.25rem;
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Error = styled.span`
  color: red;
  font-size: 0.875rem;
`;

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <Wrapper>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput {...props} />
    {error && <Error>{error}</Error>}
  </Wrapper>
);