import { StyleSheet, View } from 'react-native'
import React from 'react'

export default function SectionSeparator() {
  return (
    <View style={styles.separator}/>
  )
}

const styles = StyleSheet.create({
    separator: {
        width: '90%',
        height: 2,
        borderColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 20,
    }
})