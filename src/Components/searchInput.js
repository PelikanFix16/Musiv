import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const SearchInput = (props) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Music"
        placeholderTextColor="#9575cd"
        onChangeText={props.searchHandle}
        onSubmitEditing={props.submit}
      />
    </View>
  );
};

SearchInput.propTypes = {
  searchHandle: PropTypes.func,
  submit: PropTypes.func,
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    color: "#9575cd",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SearchInput;
