import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";

import Image from "react-native-remote-svg";

import Title from "../components/Title";
import Container from "../components/Container";
import { Loading } from "../components/Loading";

export default function History() {
  // for settup ComponentDidMount()
  const [firstInApp, setFirstInApp] = useState(true);

  // InfoUser Storage
  const [infoUser, setInfoUser] = useState(undefined);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      getInfo();
      setFirstInApp(false);
    }
  });

  const getInfo = async () => {
    const infoUserJson = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserJson);
    setInfoUser(infoUser);
  };

  if (infoUser === undefined) {
    return (
      <View style={[styles.container]}>
        <Loading />
      </View>
    );
  } else if (infoUser === null) {
    return (
      <View
        style={[
          styles.container,
          {
            alignItems: "center",
            paddingHorizontal: 10
          }
        ]}
      >
        <Title title="Joues un peu avant de vouloir voir ton historique😅 " />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/gif.gif")}
      style={{ width: "100%", height: "100%" }}
      onLoad={() => {
        <Loading />;
      }}
    >
      <Container
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Title title={infoUser.party.length + " Parties"} />
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",

              justifyContent: "center"
            }}
          >
            {infoUser.party.map((element, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor:
                      element.party === "Gagnée" ? "green" : "red",
                    borderColor: "black",
                    borderWidth: 1,
                    margin: 10,
                    paddingBottom: 10
                  }}
                >
                  <Image
                    key={index}
                    style={{
                      width: 100,
                      height: 100
                      // borderColor: "black",
                      // borderWidth: 1
                    }}
                    source={{
                      uri: element.url_photo
                    }}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
