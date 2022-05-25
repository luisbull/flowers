import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { 
    StyledContainer, 
    InnerContainer, 
    PageLogo, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    LeftIcon, 
    StyledInputLabel, 
    StyledTextInput, 
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
import { View, ActivityIndicator } from "react-native";

// colors
const { brand, darkLight, primary } = Colors;

// KeyboardAvoidingWrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// API clien
import axios from "axios";

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://afternoon-brushlands-58181.herokuapp.com/user/signin'; // env variable here

        axios
            .post(url, credentials)
            .then((response) => {

                const result = response.data;
                const {message, status, data} = result;

                if (status !== 'SUCCESS'){
                    handleMessage(message, status)
                }
                else {
                    navigation.navigate('Welcome', { ...data[0] })
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

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require('./../assets/img/Purple_Flower.png')}/>
                    <PageTitle>Flower House</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik 
                        initialValues={{ email:'', password:'' }}
                        onSubmit={(values, {setSubmitting}) => {
                            if(values.email == "" || values.password == ""){
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            }
                            else {
                                handleLogin(values, setSubmitting)
                            }
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                            <StyledFormArea>
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
                                    label="Password"
                                    icon="lock"
                                    placeholder="* * * * *"
                                    placeholderTextInput={darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>}
                                {isSubmitting && <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} /> 
                                </StyledButton>}
                                <Line/>
                                <StyledButton google={true} onPress={handleSubmit}>
                                    <Fontisto name="google" color={primary} size={25}  />
                                    <ButtonText google={true}>
                                        Sign in with Google
                                    </ButtonText>
                                </StyledButton>
                                <ExtraView>
                                    <ExtraText>Don't have an account already?</ExtraText>
                                    <TextLink onPress={() => navigation.navigate('Signup')}>
                                        <TextLinkContent> Signup</TextLinkContent>
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

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}  />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={()=>setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login