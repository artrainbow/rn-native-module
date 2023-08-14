// @ts-nocheck @ts-ignore
import { render, fireEvent } from '@testing-library/react-native'
import ItemComponent from '../Item.component'

describe('ItemComponent', () => {
  jest.useFakeTimers()

  const mockItem = {
    uuid: '123',
    content: 'Test Content',
  }

  it('renders correctly', () => {
    const { getByTestId } = render(
      <ItemComponent
        item={mockItem}
        editable={true}
        onChangeText={() => {}}
        deleteItem={() => {}}
      />,
    )
    const input = getByTestId('input')
    expect(input.props.value).toBe('Test Content')
  })

  it('calls onChangeText when text input changes', () => {
    const onChangeTextMock = jest.fn()
    const { getByDisplayValue } = render(
      <ItemComponent
        item={mockItem}
        editable={true}
        onChangeText={onChangeTextMock}
        deleteItem={() => {}}
      />,
    )
    const inputElement = getByDisplayValue('Test Content')
    fireEvent.changeText(inputElement, 'Updated Content')
    expect(onChangeTextMock).toHaveBeenCalledWith('Updated Content', '123')
  })

  it('calls deleteItem when delete button is pressed', () => {
    const deleteItemMock = jest.fn()
    const { getByTestId } = render(
      <ItemComponent
        item={mockItem}
        editable={true}
        onChangeText={() => {}}
        deleteItem={deleteItemMock}
      />,
    )
    const deleteButton = getByTestId('delete-button')
    fireEvent.press(deleteButton)
    expect(deleteItemMock).toHaveBeenCalledWith('123')
  })

  it('disables delete button when not editable', () => {
    const { getByTestId } = render(
      <ItemComponent
        item={mockItem}
        editable={false}
        onChangeText={() => {}}
        deleteItem={() => {}}
      />,
    )
    const deleteButton = getByTestId('delete-button')
    expect(deleteButton.props.children.props.disabled).toBeTruthy()
  })
})
