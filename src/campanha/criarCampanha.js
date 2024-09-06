import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import supabase from '../../supabaseClient';

import MenuDoador from '../../components/menuDoador';




const CriarCampanha = () => {

    const navigation = useNavigation();

    const [campaignName, setCampaignName] = useState('');
    const [campaignDescription, setCampaignDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [local, setLocalDoacao] = useState('');

    const tipos = [
        { key: "1", value: "A+" },
        { key: "2", value: "A-" },
        { key: "3", value: "B+" },
        { key: "4", value: "B-" },
        { key: "5", value: "AB+" },
        { key: "6", value: "AB-" },
        { key: "7", value: "O+" },
        { key: "8", value: "O-" },
    ];

    const imagens = [
        { id: 1, uri: require('../../assets/img/Rectangle 79.png') },
        { id: 2, uri: require('../../assets/img/Rectangle 80.png') },
        { id: 3, uri: require('../../assets/img/Rectangle 81.png') },
    ];

    //const [imagemSelecionada, setImagemSelecionada] = useState(null);

    const handleSelecionarImagem = (imagem) => {
        setImagemSelecionada(imagem);
    };

    //const imagemUriTexto = imagemSelecionada.toString();

    // Função para criar campanha no Supabase
    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('campanhas')  // Nome da sua tabela no Supabase
                .insert([
                    {
                        titulo: campaignName,
                        descricao: campaignDescription,
                        tipoSanguineo: selectedCategory,
                        local: local,
                        //imagem: imagemUriTexto.uri, // Armazene a URL da imagem aqui
                    }
                ]);

            if (error) {
                console.error('Erro ao criar campanha:', error);
            } else {
                console.log('Campanha criada com sucesso:', data);
                navigation.navigate('CampanhaMain')
            }
        } catch (error) {
            console.error('Erro ao enviar campanha:', error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Campanhas</Text>
                <TouchableOpacity>
                    <FontAwesome6 name="gear" size={32} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('CampanhaMain')}>
                        <AntDesign name="arrowleft" size={28} color="#326771" />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.contentTitle}>

                        <Text style={styles.titleContent}>Criação de campanha</Text>
                        <Text style={styles.subContent}>Crie sua própria campanha</Text>
                    </View>
                    <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingVertical: 20 }}>
                        <View style={styles.formContent}>
                            <Text>Título da Campanha</Text>
                            <TextInput
                                value={campaignName}
                                onChangeText={(text) => setCampaignName(text)}
                                placeholder="Digite o título da Campanha..."
                                style={styles.input}
                            />
                            <Text>Tipo sanguíneo</Text>
                            <SelectList
                                data={tipos}
                                arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                                search={false}
                                placeholder='Escolha um tipo sanguíneo'
                                boxStyles={styles.boxStyles}
                                dropdownItemStyles={styles.dropdownItemStyles}
                                dropdownStyles={styles.dropdownStyles}
                                save="value"
                                setSelected={(val) => setSelectedCategory(val)}
                            />
                            <Text>Local da doação</Text>
                            <TextInput
                                value={local}
                                onChangeText={(text) => setLocalDoacao(text)}
                                placeholder="Endereço do local da doação..."
                                style={styles.input}
                            />
                            <Text>Motivo da campanha</Text>
                            <TextInput
                                value={campaignDescription}
                                onChangeText={(text) => setCampaignDescription(text)}
                                placeholder="Digite aqui a descrição da campanha..."
                                multiline={true}
                                numberOfLines={10}
                                style={styles.TextAreainput}
                            />

                            <Text>Selecione uma imagem:</Text>
                            <View style={{ flexDirection: 'row', gap: 35 }}>
                                {imagens.map((imagem) => (
                                    <TouchableOpacity key={imagem.id} onPress={() => handleSelecionarImagem(imagem)}>
                                        <Image source={imagem.uri} />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonTxt}>Enviar Campanha</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </View>
            <MenuDoador />
        </SafeAreaView>
    );
};

export default CriarCampanha;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        justifyContent: 'flex-end',
    },
    voltarContainer: {
        position: 'absolute',
        top: 25,
        left: 16,
    },
    headerContainer: {
        backgroundColor: '#AF2B2B',
        height: '10%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        marginTop: 28,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 22
    },
    config: {
        marginTop: 28,
        marginRight: 20,
    },
    mainContainer: {
        padding: 32,
        flex: 1,
    },
    contentTitle: {
        marginTop: 32,
        alignItems: 'center',
        marginBottom: 32
    },
    titleContent: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 21
    },
    subContent: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    formContent: {
        gap: 15
    },
    input: {
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
        width: '95%',
        height: 40,
        paddingLeft: 13,
        alignSelf: 'center',

    },
    TextAreainput: {
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
        paddingLeft: 13,
        textAlignVertical: 'top',
        paddingTop: 15
    },
    boxStyles: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
    },
    ScrollView: {
        paddingBottom: 20,
        flexGrow: 1,
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    submitButton: {
        backgroundColor: '#1e6370',
        borderRadius: 5,
        width: 174,
        height: 35,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    submitButtonTxt:{
        color: 'white',
        textAlign: 'center'
    }
})