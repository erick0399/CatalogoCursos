import React, { useState } from 'react';

import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ==========================================
// 1. CONFIGURACIÓN DE NAVEGACIÓN
// ==========================================

const Stack = createNativeStackNavigator();

// ==========================================
// 2. DATOS LOCALES DE LOS CURSOS
// ==========================================

const cursos = [
  {
    id: '1',
    nombre: 'React Native',
    horas: 20,
    descripcion: 'Desarrollo de aplicaciones móviles.',
  },
  {
    id: '2',
    nombre: 'Diseño Web',
    horas: 18,
    descripcion: 'Creación de interfaces para sitios web.',
  },
  {
    id: '3',
    nombre: 'Ofimática',
    horas: 16,
    descripcion:
      'Uso de documentos, presentaciones y hojas de cálculo.',
  },
  {
    id: '4',
    nombre: 'Marketing Digital',
    horas: 12,
    descripcion: 'Estrategias de comunicación digital.',
  },
];

// ==========================================
// 3. COMPONENTE REUTILIZABLE DE CADA CURSO
// ==========================================

function CursoItem({ curso, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPresionado,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconoCurso}>
        <Text style={styles.iconoTexto}>
          {curso.id.padStart(2, '0')}
        </Text>
      </View>

      <View style={styles.infoCurso}>
        <Text style={styles.nombreCurso}>
          {curso.nombre}
        </Text>

        <Text style={styles.descripcionLista}>
          {curso.descripcion}
        </Text>

        <Text style={styles.horasCurso}>
          Duración: {curso.horas} horas
        </Text>
      </View>

      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

// ==========================================
// 4. PANTALLA INICIO
// ==========================================

function InicioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#123B5D"
        barStyle="light-content"
      />

      <View style={styles.encabezado}>
        <Text style={styles.etiqueta}>
          FORMACIÓN PROFESIONAL
        </Text>

        <Text style={styles.titulo}>
          Explora tus cursos
        </Text>

        <Text style={styles.subtitulo}>
          Selecciona un curso para conocer sus detalles
          y registrar tu interés.
        </Text>
      </View>

      <View style={styles.resumen}>
        <Text style={styles.resumenNumero}>
          {cursos.length}
        </Text>

        <View style={styles.resumenInfo}>
          <Text style={styles.resumenTitulo}>
            Cursos disponibles
          </Text>

          <Text style={styles.resumenTexto}>
            Aprende y desarrolla nuevas habilidades.
          </Text>
        </View>
      </View>

      <FlatList
        data={cursos}
        renderItem={({ item }) => (
          <CursoItem
            curso={item}
            onPress={() =>
              navigation.navigate('Detalle', {
                curso: item,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.piePagina}>
        Desarrollo de Apps Multidispositivo I
      </Text>
    </View>
  );
}

// ==========================================
// 5. PANTALLA DETALLE Y FORMULARIO
// ==========================================

function DetalleScreen({ route }) {
  const { curso } = route.params;

  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaInteres, setAceptaInteres] = useState(false);

  // ========================================
  // 6. VALIDACIÓN DEL FORMULARIO
  // ========================================

  const confirmarInteres = () => {
    if (nombre.trim() === '') {
      Alert.alert(
        'Nombre requerido',
        'Por favor, escribe tu nombre completo.'
      );
      return;
    }

    if (correo.trim() === '') {
      Alert.alert(
        'Correo requerido',
        'Por favor, escribe tu correo electrónico.'
      );
      return;
    }

    if (!correo.trim().includes('@')) {
      Alert.alert(
        'Correo no válido',
        'El correo electrónico debe contener el símbolo @.'
      );
      return;
    }

    if (!aceptaInteres) {
      Alert.alert(
        'Confirma tu interés',
        'Debes activar la opción de interés para continuar.'
      );
      return;
    }

    Alert.alert(
      '¡Interés confirmado!',
      `Nombre: ${nombre.trim()}\n\nCurso seleccionado: ${curso.nombre}\n\nDuración: ${curso.horas} horas\n\nTu interés se ha registrado correctamente.`,
      [
        {
          text: 'Aceptar',
          onPress: () => {
            setNombre('');
            setCorreo('');
            setAceptaInteres(false);
          },
        },
      ]
    );
  };

  // ========================================
  // 7. INTERFAZ DEL DETALLE
  // ========================================

  return (
    <KeyboardAvoidingView
      style={styles.detalleContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.detalleContenido}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detalleIcono}>
          <Text style={styles.detalleIconoTexto}>
            {curso.nombre.substring(0, 1).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.etiquetaDetalle}>
          DETALLE DEL CURSO
        </Text>

        <Text style={styles.tituloDetalle}>
          {curso.nombre}
        </Text>

        <Text style={styles.descripcion}>
          {curso.descripcion}
        </Text>

        <View style={styles.tarjetaDetalle}>
          <Text style={styles.etiquetaDato}>
            DURACIÓN
          </Text>

          <Text style={styles.valorDato}>
            {curso.horas} horas
          </Text>
        </View>

        {/* FORMULARIO */}

        <View style={styles.formulario}>
          <Text style={styles.tituloFormulario}>
            Registra tu interés
          </Text>

          <Text style={styles.textoFormulario}>
            Completa los siguientes datos para confirmar
            tu interés en este curso.
          </Text>

          <Text style={styles.etiquetaCampo}>
            Nombre completo
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Escribe tu nombre"
            placeholderTextColor="#8996A3"
            value={nombre}
            onChangeText={setNombre}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Nombre completo"
          />

          <Text style={styles.etiquetaCampo}>
            Correo electrónico
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#8996A3"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            accessibilityLabel="Correo electrónico"
          />

          {/* SWITCH CONTROLADO CON useState */}

          <View style={styles.filaSwitch}>
            <View style={styles.textoSwitchContainer}>
              <Text style={styles.tituloSwitch}>
                Confirmo mi interés
              </Text>

              <Text style={styles.descripcionSwitch}>
                Deseo recibir información sobre este curso.
              </Text>
            </View>

            <Switch
              value={aceptaInteres}
              onValueChange={setAceptaInteres}
              trackColor={{
                false: '#C9D3DD',
                true: '#83CFC7',
              }}
              thumbColor={
                aceptaInteres ? '#087E8B' : '#F4F4F4'
              }
              accessibilityLabel="Confirmar interés en el curso"
            />
          </View>

          {/* BOTÓN DE CONFIRMACIÓN */}

          <Pressable
            style={({ pressed }) => [
              styles.botonConfirmar,
              pressed && styles.botonPresionado,
            ]}
            onPress={confirmarInteres}
          >
            <Text style={styles.textoBoton}>
              Confirmar interés
            </Text>
          </Pressable>
        </View>

        <View style={styles.mensajeFinal}>
          <Text style={styles.mensajeTitulo}>
            ¡Continúa aprendiendo!
          </Text>

          <Text style={styles.mensajeTexto}>
            Cada nuevo conocimiento es una oportunidad
            para desarrollar tus habilidades profesionales.
          </Text>
        </View>

        <Text style={styles.pieDetalle}>
          Catálogo de Cursos · Desarrollo de Apps
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ==========================================
// 8. COMPONENTE PRINCIPAL Y NAVEGACIÓN
// ==========================================

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#123B5D',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Volver',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{
            title: 'Mis cursos',
          }}
        />

        <Stack.Screen
          name="Detalle"
          component={DetalleScreen}
          options={{
            title: 'Detalle del curso',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// 9. ESTILOS DE LA APLICACIÓN
// ==========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FA',
  },

  encabezado: {
    backgroundColor: '#123B5D',
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 28,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  etiqueta: {
    color: '#9EDCF0',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 9,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitulo: {
    color: '#DCEAF5',
    fontSize: 14,
    lineHeight: 21,
  },

  resumen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E8F0',
  },

  resumenNumero: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#087E8B',
    marginRight: 15,
  },

  resumenInfo: {
    flex: 1,
  },

  resumenTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#17324D',
  },

  resumenTexto: {
    fontSize: 11,
    color: '#68798B',
    marginTop: 4,
  },

  lista: {
    paddingHorizontal: 18,
    paddingBottom: 15,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginBottom: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E8F0',
    elevation: 2,
  },

  itemPresionado: {
    backgroundColor: '#E5F3F7',
    opacity: 0.85,
  },

  iconoCurso: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#DDF2F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  iconoTexto: {
    color: '#087E8B',
    fontSize: 15,
    fontWeight: 'bold',
  },

  infoCurso: {
    flex: 1,
  },

  nombreCurso: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#17324D',
  },

  descripcionLista: {
    fontSize: 12,
    color: '#536779',
    marginTop: 5,
    lineHeight: 17,
  },

  horasCurso: {
    fontSize: 12,
    color: '#087E8B',
    marginTop: 5,
    fontWeight: '600',
  },

  flecha: {
    fontSize: 30,
    color: '#087E8B',
    marginLeft: 8,
  },

  piePagina: {
    textAlign: 'center',
    color: '#78899A',
    fontSize: 11,
    paddingVertical: 10,
  },

  detalleContainer: {
    flex: 1,
    backgroundColor: '#F2F6FA',
  },

  detalleContenido: {
    padding: 22,
    paddingBottom: 35,
  },

  detalleIcono: {
    width: 76,
    height: 76,
    backgroundColor: '#DDF2F5',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 20,
  },

  detalleIconoTexto: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#087E8B',
  },

  etiquetaDetalle: {
    textAlign: 'center',
    color: '#087E8B',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  tituloDetalle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#123B5D',
    textAlign: 'center',
    marginTop: 9,
    marginBottom: 18,
  },

  descripcion: {
    fontSize: 16,
    color: '#536779',
    lineHeight: 25,
    marginBottom: 22,
    textAlign: 'left',
  },

  tarjetaDetalle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E0E8F0',
  },

  etiquetaDato: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#718295',
    letterSpacing: 1,
    marginBottom: 8,
  },

  valorDato: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#123B5D',
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E0E8F0',
  },

  tituloFormulario: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#123B5D',
    marginBottom: 8,
  },

  textoFormulario: {
    fontSize: 14,
    color: '#536779',
    lineHeight: 21,
    marginBottom: 20,
  },

  etiquetaCampo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#17324D',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CCD8E3',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: '#17324D',
    marginBottom: 18,
  },

  filaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F6FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },

  textoSwitchContainer: {
    flex: 1,
    paddingRight: 10,
  },

  tituloSwitch: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#17324D',
  },

  descripcionSwitch: {
    fontSize: 12,
    color: '#68798B',
    lineHeight: 17,
    marginTop: 4,
  },

  botonConfirmar: {
    backgroundColor: '#087E8B',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  botonPresionado: {
    backgroundColor: '#065E68',
    opacity: 0.9,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  mensajeFinal: {
    backgroundColor: '#DDF2F5',
    borderRadius: 14,
    padding: 18,
    marginTop: 2,
    marginBottom: 18,
  },

  mensajeTitulo: {
    color: '#123B5D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
  },

  mensajeTexto: {
    color: '#36566B',
    fontSize: 14,
    lineHeight: 22,
  },

  pieDetalle: {
    textAlign: 'center',
    color: '#78899A',
    fontSize: 11,
    paddingVertical: 8,
  },
});