import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import * as Contacts from "expo-contacts";
import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState();
  const allContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  const listSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.contacts}>
        {contacts !== undefined && (
          <FlatList
            style={styles.list}
            data={contacts}
            ItemSeparatorComponent={listSeparator}
            renderItem={({ item }) => {
              return (
                <View style={styles.item}>
                  <Text style={styles.name}>{item.name}</Text>
                  {item.phoneNumbers !== undefined ? (
                    <Text style={styles.number}>
                      {item.phoneNumbers[0].number}
                    </Text>
                  ) : (
                    <Text style={styles.number}>No number present</Text>
                  )}
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={allContacts}>
          <Text style={styles.buttontext}>Get Contacts</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contacts: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    width: "100%",
  },
  controls: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    padding: 15,
    borderRadius: 100,
    backgroundColor: "darkcyan",
  },
  buttontext: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  list: {
    width: "90%",
  },
  item: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  number: {
    fontSize: 15,
    color: "gray",
  },
  separator: {
    height: 1,
    marginTop: 8,
    marginBottom: 8,
    width: "100%",
    backgroundColor: "lightgray",
  },
});
