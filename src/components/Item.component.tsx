import React, { memo } from 'react'
import { IconButton, TextInput } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Flex } from 'react-native-flex-layout'
import { THEME } from '../theme'

export type TodoItem = {
  uuid: string
  content?: string
}

interface IItemComponent {
  item: TodoItem
  editable: boolean
  onChangeText: (value: string, uuid: string) => void
  deleteItem: (i: string) => void
}

const ItemComponent = ({
  item,
  editable,
  onChangeText,
  deleteItem,
}: IItemComponent) => (
  <Flex fill justify="between" items="center" direction="row">
    <TextInput
      testID="input"
      value={item.content}
      style={{ flex: 1 }}
      variant="standard"
      color={THEME.primary}
      editable={editable}
      onChangeText={value => onChangeText(value, item.uuid)}
    />
    <IconButton
      testID="delete-button"
      onPress={() => deleteItem(item.uuid)}
      color={editable ? THEME.primary : THEME.secondary}
      disabled={!editable}
      icon={props => <Icon name="delete" {...props} />}
    />
  </Flex>
)

export default memo(ItemComponent)
