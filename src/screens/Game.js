import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

import CardPlayer from "../components/CardPLayer";

import {
  shuffle,
  getRandomInt,
  RandomElementInArray
} from "../../utils/function";
import { iconsElements } from "../../assets/icon";
import * as Animatable from "react-native-animatable";
import { Button, Overlay } from "react-native-elements";
import Title from "../components/Title";
import Container from "../components/Container";
import Toast, { DURATION } from "react-native-easy-toast";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const els = ["fire", "water", "wind", "ground"];

const infoHelp = [
  "le vent est faible contre le feu.",
  "le feu est faible contre la terre.",
  "le feu est faible contre la terre.",
  "l'eau est faible contre la vent.",
  "la terre est faible contre la vent.",
  "la terre est faible contre l'eau.",
  "le vent est efficace face à l'eau.",
  "le vent est efficace face à la terre.",
  "le feu est efficace face au vent.",
  "l'eau est efficace face au feu.",
  "l'eau est efficace face à la terre.",
  "la terre est efficace face au feu."
];

// DEE7ED
const headerColor = "#27C1D9";
const PlayContentColor = "#27C1D9";
export const BonusElement = (elementChoice, baseElement) => {
  // null  === the same Element
  // false === perds contre l'element
  // true === gagne contre l'element

  if (elementChoice === "wind") {
  }
  if (elementChoice === "water") {
  }
  if (elementChoice === "fire") {
  }
  if (elementChoice === "ground") {
  }
  // "fire" ==> "water"
};

export function Game({ navigation }) {
  // for settup ComponentDidMount()
  const [firstInApp, setFirstInApp] = useState(true);

  // InfoUser Storage
  const [infoUser, setInfoUser] = useState(undefined);

  // Tab of Elements
  const [elements, setElements] = useState(shuffle(els));

  // randomInt for Icon
  const [randomInt, setRandomInt] = useState(getRandomInt());

  // info Of the Enemy
  const [EnemyInfo, setEnemyInfo] = useState({
    life: 1
  });

  const [PlayerInfo, setPlayerInfo] = useState({
    life: 1
  });

  const [GameLost, setGameLost] = useState(false);
  const [GameWin, setGameWin] = useState(false);

  // radomElement
  const [RandomElement, setRandomElement] = useState(RandomElementInArray(els));

  useEffect(() => {
    //   ComponentDidMount

    if (firstInApp) {
      // random elements in array
      // randomEnemy()
      // refs.toast.show("hello world!");

      getInfo();
      setFirstInApp(false);
    }

    const interval = setInterval(() => {
      setRandomElement(RandomElementInArray(els));

      setElements(shuffle(elements));
      // iconRef.flipInY(900);
    }, 1000);
    return () => clearInterval(interval);
  });

  const getInfo = async () => {
    const infoUserJson = await AsyncStorage.getItem("infoUser");
    let infoUser = JSON.parse(infoUserJson);
    setInfoUser(infoUser);
  };

  attaqueEnemy = element => {
    if (element === RandomElement) {
      enemyRef.wobble(800);

      setEnemyInfo({ ...EnemyInfo, life: EnemyInfo.life - 0.1 });
      if (EnemyInfo.life <= 0) {
        _saveParty(true);
        setGameWin(true);
      }
    } else {
      playerRef.wobble(800);

      setPlayerInfo({ ...PlayerInfo, life: PlayerInfo.life - 0.1 });
      if (PlayerInfo.life <= 0) {
        _saveParty(false);
        setGameLost(true);
      }
    }
    setRandomElement(RandomElementInArray(els));
    setElements(shuffle(elements));
  };

  _saveParty = async isWin => {
    let infoUserStorage;
    if (infoUser === null) {
      infoUserStorage = { party: [] };
    } else {
      infoUserStorage = infoUser;
    }

    infoUserStorage.party = [
      ...infoUserStorage.party,
      {
        url_photo: `https://avatars.dicebear.com/v2/bottts/${randomInt +
          2}.svg?options[topChange]=0`,
        party: isWin ? "Gagnée" : "Perdu"
      }
    ];
    await AsyncStorage.setItem("infoUser", JSON.stringify(infoUserStorage));
  };

  gameLostView = () => {
    return (
      <Overlay
        isVisible={GameLost}
        overlayBackgroundColor="white"
        overlayStyle={{}}
        onBackdropPress={() => navigation.navigate("Home")}
      >
        <Container>
          <Title
            title="Tu as perdu"
            style={{ color: "rgba(255, 0, 0, 0.5)" }}
          />
          <Image
            style={{
              width: 100,
              height: 100,
              margin: 10
            }}
            source={require("../../assets/sad.png")}
          />
          <Text style={{ margin: 10, fontSize: 15, marginBottom: 30 }}>
            Fais plus attention au contre-élement et au bonus
          </Text>
          <Button
            title="Revenir à l'accueil "
            onPress={() => navigation.navigate("Home")}
          />
        </Container>
      </Overlay>
    );
  };

  gameWinView = () => {
    return (
      <Overlay
        isVisible={GameWin}
        overlayBackgroundColor="white"
        overlayStyle={{}}
        onBackdropPress={() => navigation.navigate("Home")}
      >
        <Container>
          <Title
            title="Tu as gagné"
            style={{ color: "rgba(0, 255, 128, 0.5)" }}
          />
          <Image
            style={{
              width: 100,
              height: 100,
              margin: 10
            }}
            source={require("../../assets/happy.png")}
          />
          <Text style={{ margin: 10, fontSize: 15, marginBottom: 30 }}>
            Rejoue pour augmenter la difficulter
          </Text>
          <Button
            title="Revenir à l'accueil "
            onPress={() => navigation.navigate("Home")}
          />
        </Container>
      </Overlay>
    );
  };

  return (
    <View style={{ height: deviceHeight }}>
      {gameLostView()}
      {gameWinView()}

      <View
        style={{
          height: deviceHeight * 0.4,
          backgroundColor: PlayContentColor,
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20
        }}
      >
        <Animatable.View
          animation={"bounceInLeft"}
          duration={2000}
          ref={ref => {
            playerRef = ref;
          }}
        >
          <CardPlayer
            image={`https://avatars.dicebear.com/v2/bottts/${randomInt}.svg?options[topChange]=0`}
            name="You"
            life={PlayerInfo.life}
          />
        </Animatable.View>

        <Image
          style={{
            width: 30,
            height: 30
          }}
          source={require("../../assets/battle.png")}
        />

        <Animatable.View
          animation={"bounceInRight"}
          duration={2000}
          ref={ref => {
            enemyRef = ref;
          }}
        >
          <CardPlayer
            image={`https://avatars.dicebear.com/v2/bottts/${randomInt +
              2}.svg?options[topChange]=0`}
            name="Monster"
            life={EnemyInfo.life}
          />
        </Animatable.View>
      </View>
      <View style={{ height: deviceHeight * 0.6 }}>
        <View style={styles.profileDetail}>
          <Animatable.View
            animation={"zoomIn"}
            duration={1000}
            ref={ref => {
              iconRef = ref;
            }}
          >
            <Image
              source={iconsElements[RandomElement]}
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderRadius: 50,
                paddingBottom: 20,
                padding: 10,
                borderColor: "black",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white"
              }}
            />
          </Animatable.View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // alignItems: "center",
            paddingTop: deviceHeight * 0.6 * 0.3,
            justifyContent: "space-between",
            paddingHorizontal: 20
          }}
        >
          {elements.map((element, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  attaqueEnemy(element);
                }}
              >
                <Image
                  key={key}
                  source={iconsElements[element]}
                  style={{
                    width: 75,
                    height: 75,
                    borderWidth: 1,
                    borderRadius: 75 / 2,
                    padding: 10,
                    borderColor: "black"
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  profileDetail: {
    alignSelf: "center",
    marginTop: -50,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute"
  }
});

Game.navigationOptions = ({ navigation }) => ({
  title: "Fight",
  // headerLeft: null,
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.pop()}>
      <Text> Home</Text>
    </TouchableOpacity>
  ),
  titleStyle: {
    textAlign: "center"
  },
  headerStyle: {
    textAlign: "center",
    backgroundColor: headerColor
  }
});

export default withNavigation(Game);
