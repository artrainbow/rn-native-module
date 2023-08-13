import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import {
  Stack,
  TextInput,
  IconButton,
  Button,
  Switch,
  useBoolean,
} from '@react-native-material/core'
import { Spacer, Flex } from 'react-native-flex-layout'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { THEME } from '../theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

interface IListContainer {
  auth: boolean
}

const ListContainer = ({ auth }: IListContainer) => {
  const [data, setData] = useState(null)
  const [enabled, setEnabled] = useBoolean()
  const isEnabled = auth && enabled

  const addItem = index => {
    setData(prev => {
      return prev?.length
        ? [...prev, { index, uuid: uuid.v4() }]
        : [{ index, uuid: uuid.v4() }]
    })
  }

  const deleteItem = index => {
    console.log('index', index)
    // data.splice(index, 1)
    setData(prev => {
      const res = prev?.filter((p, i) => i !== index)

      console.log('res', res)

      return res
    })

    // console.log('deleteItem', res)
  }

  const onChangeText = (inputValue, uuid) => {
    console.log('inputValue, uuid', inputValue, uuid)
    setData(prev => {
      const res = prev?.map(item => {
        if (item.uuid === uuid) {
          return { ...item, content: inputValue }
        }

        return item
      })

      console.log('res', res)

      return res
    })
    console.log('inputValue', inputValue)
  }

  const onInputBlur = e => {
    console.log('onInputBlur!!!!', e)
  }

  useEffect(() => {
    if (data) {
      console.log('PERSIST', data)
      void AsyncStorage.setItem('list', JSON.stringify(data))
    }
  }, [data])

  useEffect(() => {
    void AsyncStorage.getItem('list').then(list => {
      if (list) {
        setData(JSON.parse(list))
      }
    })
  }, [])

  console.log('data', data)

  return (
    <>
      <ScrollView
        contentContainerStyle={{ margin: 16 }}
        keyboardShouldPersistTaps="handled">
        <Flex justify="end" items="center" direction="row">
          <Switch
            trackColor={{ false: THEME.secondary, true: THEME.primary }}
            value={isEnabled}
            onValueChange={setEnabled.toggle}
          />
        </Flex>
        <Spacer style={{ height: 32 }} />
        <Stack fill spacing={2}>
          {data?.map((item, index) => {
            return (
              <Flex
                justify="between"
                fill
                items="center"
                direction="row"
                key={String(index)}>
                <TextInput
                  value={item.content}
                  style={{ flex: 1 }}
                  variant="standard"
                  color={THEME.primary}
                  editable={isEnabled}
                  onBlur={onInputBlur}
                  onChangeText={value => onChangeText(value, item.uuid)}
                />
                <IconButton
                  onPress={() => deleteItem(index)}
                  color={isEnabled ? THEME.primary : THEME.secondary}
                  disabled={!isEnabled}
                  icon={props => <Icon name="delete" {...props} />}
                />
              </Flex>
            )
          })}
        </Stack>
        <Spacer style={{ height: 16 }} />
        <Stack center spacing={2}>
          <Button
            onPress={() => addItem(data?.length)}
            color={THEME.primary}
            title="Add item"
            uppercase={false}
            disabled={!isEnabled}
            titleStyle={{ color: isEnabled ? 'white' : THEME.secondary }}
            leading={props => (
              <Icon
                name="plus"
                {...props}
                color={isEnabled ? 'white' : THEME.secondary}
              />
            )}
          />
        </Stack>
        <Spacer style={{ height: 100 }} />
      </ScrollView>
    </>
  )
}

export default ListContainer
