import { ThemeContext } from '@/src/constants/Themes';
import React, { useContext } from 'react'
import { Text, View } from 'react-native';
import styles from './MySubscribersScreen.style';
import { DataTable, Button } from 'react-native-paper';
const MySubscribersScreen = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, theme.background]}>
      <Text style={[styles.title, theme.text]}> My subscribers</Text>
      <Text style={[styles.sectionTitle, theme.mute_text]}>
      Users who have subscribed to you content
      </Text>
      <View style={[{ marginTop: 30 }, theme.border]}>
        <DataTable>
          <DataTable.Header style={{ backgroundColor: theme.card.backgroundColor }}>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Subscriber</DataTable.Title>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Date</DataTable.Title>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Interval</DataTable.Title>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Ends at</DataTable.Title>
            <DataTable.Title textStyle={[{ fontWeight: 'bold', textAlign: 'center' }, theme.text]}>Status</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={{ backgroundColor: '#00000008' }}>
            <DataTable.Cell style={{ flex: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={[{ fontSize: 16, fontWeight: '600', textAlign: 'center', flexWrap: 'wrap' }, theme.primaryColor]}>
                  @varsha
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={[{ fontSize: 15, textAlign: 'center', flexWrap: 'wrap' }, theme.text]}>
                  july 15 2025
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={[{ fontSize: 15, textAlign: 'center', flexWrap: 'wrap' }, theme.text]}>
                  Not Applicable
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              <View style={{ flex: 1 }}>
                <Text style={[{ fontSize: 15, textAlign: 'center', flexWrap: 'wrap' }, theme.text]}>
                  Free Subscription
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 2, justifyContent: 'center' }}>
              <Button
                mode="contained"
                style={{ borderRadius: 16, backgroundColor: theme.button.backgroundColor }}
                labelStyle={{ color: theme.button.color, fontSize: 12, fontWeight: 'bold' }}
                onPress={() => {}}
                compact
              >
                Active
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      {/* <View style={[{justifyContent:'center',display:'flex',height:'50%'},theme.shadow,theme.card]}>
      <Text style={[styles.title, theme.text]}>You do not have any subscribers </Text>
      </View> */}
      </View>
  )
}

export default MySubscribersScreen