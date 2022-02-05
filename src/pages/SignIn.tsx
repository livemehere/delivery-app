import React, {useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canGoNext = email && password;

  const emailRef = useRef<TextInput | null>();
  const passwordRef = useRef<TextInput | null>();

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };
  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const onSubmit = () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }
    Alert.alert('알림', '로그인 되었습니다');
  };

  const toSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <DismissKeyboardView>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          style={styles.textInput}
          value={email}
          onChangeText={onChangeEmail}
          returnKeyType="next"
          blurOnSubmit={true}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          ref={emailRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호을 입력해주세요"
          placeholderTextColor="#666"
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          secureTextEntry
          style={styles.textInput}
          value={password}
          onChangeText={onChangePassword}
          returnKeyType="send"
          onSubmitEditing={onSubmit}
          ref={passwordRef}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            canGoNext
              ? [styles.loginButton, styles.loginButtonActive]
              : styles.loginButton
          }>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    marginBottom: 15,
  },
  textInput: {
    fontSize: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 5,
  },
  inputWrapper: {
    padding: 20,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignIn;
