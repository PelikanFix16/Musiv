import React from "react";
import { TouchableHighlight, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import PropTypes from "prop-types";

const TouchableIcon = (props) => {
  return (
    <TouchableHighlight>
      <FontAwesomeIcon style={styles.styleIcon} size={28} icon={props.icon} />
    </TouchableHighlight>
  );
};

TouchableIcon.propTypes = {
  icon: PropTypes.object,
};

const styles = StyleSheet.create({
  styleIcon: {
    color: "white",
    margin: 10,
  },
});

export default TouchableIcon;
