import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react'
import { View,Text } from 'react-native';
import styles from './MySubscriptions.style';
import { DataTable,Button } from 'react-native-paper';
const MySubscriptions = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}>My Subscriptions</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
      Users you have subscribed to your content
      </Text>
      {/* <View style={[{justifyContent:'center',display:'flex',height:'50%'},theme.shadow,theme.card]}>
      <Text style={[styles.title, theme.text]}>You have not subscribed to any user
         <Text style={{textDecorationLine:'underline'}}>Explore Creators</Text></Text>
      </View> */}
        <View style={[{ marginTop: 30 }, theme.border]}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: theme.card.backgroundColor }}>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>User</DataTable.Title>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Date</DataTable.Title>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Action</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={{ backgroundColor: '#00000008' }}>
            <DataTable.Cell textStyle={[{ fontSize: 16, fontWeight: '600', textAlign: 'center',flexWrap: 'wrap'  }, theme.primaryColor]}>@varsha</DataTable.Cell>
            <DataTable.Cell textStyle={[{ fontSize: 15, textAlign: 'center',flexWrap: 'wrap'  }, theme.text]}>july 15 2025</DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'center' }}>
              <Button
                mode="contained"
                style={{ borderRadius: 16, backgroundColor: theme.button.backgroundColor }}
                labelStyle={{ color: theme.button.color, fontSize: 12, fontWeight: 'bold' }}
                onPress={() => {}}
                compact
              >
                Remove
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      </View>
  )
}

export default MySubscriptions