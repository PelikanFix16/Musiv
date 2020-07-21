import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PropTypes from "prop-types";

const TouchableIcon = (props) => {
  return (
    <TouchableHighlight
      style={styles.touchStyle}
      onPress={() => {
        try {
          props.onPress();
        } catch (error) {
          console.log(error);
        }
      }}>
      <FontAwesomeIcon style={styles.styleIcon} size={28} icon={props.icon} />
    </TouchableHighlight>
  );
};

TouchableIcon.propTypes = {
  icon: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  styleIcon: {
    color: "#9575cd",
    margin: 10,
  },
  touchStyle: {
    width: 50,
    height: 50,
  },
});

export default TouchableIcon;
