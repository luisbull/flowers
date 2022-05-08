import react, { useState } from "react";
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { 
    StyledContainer, 
    InnerContainer, 
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

const { brand, darkLight, primary } = Colors;

const Signup = () => {
    const [hidePassword, sethidePassword] = useState(true)
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Flower House</PageTitle>
                <SubTitle>Account Signup</SubTitle>
                <Formik 
                    initialValues={{ fullName:'', email:'', dateOfBirth:'', password:'', confirmPassword:'' }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <StyledFormArea>
                            <MyTextInput 
                                label="Full Name"
                                icon="person"
                                placeholder="John Rambo"
                                placeholderTextInput={darkLight}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
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
                                placeholder="DD-MM-YYYY"
                                placeholderTextInput={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={values.dateOfBirth}
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
                                sethidePassword={sethidePassword}
                            />
                            <MyTextInput 
                                label="Confirm Password"
                                icon="lock"
                                placeholder="* * * * *"
                                placeholderTextInput={darkLight}
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                sethidePassword={sethidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>
                                    Signup
                                </ButtonText>
                            </StyledButton>
                            <Line/>
                            <ExtraView>
                                <ExtraText>Already have an account?</ExtraText>
                                <TextLink>
                                    <TextLinkContent> Login</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}

                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, sethidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}  />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {... props} />
            {isPassword && (
                <RightIcon onPress={()=>sethidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup