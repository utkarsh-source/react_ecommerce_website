import React, { useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import Select from 'react-select' 
import {useDispatch, useSelector} from 'react-redux'
import { fetchCountries,fetchOptions,fetchSubdivision, setFormData } from '../redux/actionCreater'
import { Link } from 'react-router-dom'


const FormWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const FormikWrapper = styled(Formik)`
    width: max-content;
`;

const StyledForm = styled(Form)`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
    margin: 2rem 0px;
`

const SharedStyle = css`
    padding-left: 1rem;
    border: 1.5px solid gray;
    height: 4rem;
    width: 100%;
    border-radius: 0.3rem;
    &:focus{
        outline: none;
        border: 2px solid rgba(65, 105, 225, 0.8);
    }
`

const Input = styled.input`
    ${SharedStyle}
    font-weight: bold;
    &::placeholder{
        color: rgba(82, 82, 82, 0.6);
        font-size: 1.3rem;
        font-weight: bold;
    }
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: ${({ error }) => error && '2px solid red'};
    margin-bottom: 0.5rem;
    background-color: #fcfcfc;
`;

const Heading = styled.h1`
    font-size: 2.5rem;
    font-weight: bolder;
    color: #525252;
`;

const sharedBtnstyle = css`
    padding: 1rem 1rem;
        border: none;
        color: white;
        font-size: 1.3rem;
        border-radius: 0.3rem;
        transition: transform 0.3s;
        cursor: pointer;
        &:active{
            transform: scale(1.01);
        }
`
const Next = styled.button`
        ${sharedBtnstyle};
        background-color:${({ disabled }) => disabled ? 'gray' : '#cc004e' };
        grid-column: 1/ span 2;
        
`
const Reset = styled.button`
    ${sharedBtnstyle};
   background-color: #3a265a;
`
const Goback = styled.button`
    ${sharedBtnstyle};
    background-color: #666666;
    text-decoration: none;
    text-align: center;
    grid-column: 1/ span 2;
`
const Block = styled.div`
    height: max-content;
    ${({ address }) => address && css`
        grid-column: 1 /span 2 !important;
    `}
`;

const Error = styled.div`
    color: #ee005b;
    font-weight: bold;
    font-size: 1.1rem;
`





const validate = values => {
    const errors = {}
    if (!values.firstName) {
        errors.firstName = 'Field is required'
    }else if (!/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i.test(values.firstName)) {
     errors.firstName = 'Invalid first name';
   }
    if (!values.lastName) {
        errors.lastName = 'Field is required'
    }else if (!/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i.test(values.lastName)) {
     errors.lastName = 'Invalid last name';
   }
    
    if (!values.address) {
        errors.address = 'Field is required'
    }
    if (!values.email) {
        errors.email = 'Field is required'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
    if (!values.city) {
        errors.city = 'Field is required'
    }
    if (!values.zip) {
        errors.zip = 'Field is required'
    };
    if (!values.phone) {
        errors.phone = 'Field is required'
    }else if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/i.test(values.phone)) {
     errors.phone = 'Invalid postal code';
   }
    if (!values.country) {
        errors.country = 'Field is required'
    }
    if (!values.subdivision) {
        errors.subdivision = 'Field is required'
    }

    return errors;
}
const initialValues = {
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            city: "",
            zip: "",
            country: "",
            subdivision: "",
            phone: "",
            option:"",
}


const defaultValue = (options, value) => {
    return options ? options.find(option => option.value === value) : {};
}

const customStyles = {
    placeholder: () => ({
        color: 'rgba(82, 82, 82, 0.6)',
        fontSize: '1.3rem',
        fontWeight: 'bold',
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#fcfcfc;',
        border: '1.5px solid gray',
        border: `${state.isFocuse && '2px solid rgba(65, 105, 225, 0.8)'}`,
    }),
    singleValue: (provided) => ({
        ...provided,
        fontSize: '1.25rem',
        fontWeight: 'bold'
    }),
    option: (provided) => ({
        ...provided,
        padding: 10,
        fontSize: '1.2rem',
        fontWeight: 'bold'
    })
}



function AddressForm({next}) {
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedDivision, setSelectedDivision] = useState("")
    const { token } = useSelector(state => state.token);
    const {countries : country} = useSelector(state => state.country)
    const {subdivision, loading} = useSelector(state => state.subdivisions)
    const {options, loading: Optloading} = useSelector(state => state.options)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCountries(token.id))
    }, [dispatch])
    const countries = Object.entries(country).map(([key, value]) => ({ value: key, label: value }))
    useEffect(() => {
        if (selectedCountry) {
            dispatch(fetchSubdivision(selectedCountry))
        }
    }, [selectedCountry, dispatch])
    const subdivisions = Object.entries(subdivision).map(([key, value]) => ({ value: key, label: value }))

    useEffect(() => {
        if (selectedDivision) {
            dispatch(fetchOptions(token.id, selectedCountry, selectedDivision))
        }
    }, [selectedDivision, dispatch])
    const shippingOptions = options.map(so => ({value: so.id, label : `${so.description} (${so.price.formatted_with_symbol})`}))
    const onSubmit = (values, submitProp) => {
        submitProp.setSubmitting(false)
        dispatch(setFormData(values))
        next()
}
    return (
        <FormWrapper>
          <Heading>Shipping address</Heading>
            <FormikWrapper
                initialValues={initialValues}
                validate={validate}
                onSubmit={onSubmit}
                validateOnChange={false}
                >{formik => {
                    return (
                        <StyledForm >
                    <Block>
                        <Field name="firstName">
                            {({ meta, field }) => <Input required {...field} error={meta.touched && meta.error} type="text" placeholder="first name *" />}
                        </Field>
                        <ErrorMessage name="firstName" component={Error} />
                    </Block>
                    <Block>
                        <Field name="lastName" >
                            {({ meta, field }) => <Input {...field} error={meta.touched && meta.error} type="text" placeholder="last name *" />}
                        </Field>
                        <ErrorMessage name="lastName" component={Error} />
                    </Block>
                    <Block address>
                        <Field name="address">
                            {({ meta, field }) => <Input {...field} error={meta.touched && meta.error} type="text" placeholder="address *" />}
                        </Field>
                        <ErrorMessage name="address" component={Error} />
                    </Block>
                    <Block>
                        <Field name="email">
                            {({ meta, field }) => <Input {...field} error={meta.touched && meta.error} type="email" placeholder="email *" />}
                        </Field>
                        <ErrorMessage name="email" component={Error} />
                    </Block>
                    <Block>
                        <Field name="city">
                            {({ meta, field }) => <Input {...field} error={meta.touched && meta.error} type="text" placeholder="city *" />}
                        </Field>
                        <ErrorMessage name="city" component={Error} />
                    </Block>
                    <Block>
                        <Field name="zip">
                            {({ meta, field }) => <Input {...field} error={meta.touched && meta.error} type="text" placeholder="ZIP/Postal code *" />}
                        </Field>
                        <ErrorMessage name="zip" component={Error} />
                    </Block>
                    <Block>
                        <Field name="phone">
                            {({ meta, field }) => <Input {...field} error={meta.touched && meta.error} type="text" placeholder="phone*" />}
                        </Field>
                        <ErrorMessage name="phone" component={Error} />
                    </Block>
                    <Block>
                        <Field as={Select} name="country" options={countries} onChange={
                                    option => {
                                        setSelectedCountry(option.value)
                                        formik.setFieldValue('country', option.value)
                                    }} value={defaultValue(countries, formik.values.country)} styles={customStyles} placeholder='country'
                            >
                        </Field>
                    </Block>
                    <Block>
                        <Field as={Select} isLoading={loading} name="subdivision" options={subdivisions}
                                    onChange={
                                        option => {
                                            setSelectedDivision(option.value)
                                            formik.setFieldValue('subdivision', option.value)
                                        }} value={defaultValue(subdivisions, formik.values.subdivision)} styles={customStyles} placeholder='subdivision'
                                >
                            </Field>
                    </Block>
                    <Block>
                        <Field as={Select} isLoading={Optloading} name="option" options={shippingOptions}
                                    onChange={
                                        option => {
                                            formik.setFieldValue('option', option.value)
                                        }} value={defaultValue(shippingOptions, formik.values.option)} styles={customStyles}>
                            </Field>
                    </Block>
                    <Reset type="reset">Reset</Reset>
                    <Next type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</Next>
                    <Goback as={Link} to='/cart'>Go back</Goback>
                </StyledForm> )
                }
            }
            </FormikWrapper>
        </FormWrapper>
    )
}

export default AddressForm
