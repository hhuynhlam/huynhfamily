import React from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { Field } from 'redux-form/immutable'
import styled from 'styled-components'

const StyledFormHelperText = styled(FormHelperText)`
  margin-bottom: 8px !important;
`

function TextField(props) {
  const {
    label,
    input: {
      name,
      onBlur,
      onChange,
      onFocus,
      value,
    },
    meta: {
      error,
      touched,
    },
    ...ownProps
  } = props

  return (
    <FormControl error={touched && !!error} fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>

      <Input
        id={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        {...ownProps}
      />

      <StyledFormHelperText id={`${name}HelperText`}>
        { touched && error }
      </StyledFormHelperText>
    </FormControl>
  )
}
TextField.defaultProps = {
  label: null,
}
TextField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    initial: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    touched: PropTypes.bool,
  }).isRequired,
}

function FormTextField(props) {
  return <Field component={TextField} {...props} />
}

export default FormTextField
