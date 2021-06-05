import React, { useEffect, useState, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  NativeEventEmitter,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { utils } from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { getAllShops, AddShop } from "../../api/FirestoreShops";
import { getAsyncData } from "../../api/AsyncData";

import LoadingScreenComponent from "../../components/LoadingScreenComponent";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import InputContainerComponent from "../../components/InputContainerComponent";
import OkButtonComponent from "../../components/OkButtonComponent";
import Color from "../../constants/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreateShopScreen = ({ navigation }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [forEdit, setForEdit] = useState(false);
  const [uid, setUid] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const [shopData, setShopData] = useState({
    shopPhoto: "",
    shopName: "",
    shopPhone: "",
    shopAddress: "",
    shopId: "",
    shopDescription: "",
  });

  useEffect(() => {
    getAsyncData().then((data) => {
      setUid(data.uid);
    });
  }, [uid]);
  useEffect(() => {
    if (imageAdded) {
      AddShop(shopData.shopId, shopData, navigation);
    }
  }, [shopData.shopPhoto]);

  const options = {
    title: "You can choose one image",
    mediatype: "photo",
    quality: 0.5,
    storageOptions: {
      skipBackup: true,
    },
  };

  const inputValidation = () => {
    if (shopData.shopPhoto.length === 0) {
      Alert.alert("Add Product Image", "Product Image Is Required", [
        { text: "Ok", style: "ok" },
      ]);
    } else if (
      shopData.shopName.length === 0 ||
      (shopData.shopPhone.length > 0 && shopData.shopPhone.length < 10) ||
      shopData.shopPhone.length === 0 ||
      shopData.shopAddress.length === 0 ||
      shopData.shopDescription.length === 0
    ) {
      Alert.alert("Invalid Credentials", "Required Data field is empty", [
        { text: "Ok", style: "ok" },
      ]);
    } else {
      AddShopImage(shopData.shopPhoto);
    }
  };

  const AddShopImage = async (path) => {
    setIsImageLoading(true);
    const reference = storage().ref(
      `users/${uid}/shops/${shopData.shopId}/shopImage.png`
    );
    const task = reference.putFile(path);
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
    });

    task.then(() => {
      getImageUrl();
    });
  };
  const getImageUrl = async () => {
    const url = storage()
      .ref(`users/${uid}/shops/${shopData.shopId}/shopImage.png`)
      .getDownloadURL()
      .then((data) => {
        setShopData({ ...shopData, shopPhoto: data });

        setIsImageLoading(false);
      });
    setImageAdded(true);
  };
  const getImage = () => {
    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        setShopData({ ...shopData, shopPhoto: response.uri });
      }
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Shop",
      headerShown: true,
    });
  }, [navigation]);

  if (isImageLoading) {
    return <LoadingScreenComponent title="Construction in Progress...  " />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? 10 : 10}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.screen}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.imageContainer}>
                <ImagePickerComponent
                  imageGallery={shopData.shopPhoto}
                  onPress={() => {
                    getImage();
                  }}
                  source={{
                    uri: shopData.shopPhoto,
                  }}
                />
              </View>
              <View>
                <InputContainerComponent
                  value={shopData.shopName}
                  placeholder="Shop Name"
                  content="text"
                  onChangeText={(val) => {
                    setShopData({
                      ...shopData,
                      shopName: val,
                      shopId: `${uid}${val}`.split(" ").join(""),
                    });
                  }}
                  iconLeft={
                    <Fontisto
                      name="shopping-store"
                      size={24}
                      color={Color.PRIMARY_COLOR}
                    />
                  }
                />
              </View>

              <View>
                <InputContainerComponent
                  value={shopData.shopPhone}
                  content="number"
                  placeholder="Shop Phone no. (10 digits)"
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
                      setShopData({ ...shopData, shopPhone: val });
                    }
                  }}
                  iconLeft={
                    <Entypo
                      name="old-phone"
                      size={24}
                      color={Color.PRIMARY_COLOR}
                    />
                  }
                />
              </View>
              <View>
                <InputContainerComponent
                  value={shopData.shopAddress}
                  content="text"
                  placeholder="Shop Address"
                  keyboardType="default"
                  returnKeyType="done"
                  numberOfLine={5}
                  multiline
                  style={{ maxHeight: 100 }}
                  onChangeText={(val) => {
                    setShopData({ ...shopData, shopAddress: val });
                  }}
                  iconLeft={
                    <Entypo
                      name="location"
                      size={24}
                      color={Color.PRIMARY_COLOR}
                    />
                  }
                />
              </View>
              <View>
                <InputContainerComponent
                  value={shopData.shopDescription}
                  content="text"
                  placeholder="Tell Something About Shop... "
                  keyboardType="default"
                  returnKeyType="done"
                  numberOfLine={5}
                  multiline
                  style={{ maxHeight: 100 }}
                  onChangeText={(val) => {
                    setShopData({ ...shopData, shopDescription: val });
                  }}
                  iconLeft={
                    <MaterialIcons
                      name="description"
                      size={24}
                      color={Color.PRIMARY_COLOR}
                    />
                  }
                />
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <OkButtonComponent
                text="Save"
                style={{ width: "45%" }}
                onPress={() => {
                  Keyboard.dismiss();
                  inputValidation();
                }}
              />
              <OkButtonComponent
                text="Cancel"
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  width: "45%",
                  backgroundColor: Color.HIGHLIGHT_COLOR,
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
  },
  imageContainer: {
    marginVertical: 30,
  },
});

export default memo(CreateShopScreen);
