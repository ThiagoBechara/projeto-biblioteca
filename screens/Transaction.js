import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) { 
    super(props); 
    this.state = { 
    domState: "normal", 
    hasCameraPermissions: null, 
    scanned: false, 
    scannedData: "" 
  }; 
}
getCameraPermissions = async domState => { 
  const { status } = await Permissions.askAsync(Permissions.CAMERA); 
  this.setState({ 
    /*status === "granted" é verdadeiro se o usuário concedeu permissão 
    status === "granted" é falso se o usuário não concedeu permissão */ 
    hasCameraPermissions: status === "granted", 
    domState: domState, 
    scanned: false 
  });
 };
 handleBarCodeScanned = async ({ 
  type, data }) => { 
    this.setState({ 
      scannedData: data, 
      domState: "normal", 
      scanned: true 
    }); 
  };
  render() {
    const { 
      domState, 
      hasCameraPermissions, 
      scannedData, 
      scanned } = this.state; 
      if (domState === "scanner") { 
        return ( 
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} 
        style={StyleSheet.absoluteFillObject} />
         ); 
        }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{hasCameraPermissions ? scannedData : "Solicitar permissão da Camera"}</Text>
        <TouchableOpacity style={styles.botao}  
        onPress={() => this.getCameraPermissions("scanner")}>
          <Text style={styles.texto}>botão de câmera</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  },
  botao: {
    width: "15%", 
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  texto: {
    color: "#F48D20",
    fontWeight: "bold",
    fontSize: 20
  } 
});
