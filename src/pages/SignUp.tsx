import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
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
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

function SignUp({navigation}: SignInScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const canGoNext = email && password;

  const emailRef = useRef<TextInput | null>();
  const passwordRef = useRef<TextInput | null>();
  const nameRef = useRef<TextInput | null>();

  const onChangeEmail = (text: string) => {
    setEmail(text.trim());
  };
  const onChangePassword = (text: string) => {
    setPassword(text.trim());
  };
  const onChangeName = (text: string) => {
    setName(text.trim());
  };

  const onSubmit = async () => {
    if (loading) return;

    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    console.log(email, name, password);
    // await EncryptedStorage.setItem('키', '값sss');
    // await EncryptedStorage.removeItem('키');
    // const 값 = await EncryptedStorage.getItem('키');

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3105/user`, {
        email,
        name,
        password,
      });
      setLoading(false);

      console.log(response);
      Alert.alert('알림', '회원가입 되었습니다');
      navigation.navigate('SignIn');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.log(errorResponse.data.message);
      Alert.alert('알림', errorResponse.data.message);
    } finally {
      setLoading(false);
    }
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
            nameRef.current?.focus();
          }}
          ref={emailRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <TextInput
          placeholder="이름을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="name"
          style={styles.textInput}
          value={name}
          onChangeText={onChangeName}
          returnKeyType="next"
          blurOnSubmit={true}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          ref={nameRef}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호을 입력해주세요(영문,숫자,특수문자)"
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
          }
          disabled={!canGoNext || loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>회원가입</Text>
          )}
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

export default SignUp;
