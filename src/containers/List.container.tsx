import React, { useState, useEffect, memo } from 'react'
import { ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { Stack, Button, useBoolean } from '@react-native-material/core'
import { Spacer, Flex } from 'react-native-flex-layout'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { SPACE, THEME } from '../theme'
import SwitcherComponent from '../components/Switcher.component'
import ItemComponent, { TodoItem } from '../components/Item.component'
import COPY from '../copy'

interface IListContainer {
  auth: boolean
}

const ListContainer = ({ auth }: IListContainer) => {
  const [data, setData] = useState<TodoItem[] | null>(null)
  const [enabled, setEnabled] = useBoolean()
  const isEnabled = auth && enabled

  const addItem = () => {
    setData(prev => (prev ? [...prev, { uuid: uuid.v4() as string }] : null))
  }

  const deleteItem = (uuid: string) => {
    setData(prev => (prev ? prev.filter(item => item.uuid !== uuid) : null))
  }

  const onChangeText = (content: string, uuid: string) => {
    setData(prev =>
      prev
        ? prev.map(item =>
            item.uuid === uuid ? { ...item, content: content } : item,
          )
        : null,
    )
  }

  /**
   * Persist data to Async storage each time if data is changed
   */
  useEffect(() => {
    if (data) {
      void AsyncStorage.setItem('list', JSON.stringify(data))
    }
  }, [data])

  /**
   * Get persisted initial data from Async storage
   */
  useEffect(() => {
    void AsyncStorage.getItem('list').then(list => {
      if (list) {
        setData(JSON.parse(list))
      }
    })
  }, [])

  return (
    <>
      <ScrollView
        contentContainerStyle={{ margin: SPACE }}
        keyboardShouldPersistTaps="handled">
        <Flex justify="end" items="center" direction="row">
          <SwitcherComponent
            value={isEnabled}
            onValueChange={
              auth
                ? setEnabled.toggle
                : () => Alert.alert(COPY.list.please_sign_in)
            }
          />
        </Flex>
        <Spacer style={{ height: SPACE * 2 }} />
        <Stack fill spacing={2}>
          {data?.map(item => (
            <ItemComponent
              key={item.uuid}
              item={item}
              editable={isEnabled}
              onChangeText={onChangeText}
              deleteItem={deleteItem}
            />
          ))}
        </Stack>
        <Spacer style={{ height: SPACE }} />
        <Stack center spacing={2}>
          <Button
            onPress={addItem}
            color={THEME.primary}
            title={COPY.list.add_item}
            uppercase={false}
            disabled={!isEnabled}
            titleStyle={{ color: isEnabled ? THEME.white : THEME.secondary }}
            leading={props => (
              <Icon
                name="plus"
                {...props}
                color={isEnabled ? THEME.white : THEME.secondary}
              />
            )}
          />
        </Stack>
        <Spacer style={{ height: SPACE * 5 }} />
      </ScrollView>
    </>
  )
}

export default memo(ListContainer)
