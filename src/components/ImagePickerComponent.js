import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import CardView from "react-native-cardview";
import LoadingScreenComponent from "../components/LoadingScreenComponent";

import Color from "../constants/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ImagePickerComponent = (props) => {
  const [showLogo, setShowLogo] = useState(true);

  const TouchComponent =
    Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
  const options = {
    title: "You can choose one image",
    maxWidth: windowWidth,
    maxHeight: windowHeight / 3,
    storageOptions: {
      skipBackup: true,
    },
  };
  useEffect(() => {
    if (props.imageGallery !== "") {
      setShowLogo(false);
    } else {
      setShowLogo(true);
    }
  }, [props.imageGallery]);

  return (
    <View style={styles.container}>
      <CardView
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={6}
        useCompatPadding
      >
        <TouchComponent {...props}>
          <View style={styles.imageContainer}>
            {showLogo ? (
              <Image
                style={{ flex: 1, resizeMode: "center" }}
                source={require("../assets/appLogo.png")}
              />
            ) : (
              <Image style={{ flex: 1, resizeMode: "contain" }} {...props} />
            )}
          </View>
        </TouchComponent>
      </CardView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: windowHeight / 3,
    borderRadius: 6,
    backgroundColor: "white",
  },
});

export default ImagePickerComponent;
