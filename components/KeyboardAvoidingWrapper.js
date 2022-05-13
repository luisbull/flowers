import React from 'react';

// keyboardAvoidingView
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
    return (
      <KeyboardAvoidingView behavior={Platform.select({ android: 'height', ios: 'padding' })}
      style={{ flex: 1 }} enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                {children}
              </ScrollView>
            </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingWrapper;