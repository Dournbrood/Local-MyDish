import React, { useState, userEffect, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { loginUser } from "../store/auth/authActions";
import styles from "../styles/loginStyles.js";
import logo from "../assets/LogoGreen.png";
import RecipeShareLogo from "./RecipeShareLogo.js";

const Login = ({ navigation }) => {
    const [login, setLogin] = useState({ username: "", password: "" });
    const errorMsg = useSelector(state => state.auth.error);
    const userId = useSelector(state => state.auth.userId);
    console.log(userId);
    const dispatch = useDispatch();
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    // This has an underscore to differentiate it from the loginUser action
    const _loginUser = () => dispatch(loginUser(login));

    useEffect(() => {
        if (userId) navigation.navigate("App");
    }, [userId]);

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
                <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>Log In</Text>

                        <Text style={styles.explanationText}>
                            Sign into save and edit your favorite recipes.
                        </Text>
                        <Text style={styles.emailText}>Username</Text>
                        <TextInput
                            ref={usernameInput}
                            style={styles.inputFeilds}
                            name="username"
                            testID="username"
                            value={login.username}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInput.current.focus()
                            }
                            onChangeText={event =>
                                setLogin({ ...login, username: event })
                            }
                        />
                        <Text style={styles.passwordText}>Password</Text>
                        <TextInput
                            ref={passwordInput}
                            style={styles.inputFeilds}
                            name="password"
                            testID="password"
                            value={login.password}
                            returnKeyType="done"
                            onChangeText={event =>
                                setLogin({ ...login, password: event })
                            }
                            secureTextEntry={true}
                        />
                        {errorMsg != null && (
                            <Text style={{ color: "red", marginLeft: 100 }}>
                                {errorMsg}
                            </Text>
                        )}

                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Signup");
                            }}
                        >
                            <Text style={styles.createAccountButton}>
                                Create an Account
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: "row-reverse",
                                marginRight: 16,
                            }}
                        >
                            <TouchableOpacity
                                onPress={_loginUser}
                                style={styles.loginButton}
                            >
                                <Text style={styles.loginButtonText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};
Login.navigationOptions = {
    headerTitle: <RecipeShareLogo />,
};

export default Login;
