import React from 'react'
import { 
    ImageBackground,
    Image, 
    SafeAreaView, 
    Text, StyleSheet, 
    FlatList, 
    View, 
    StatusBar,
    ImageBackgroundBase
}   from 'react-native'
import { Feather } from '@expo/vector-icons'
import ListItem from '../components/ListItem'


const UpcomingWeather = ( {weatherData} ) => {
    const renderItem = ({ item }) => (
        <ListItem 
            condition={item.weather[0].main} 
            dt_txt={item.dt_txt} 
            min={item.main.temp_min} 
            max={item.main.temp_max} 
        />
    )
    const { container, image } = styles
    return (
        <SafeAreaView styles = {container}>
            
                <Image
                    source={require('/Users/heikoabadjian/fcc/WeatherApp/assets/upcoming_clouds.jpeg')} 
                    style={image}
                />
                <FlatList 
                    data = {weatherData}
                    renderItem = {renderItem}
                    keyExtractor ={(item)=>item.dt_txt}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'royalblue'
    },
    image: {
        flex: 1    
    }
})

export default UpcomingWeather