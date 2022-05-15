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
import { View } from "react-native";

// colors
const { brand, darkLight, primary } = Colors;

// KeyboardAvoidingWrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// API clienr
import axios from "axios";

const Login = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = (credentials) => {
        const url = '';

        axios.post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;
            })
            .catch(error => {console.log(error.JSON())})
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
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('Welcome');
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => (
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
                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>
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