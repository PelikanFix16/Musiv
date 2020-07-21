import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const ItemList = (props) => {
  return (
    <TouchableHighlight
      onPress={() => {
        props.onPress();
      }}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: props.videoImage,
          }}
        />
        <View style={styles.textView}>
          <Text style={styles.textStyle}>{props.videoTitle}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

ItemList.propTypes = {
  videoImage: PropTypes.string,
  videoTitle: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flex: 1,
    flexDirection: "row",
  },
  tinyLogo: {
    width: 130,
    height: 100,
  },
  textStyle: {
    color: "#e1bee7",
    fontSize: 14,
    textAlign: "center",
    flexWrap: "wrap",
  },
  textView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
});
export default ItemList;
