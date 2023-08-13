import React, { FC, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BarComponent from './components/Bar.component'
import ListContainer from './containers/List.container'
import * as LocalAuthentication from 'expo-local-authentication'

export const App: FC = () => {
  const [auth, setAuth] = useState(false)

  const signOut = async () => {
    await AsyncStorage.setItem('auth', '0')
    setAuth(false)
  }

  const signIn = async () => {
    if (!auth) {
      const authenticate = async () => {
        return LocalAuthentication.authenticateAsync()
      }

      await authenticate().then(async result => {
        if (result.success) {
          await AsyncStorage.setItem('auth', '1')
          setAuth(true)
        } else {
          await signOut()
        }
      })
    }
  }

  useEffect(() => {
    const getAuthItem = async () => AsyncStorage.getItem('auth')
    void getAuthItem().then(result => {
      setAuth(Boolean(Number(result)))
    })
  }, [])

  console.log('App', auth)

  return (
    <>
      <BarComponent auth={auth} signOut={signOut} signIn={signIn} />
      <ListContainer auth={auth} />
    </>
  )
}

export default App
