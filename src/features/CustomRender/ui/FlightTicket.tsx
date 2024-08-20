import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FlightTicket = () => {
  return (
    <View style={styles.ticketContainer}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✈️</Text>
        </View>
        <Text style={styles.airlineText}>Приложение к новости</Text>
        <Text style={styles.priceText}>$234</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketContainer: {
    backgroundColor: '#F5F7FB',
    borderRadius: 20,
    padding: 20,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#D7E4F2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  airlineText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C4C4C',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    marginVertical: 15,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  column: {
    alignItems: 'center',
  },
  label: {
    color: '#A6A6A6',
    fontSize: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airport: {
    fontSize: 14,
    color: '#A6A6A6',
  },
  duration: {
    fontSize: 14,
    color: '#A6A6A6',
  },
  separator: {
    fontSize: 12,
    color: '#A6A6A6',
  },
});

export default FlightTicket;
