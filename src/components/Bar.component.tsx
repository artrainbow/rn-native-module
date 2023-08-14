import React, { memo } from 'react'
import { Text, Pressable } from '@react-native-material/core'
import { Flex } from 'react-native-flex-layout'
import { SafeAreaView } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { SPACE, THEME } from '../theme'
import COPY from '../copy'

interface IBarComponent {
  auth: boolean
  signOut: () => Promise<void>
  signIn: () => Promise<void>
}

const BarComponent = ({ auth, signOut, signIn }: IBarComponent) => (
  <SafeAreaView>
    <Flex
      justify="end"
      items="center"
      direction="row"
      style={{
        backgroundColor: THEME.primary,
        height: SPACE * 3,
        paddingRight: SPACE,
      }}>
      {auth ? (
        <Pressable onPress={() => void signOut()}>
          <Flex direction="row" items="center">
            <Icon
              name="account"
              color={THEME.white}
              size={SPACE}
              style={{ paddingRight: SPACE / 4 }}
            />
            <Text color={THEME.white}>{COPY.bar.sign_out}</Text>
          </Flex>
        </Pressable>
      ) : (
        <Pressable onPress={() => void signIn()}>
          <Flex direction="row" items="center">
            <Text color={THEME.white}>{COPY.bar.sign_in}</Text>
          </Flex>
        </Pressable>
      )}
    </Flex>
  </SafeAreaView>
)

export default memo(BarComponent)
