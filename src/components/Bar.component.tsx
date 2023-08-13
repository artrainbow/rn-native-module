import React from 'react'
import { Text, Pressable } from '@react-native-material/core'
import { Flex } from 'react-native-flex-layout'
import { SafeAreaView } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { THEME } from '../theme'

const BarComponent = ({ auth, signOut, signIn }) => {
  return (
    <SafeAreaView>
      <Flex
        justify="end"
        items="center"
        direction="row"
        style={{
          backgroundColor: THEME.primary,
          height: 50,
          paddingRight: 16,
        }}>
        {auth ? (
          <Pressable onPress={signOut}>
            <Flex direction="row" items="center">
              <Icon
                name="account"
                color="white"
                size={18}
                style={{ paddingRight: 4 }}
              />
              <Text color="white">Sign out</Text>
            </Flex>
          </Pressable>
        ) : (
          <Pressable onPress={signIn}>
            <Flex direction="row" items="center">
              <Text color="white">Sign in</Text>
            </Flex>
          </Pressable>
        )}
      </Flex>
    </SafeAreaView>
  )
}

export default BarComponent
