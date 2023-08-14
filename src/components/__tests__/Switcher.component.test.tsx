// @ts-nocheck @ts-ignore
import React from 'react'
import { render, fireEvent, act } from '@testing-library/react-native'
import SwitcherComponent from '../Switcher.component'

describe('SwitcherComponent', () => {
  const onValueChangeMock = jest.fn()

  it('renders correctly', () => {
    const { getByTestId } = render(
      <SwitcherComponent value={true} onValueChange={onValueChangeMock} />,
    )
    const switchElement = getByTestId('switcher')
    expect(switchElement).toBeTruthy()
  })

  it('calls onValueChange function when switch is toggled', () => {
    const { getByTestId } = render(
      <SwitcherComponent value={true} onValueChange={onValueChangeMock} />,
    )
    const switchElement = getByTestId('switcher')
    act(() => {
      fireEvent(switchElement, 'valueChange', true)
      expect(onValueChangeMock).toHaveBeenCalledTimes(1)
    })
  })
})
