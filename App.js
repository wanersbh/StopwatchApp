import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

let tempo = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function StopwatchApp() {

  const [numero, setNumero] = useState('00:00:00');
  const [textoBotao, setTextoBotao] = useState('VAI');
  const [ultimoTempo, setUltimoTempo] = useState(null);

  function vai() {

    if (tempo !== null) {
      clearInterval(tempo);
      tempo = null;
      setTextoBotao('VAI');
    } else {
      tempo = setInterval(() => {
        ss++;

        if (ss === 60) {
          ss = 0;
          mm++;
        }

        if (mm === 60) {
          mm = 0;
          hh++;
        }

        let tempoFormatado =
          (hh < 10 ? '0' + hh : hh) + ':' +
          (mm < 10 ? '0' + mm : mm) + ':' +
          (ss < 10 ? '0' + ss : ss);

        setNumero(tempoFormatado);
      }, 1000);

      setTextoBotao('PARAR');
    }

  }

  function limpar() {

    if(tempo !== null){
      clearInterval(tempo);
      tempo = null;
    }

    setUltimoTempo(numero);
    setNumero('00:00:00');
    ss=0;
    mm=0;
    hh=0;

    setTextoBotao('VAI');
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}>{numero}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{textoBotao}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimoTempo ? `Último tempo ${ultimoTempo}` : ''}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima: {
    marginTop: 40
  },
  textoCorrida: {
    fontSize: 23,
    color: '#FFF',
    fontStyle: 'italic'
  }

});