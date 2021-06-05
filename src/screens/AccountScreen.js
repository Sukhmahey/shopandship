import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SignOut } from "../store/actions/AuthActions";
import { useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";
import { getAsyncData } from "../api/AsyncData";
import { UpdatePhone, UpdateAddress } from "../api/buy/FirestoreAccount";
import { authAsyncStorageUpdate } from "../store/actions/AuthActions";

import DrawerIconComponent from "../components/DrawerIconComponent";
import InputContainerComponent from "../components/InputContainerComponent";
import OkButtonComponent from "../components/OkButtonComponent";
import LoadingScreenComponent from "../components/LoadingScreenComponent";
import Color from "../constants/Colors";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const radius = Dimensions.get("window").height / 4;

const AccountScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [phone, setPhone] = useState(false);
  const [addres, setAddres] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const data = getAsyncData().then((element) => {
      console.log("data", element);
      setData(element);
    });
  }, [navigation, phone, addres]);

  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Account",
      headerShown: true,
      headerLeft: () => <DrawerIconComponent navigation={navigation} />,
    });
  }, [navigation]);

  const signout = () => {
    dispatch(SignOut(navigation, StackActions));
  };

  const inputPhoneValidation = () => {
    if (
      (phoneNumber.length > 0 && phoneNumber.length < 10) ||
      phoneNumber.length === 0
    ) {
      Alert.alert("Invalid Credentials", "Required Data field is empty", [
        { text: "Ok", style: "ok" },
      ]);
    } else {
      const payload = {
        uid: data.uid,
        name: data.name,
        email: data.email,
        phone: phoneNumber,
        address: data.address,
        photo: data.photo,
      };
      authAsyncStorageUpdate(payload).then(() => {
        UpdatePhone(phoneNumber).then(() => {
          setPhone(false);
        });
      });
    }
  };
  const inputAddressValidation = () => {
    if ((address.length > 0 && address.length < 10) || address.length === 0) {
      Alert.alert("Invalid Credentials", "Required Data field is empty", [
        { text: "Ok", style: "ok" },
      ]);
    } else {
      const payload = {
        uid: data.uid,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: address,
        photo: data.photo,
      };
      authAsyncStorageUpdate(payload).then(() => {
        UpdateAddress(address).then(() => {
          setAddres(false);
        });
      });
    }
  };

  if (data === null) {
    return <LoadingScreenComponent title="Loading   " />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.screen}>
        <View style={styles.imageContainer}>
          {data === null ? (
            <Image
              style={{ flex: 1, resizeMode: "center" }}
              source={require("../assets/icon.png")}
            />
          ) : (
            <Image
              style={{ flex: 1, resizeMode: "contain" }}
              source={{
                uri: data.photo,
              }}
            />
          )}
        </View>

        <Text style={styles.text}>Name: {data.name}</Text>
        <Text style={styles.text}>Email: {data.email}</Text>
        {phone ? (
          <View style={{ marginVertical: 30 }}>
            <InputContainerComponent
              value={phoneNumber}
              content="number"
              placeholder="Phone no. (10 digits)"
              keyboardType="phone-pad"
              maxLength={10}
              minLength={10}
              onChangeText={(val) => {
                let num = val.replace(".", "");
                if (isNaN(num)) {
                  Alert.alert(
                    "Invalid Input",
                    "Phone number only contain numbers",
                    [
                      {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                      },
                    ]
                  );
                } else {
                  setPhoneNumber(val);
                }
              }}
              iconLeft={
                <FontAwesome
                  name="mobile-phone"
                  size={30}
                  color={Color.PRIMARY_COLOR}
                />
              }
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <OkButtonComponent
                text="Save"
                style={{
                  backgroundColor: Color.HIGHLIGHT_COLOR,
                  marginBottom: 15,
                  width: "45%",
                }}
                onPress={() => {
                  inputPhoneValidation();
                }}
              />
              <OkButtonComponent
                text="Cancel"
                style={{
                  backgroundColor: Color.CANCEL_COLOR,
                  marginBottom: 15,
                  width: "45%",
                }}
                onPress={() => {
                  setPhone(false);
                }}
              />
            </View>
          </View>
        ) : null}
        {data.phone === "Not Available" && phone === false ? (
          <View>
            <OkButtonComponent
              text="Add Phone number"
              style={{
                backgroundColor: Color.PRIMARY_COLOR,
                marginBottom: 15,
                width: "100%",
              }}
              onPress={() => {
                setPhone(true);
              }}
              icon={<AntDesign name="plus" size={18} color="white" />}
            />
          </View>
        ) : null}

        {data.phone !== "Not Available" && phone === false ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Phone: {data.phone}</Text>
            <View style={styles.behind}>
              <TouchableOpacity
                onPress={() => {
                  setPhone(true);
                }}
              >
                <AntDesign name="edit" size={24} color={Color.PRIMARY_COLOR} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {addres ? (
          <View style={{ marginVertical: 30 }}>
            <InputContainerComponent
              value={address}
              content="text"
              placeholder="Address"
              keyboardType="default"
              returnKeyType="done"
              numberOfLine={5}
              multiline
              style={{ maxHeight: 100 }}
              onChangeText={(val) => {
                setAddress(val);
              }}
              iconLeft={
                <Entypo name="location" size={24} color={Color.PRIMARY_COLOR} />
              }
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <OkButtonComponent
                text="Save"
                style={{
                  backgroundColor: Color.HIGHLIGHT_COLOR,
                  marginBottom: 15,
                  width: "45%",
                }}
                onPress={() => {
                  inputAddressValidation();
                }}
              />
              <OkButtonComponent
                text="Cancel"
                style={{
                  backgroundColor: Color.CANCEL_COLOR,
                  marginBottom: 15,
                  width: "45%",
                }}
                onPress={() => {
                  setAddres(false);
                }}
              />
            </View>
          </View>
        ) : null}

        {data.address === "Not Available" && addres === false ? (
          <View>
            <OkButtonComponent
              text="Add Address"
              style={{
                backgroundColor: Color.PRIMARY_COLOR,
                marginBottom: 15,
                width: "100%",
              }}
              onPress={() => {
                setAddres(true);
              }}
              icon={<AntDesign name="plus" size={18} color="white" />}
            />
          </View>
        ) : null}

        {data.address !== "Not Available" && addres === false ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Address: {data.address}</Text>
            <View style={styles.behind}>
              <TouchableOpacity
                onPress={() => {
                  setAddres(true);
                }}
              >
                <AntDesign name="edit" size={24} color={Color.PRIMARY_COLOR} />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <OkButtonComponent
          text="Log Out"
          style={{
            backgroundColor: Color.CANCEL_COLOR,
            width: "100%",
            marginVertical: 50,
          }}
          onPress={() => {
            signout();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  behind: {
    borderRadius: 4,
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
    top: 0,
  },
  imageContainer: {
    width: "100%",
    height: windowHeight / 3,
    borderRadius: 6,
    backgroundColor: "white",
    marginBottom: 50,
  },
  screen: {
    flex: 1,
    margin: 10,
    marginHorizontal: 15,
  },
  scroll: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    color: "black",
  },
});

export default AccountScreen;
