import React, { useState } from "react";
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
import { View, TouchableOpacity } from "react-native";

// colors
const { brand, darkLight, primary } = Colors;

// KeyboardAvoidingWrapper
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// dateTimePicker
// import DateTimePicker from '@react-native-community/datetimepicker';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true)

    // const [show, setShow] = useState(false);

    // // actual date of birth to be sent
    const [dob, setDob] = useState();

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

    return (
        <KeyboardAvoidingWrapper>
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