import React, { useEffect, useState, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { AddProduct } from "../../api/FirestoreProducts";
import { getAsyncData } from "../../api/AsyncData";

import LoadingScreenComponent from "../../components/LoadingScreenComponent";
import ImagePickerComponent from "../../components/ImagePickerComponent";
import InputContainerComponent from "../../components/InputContainerComponent";
import OkButtonComponent from "../../components/OkButtonComponent";
import Color from "../../constants/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CreateProductScreen = ({ navigation, route }) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [uid, setUid] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const [productData, setProductData] = useState({
    productPhoto: "",
    productName: "",
    productPrice: "",
    productUnit: "unit",
    shopId: "",
    productId: "",
    productDescription: "",
  });
  const { shopId } = route.params;

  useEffect(() => {
    setProductData({
      ...productData,
      shopId: shopId,
    });
  }, [navigation]);

  useEffect(() => {
    getAsyncData().then((data) => {
      setUid(data.uid);
    });
  }, [uid]);
  useEffect(() => {
    if (imageAdded) {
      AddProduct(
        productData.shopId,
        productData.productId,
        productData,
        navigation
      );
    }
  }, [productData.productPhoto]);

  const options = {
    title: "You can choose one image",
    mediatype: "photo",
    quality: 0.5,
    storageOptions: {
      skipBackup: true,
    },
  };

  const inputValidation = () => {
    if (productData.productPhoto.length === 0) {
      Alert.alert("Add Product Image", "Product Image Is Required", [
        { text: "Ok", style: "ok" },
      ]);
    } else if (
      productData.productName.length === 0 ||
      productData.productPrice.length === 0 ||
      productData.productDescription.length === 0
    ) {
      Alert.alert("Invalid Credentials", "Required Data field is empty", [
        { text: "Ok", style: "ok" },
      ]);
    } else {
      AddProductImage(productData.productPhoto);
    }
  };

  const AddProductImage = async (path) => {
    setIsImageLoading(true);
    const reference = storage().ref(
      `users/${uid}/shops/${productData.shopId}/products/${productData.productId}/productImage.png`
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
      .ref(
        `users/${uid}/shops/${productData.shopId}/products/${productData.productId}/productImage.png`
      )
      .getDownloadURL()
      .then((data) => {
        setProductData({ ...productData, productPhoto: data });

        setIsImageLoading(false);
      });
    setImageAdded(true);
  };
  const getImage = () => {
    launchImageLibrary(options, (response) => {
      if (!response.didCancel) {
        setProductData({ ...productData, productPhoto: response.uri });
      }
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Create Product",
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
                  imageGallery={productData.productPhoto}
                  onPress={() => {
                    getImage();
                  }}
                  source={{
                    uri: productData.productPhoto,
                  }}
                />
              </View>
              <View>
                <InputContainerComponent
                  value={productData.productName}
                  placeholder="Product Name"
                  content="text"
                  onChangeText={(val) => {
                    setProductData({
                      ...productData,
                      productName: val,
                      productId: `${shopId}${val}`.split(" ").join(""),
                    });
                  }}
                  iconLeft={
                    <Fontisto
                      name="shopping-bag"
                      size={24}
                      color={Color.PRIMARY_COLOR}
                    />
                  }
                />
              </View>

              <View style={styles.priceUnit}>
                <InputContainerComponent
                  value={productData.productPrice}
                  content="text"
                  placeholder="Price"
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
                      setProductData({ ...productData, productPrice: val });
                    }
                  }}
                  iconLeft={
                    <FontAwesome
                      name="rupee"
                      size={24}
                      color={Color.PRIMARY_COLOR}
                    />
                  }
                  iconRight={
                    <Picker
                      mode="dropdown"
                      dropdownIconColor={Color.PRIMARY_COLOR}
                      style={[styles.pickerStyle, { flex: 1 }]}
                      itemStyle={styles.pickerItem}
                      selectedValue={productData.productUnit}
                      onValueChange={(itemValue, itemIndex) =>
                        setProductData({
                          ...productData,
                          productUnit: itemValue,
                        })
                      }
                    >
                      <Picker.Item label="/Kilogram" value="kg" />
                      <Picker.Item label="/gram" value="g" />
                      <Picker.Item label="/litre" value="ltr" />
                      <Picker.Item label="/packet" value="pkt" />
                      <Picker.Item label="/Unit" value="unit" />
                      <Picker.Item label="/Item" value="item" />
                      <Picker.Item label="/Piece" value="piece" />
                    </Picker>
                  }
                />
              </View>

              <View>
                <InputContainerComponent
                  value={productData.productDescription}
                  content="text"
                  placeholder="Tell Something About Product... "
                  keyboardType="default"
                  returnKeyType="done"
                  numberOfLine={5}
                  multiline
                  style={{ maxHeight: 100 }}
                  onChangeText={(val) => {
                    setProductData({ ...productData, productDescription: val });
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
  pickerStyle: {
    color: Color.PRIMARY_COLOR,
    justifyContent: "center",
  },
  pickerItem: {
    justifyContent: "center",
  },
  priceUnit: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
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

export default memo(CreateProductScreen);
