import React, { useContext } from "react";
import { StatusBar } from 'expo-status-bar';

import { 
    InnerContainer, 
    PageTitle, 
    SubTitle, 
    StyledFormArea, 
    StyledButton, 
    ButtonText, 
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar
} from "./../components/styles";

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credential context
import { CredentialsContext } from './../components/CredentialsContext';


const Welcome = () => {

    // context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {name, email} = storedCredentials;

    const clearLogin= () => {
        AsyncStorage.removeItem('flowerHouseCredentials')
            .then(() =>{
                setStoredCredentials("");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/img/purple-flowers-ideas.png')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome to Flower House</PageTitle>
                    <SubTitle  welcome={true}>{name || 'Antonio Gomez'}</SubTitle>
                    <SubTitle  welcome={true}>{email ||'AntonioGomez@gmail.com'}</SubTitle>
                    
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/img/Purple_Flower.png')}/>
                        <Line/>
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>
                                Logout
                            </ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}


export default Welcome