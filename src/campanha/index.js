import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';


import MenuDoador from '../../components/menuDoador';

const CampanhaMain = () => {
    const navigation = useNavigation();

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

    //mudar a cor do filtro
    const [filtro1Selecionado, setFiltro1Selecionado] = useState(false);
    const [filtro2Selecionado, setFiltro2Selecionado] = useState(false);

    const handleFiltroPress = (filtro) => {
        if (filtro === 'filtro1') {
            setFiltro1Selecionado(!filtro1Selecionado);
            setFiltro2Selecionado(false);
        } else if (filtro === 'filtro2') {
            setFiltro2Selecionado(!filtro2Selecionado);
            setFiltro1Selecionado(false);
        }
    };

    const [campaigns, setCampaigns] = useState([]);

    // Buscar campanhas no Supabase
    useEffect(() => {
        const fetchCampaigns = async () => {
            const { data, error } = await supabase
                .from('campanhas')
                .select('*');

            if (error) {
                console.error('Error fetching campaigns:', error);
            } else {
                setCampaigns(data);
            }
        };

        fetchCampaigns();
    }, [campaigns]); // <--- add campaigns as a dependency

    const CampanhaList = () => {
        return (
            <View style={styles.listaCampanhasContainer}>
                {campaigns.map((item) => (
                    <View key={item.id} style={styles.campanhasContainer}>
                        <Image source={{ uri: item.imagem }} />
                        <Text style={styles.campanhaTitle}>{item.titulo}</Text>
                        <Text style={styles.campanhaDesc} numberOfLines={2}>{item.descricao}</Text>
                        <Text style={styles.campanhaMais}>Continue lendo...</Text>
                    </View>
                ))}
            </View>
        );
    };

    const FiltroButton = ({ filtro, selecionado, onPress }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.filtroButton,
                    selecionado ? styles.filtroSelecionado : null,
                ]}
                onPress={onPress}
            >
                <Text>{filtro}</Text>
            </TouchableOpacity>
        );
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
                <View style={styles.contentContainer}>
                    <View style={styles.contentTitle}>

                        <Text style={styles.titleContent}>Campanhas de doação</Text>
                        <Text style={styles.subContent}>Divulgue sua causa ou apoie uma</Text>
                    </View>

                    <View style={styles.filtroContainer}>
                        <SelectList
                            data={tipos}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            search={false}
                            placeholder='Tipo sanguíneo'
                            inputStyles={{ fontSize: 10 }}
                            boxStyles={styles.boxStyles}
                            dropdownItemStyles={styles.dropdownItemStyles}
                            dropdownStyles={styles.dropdownStyles}
                        />
                        <FiltroButton
                            filtro="Doação de reposição"
                            selecionado={filtro1Selecionado}
                            onPress={() => handleFiltroPress('filtro1')}
                        />
                        <FiltroButton
                            filtro="Doação voluntária"
                            selecionado={filtro2Selecionado}
                            onPress={() => handleFiltroPress('filtro2')}
                        />
                    </View>
                    <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingVertical: 20 }}>
                        <CampanhaList />
                    </ScrollView>

                    <View style={styles.campanhaCriar}>
                        <TouchableOpacity style={styles.criarBt} onPress={() => navigation.navigate('CriarCampanha')}>
                            <AntDesign name="pluscircleo" size={64} color="black" style={styles.iconCriar} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <MenuDoador />
        </SafeAreaView>
    )


}

export default CampanhaMain;

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
        marginTop: 16,
        marginBottom: 21,
        gap: 12
    },
    titleContent: {
        fontFamily: 'DM-Sans',
        fontSize: 20,
        color: '#000',
    },
    subContent: {
        fontFamily: 'DM-Sans',
        fontSize: 15,
        color: '#000',
        paddingLeft: 5
    },
    dropdownStyles: {
        width: 120,
        borderColor: '#DAEEF2',
        borderRadius: 7,
        backgroundColor: '#DAEEF2',
        marginTop: '',
        marginBottom: '5%'
    },
    boxStyles: {
        width: 120,
        borderColor: '#DAEEF2',
        borderRadius: 7,
        backgroundColor: '#DAEEF2',
        gap: 10
    },
    dropdownItemStyles: {
        color: '#af2b2b'
    },
    filtroButton: {
        backgroundColor: '#DAEEF2',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
        maxHeight: 40,
        padding: 10
    },
    filtroSelecionado: {
        backgroundColor: '#F2DADA',
    },
    filtroButtonInativo: {
        backgroundColor: '#DAEEF2',
    },
    txtFiltroBt: {
        fontSize: 10,
        textAlign: 'center'
    },
    filtroContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    campanhasContainer: {
        width: '100%',
        height: 175,
        backgroundColor: '#DAEEF2',
        top: 24,
        padding: 26,
        borderRadius: 15,
        marginBottom: 20,
        paddingBottom: 20,
        paddingTop: 20,
    },
    campanhaTitle: {
        fontSize: 23,
        marginBottom: 10,
    },
    campanhaDesc: {
        fontSize: 13,
        marginBottom: 10,
    },
    campanhaMais: {
        fontSize: 11,
        color: '#1e6370'
    },
    campanhaCriar: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        zIndex: 1,
    },
    iconCriar: {
        backgroundColor: '#DAEEF2',
        borderRadius: 50
    },
    listaCampanhasContainer: {
        gap: 5,
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    ScrollView: {
        paddingBottom: 20,
        flexGrow: 1,
    }
})