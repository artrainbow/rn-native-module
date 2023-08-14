import React, { FC, useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import { RootSiblingParent } from 'react-native-root-siblings'
import Toast from 'react-native-root-toast'
import BarComponent from './components/Bar.component'
import ListContainer from './containers/List.container'
import { SPACE, THEME } from './theme'
import COPY from './copy'

export const App: FC = () => {
  const [auth, setAuth] = useState(false)

  const signOut = async () => {
    await AsyncStorage.setItem('auth', '0')
    setAuth(false)
  }

  const signIn = useCallback(async () => {
    if (!auth) {
      const authenticate = async () => LocalAuthentication.authenticateAsync()
      await authenticate().then(async result => {
        if (result.success) {
          await AsyncStorage.setItem('auth', '1')
          setAuth(true)
          Toast.show(COPY.app.login_successful, {
            duration: Toast.durations.SHORT,
            position: SPACE * 5,
            backgroundColor: THEME.success,
            opacity: 1,
            shadowColor: THEME.secondary,
          })
        } else {
          await signOut()
        }
      })
    }
  }, [auth])

  useEffect(() => {
    const getAuthItem = async () => AsyncStorage.getItem('auth')
    void getAuthItem().then(result => {
      setAuth(Boolean(Number(result)))
    })
  }, [])

  return (
    <RootSiblingParent>
      <BarComponent auth={auth} signOut={signOut} signIn={signIn} />
      <ListContainer auth={auth} />
      {/*<Toast visible={auth}>Thanks for subscribing!</Toast>*/}
    </RootSiblingParent>
  )
}

export default App
