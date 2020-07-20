import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const searchHandle = (text) => {
    setSearch(text);
  };
  const submit = () => {
    console.log(search);
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Music"
        placeholderTextColor="white"
        onChangeText={searchHandle}
        onSubmitEditing={submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SearchInput;
