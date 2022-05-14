import React from 'react';

// keyboardAvoidingView
import { KeyboardAvoidingView, ScrollView, Pressable, Keyboard, Platform } from 'react-native';

const KeyboardAvoidingWrapper = (props) => {
    return (
      <KeyboardAvoidingView 
          style={{ flex: 1, backgroundColor:'transparent'  }} enabled
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={20}
      >
        <ScrollView showsHorizontalScrollIndicator={false}>
          <Pressable onPress={Keyboard.dismiss}>
            {props.children}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper;