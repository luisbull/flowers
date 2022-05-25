import React, { useState, useContext } from "react";
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons } from '@expo/vector-icons';

import { 
    StyledContainer, 
    InnerContainer, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    LeftIcon, 
    StyledInputLabel, 
    StyledTextInput, 
    StyledButtonInput, 
    StyledButtonTextInput,
    RightIcon, 
    StyledButton, 
    ButtonText, 
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from "./../components/styles";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";

// colors
const { brand, darkLight, primary } = Colors;

// KeyboardAvoidingWrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// dateTimePicker
// import DateTimePicker from '@react-native-community/datetimepicker';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

// API clien
import axios from "axios";

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credential context
import { CredentialsContext } from './../components/CredentialsContext';


const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true)
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    
    // const [show, setShow] = useState(false);
    
    // // actual date of birth to be sent
    const [dob, setDob] = useState();
    
    // context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    //////////////////////////////////
    //////////////////////////////////
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const showDatepicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        setDob(date);
        console.log("A date has been picked: ", date);
        hideDatePicker();
    };
    //////////////////////////////////
    //////////////////////////////////

    // form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://afternoon-brushlands-58181.herokuapp.com/user/signup';

        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS'){
                    handleMessage(message, status)
                }
                else {
                    persistLogin({ ...data }, message, status)
                }
                setSubmitting(false);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log('RESPONSE DATA ERROR:');
                    console.log(error.response.data);
                    console.log('RESPONSE STATUS ERROR:');
                    console.log(error.response.status);
                    console.log('RESPONSE HEADERS ERROR:');
                    console.log(error.response.headers);
                    } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('REQUEST ERROR:');
                    console.log(error.request);
                    } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('ELSE ERROR:');
                    console.log('Error', error.message);
                    }
                console.log(error.toJSON());
                setSubmitting(false);
                handleMessage('An error occurred. Check your network and try again.')
            })
    }

    const handleMessage = (message, type='FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('flowerHouseCredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch((error) => {
                console.log(error);
                handleMessage('Persisting login failed')
            })
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Flower House</PageTitle>
                    <SubTitle>Account Signup</SubTitle>
                    <Formik 
                        initialValues={{ name:'', email:'', dateOfBirth:'', password:'', confirmPassword:'' }}
                        onSubmit={(values, {setSubmitting}) => {
                            values = {...values, dateOfBirth: dob} //to retrive dateOfBirth DOB
                            if(values.name == "" || values.email == "" || values.dateOfBirth == "" || values.password == "" || values.confirmPassword == ""){
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            }
                            else if(values.password !== values.confirmPassword){
                                handleMessage('Passwords do not match');
                                setSubmitting(false);
                            }
                            else {
                                handleSignup(values, setSubmitting)
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
                                <MyTextInput 
                                    label="Full Name"
                                    icon="person"
                                    placeholder="John Rambo"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                <MyTextInput 
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="email@domain.com"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput 
                                    label="Date of Birth"
                                    icon="calendar"
                                    placeholder="MM-DD-YYYY"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    onPress={showDatepicker}
                                />
                                <MyTextInput 
                                    label="Date of Birth"
                                    icon="plus"
                                    placeholder="MM-DD-YYYY"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('dateOfBirth')}
                                    onBlur={handleBlur('dateOfBirth')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    onPress={showDatepicker}
                                />
                                    <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        // mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />
                                <MyTextInput 
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MyTextInput 
                                    label="Confirm Password"
                                    icon="lock"
                                    placeholder="* * * * * * * *"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Signup
                                    </ButtonText>
                                </StyledButton>}
                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} /> 
                                </StyledButton>}

                                <Line/>
                                <ExtraView>
                                    <ExtraText>Already have an account?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Login')}>
                                        <TextLinkContent> Login</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatepicker, value, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                // <TouchableOpacity>
                    <StyledButtonInput onPress={showDatepicker} {...props}>
                        <StyledButtonTextInput {...props}>{value}</StyledButtonTextInput>
                    </StyledButtonInput>
                // </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={()=>setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup