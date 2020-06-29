import React, {useState} from 'react';
import {View} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Form,
  Item,
  Input,
  Toast,
} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation} from '@apollo/client';

const NUEVO_PROYECTO = gql`
  mutation nuevoProyecto($input: ProyectoInput) {
    nuevoProyecto(input: $input) {
      nombre
      id
    }
  }
`;

// Actualizar el caché
const OBTENER_PROYECTO = gql`
  query obtenerProyectos {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const NuevoProyecto = () => {
  const navigation = useNavigation();

  // State del componente
  const [nombre, guardarNombre] = useState('');
  const [mensaje, guardarMensaje] = useState(null);

  // Apollo
  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
    update(
      cache,
      {
        data: {nuevoProyecto},
      },
    ) {
      const {obtenerProyectos} = cache.readQuery({query: OBTENER_PROYECTO});
      cache.writeQuery({
        query: OBTENER_PROYECTO,
        data: {obtenerProyectos: obtenerProyectos.concat([nuevoProyecto])},
      });
    },
  });

  //Validad crear poryecot
  const handleSubmit = async () => {
    if (nombre === '') {
      guardarMensaje('El nombre del Proyecto es Obligatorio');
      return;
    }

    // Guardar el proyecto en la base de datos

    try {
      const {data} = await nuevoProyecto({
        variables: {
          input: {
            nombre,
          },
        },
      });
      //console.log(data);
      guardarMensaje('Proyecto Creado Correctamnte');
      navigation.navigate('Proyectos');
    } catch (erro) {
      //console.log(error);
      guardarMensaje(error.message.replace('GraphQL error:', ''));
    }
  };

  // muestra un mensaje Toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#E84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.subtitulo}>Nuevo Proyecto</H1>
        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              placeholder="Nombre del Proyecto"
              onChangeText={texto => guardarNombre(texto)}
            />
          </Item>
        </Form>
        <Button
          style={[globalStyles.boton, {marginTop: 30}]}
          square
          block
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.botonTexto}>Crear Proyecto</Text>
        </Button>
      </View>

      {mensaje && mostrarAlerta()}
    </Container>
  );
};

export default NuevoProyecto;
