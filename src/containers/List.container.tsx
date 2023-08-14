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
    setData(prev => {
      const itemUuid = uuid.v4() as string
      return prev ? [...prev, { uuid: itemUuid }] : [{ uuid: itemUuid }]
    })
  }

  const deleteItem = (itemUuid: string) => {
    setData(prev => (prev ? prev.filter(item => item.uuid !== itemUuid) : null))
  }

  const onChangeText = (content: string, itemUuid: string) => {
    setData(prev =>
      prev
        ? prev.map(item =>
            item.uuid === itemUuid ? { ...item, content: content } : item,
          )
        : null,
    )
  }

  const onValueChange = auth
    ? setEnabled.toggle
    : () => Alert.alert(COPY.list.please_sign_in)

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
        setData(JSON.parse(list) as TodoItem[])
      }
    })
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{ margin: SPACE }}
      keyboardShouldPersistTaps="handled">
      <Flex justify="end" items="center" direction="row">
        <SwitcherComponent value={isEnabled} onValueChange={onValueChange} />
      </Flex>
      <Spacer style={{ height: SPACE * 2 }} />
      {data?.length ? (
        <Stack fill spacing={2}>
          {data.map(item => (
            <ItemComponent
              key={item.uuid}
              item={item}
              editable={isEnabled}
              onChangeText={onChangeText}
              deleteItem={deleteItem}
            />
          ))}
        </Stack>
      ) : null}
      <Spacer style={{ height: SPACE }} />
      <Stack center spacing={2}>
        <Button
          testID="add-item"
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
  )
}

export default memo(ListContainer)
