import React, { memo } from 'react'
import { Switch } from '@react-native-material/core'
import { THEME } from '../theme'

interface ISwitcherComponent {
  value: boolean
  onValueChange: () => void
}

const SwitcherComponent = ({ value, onValueChange }: ISwitcherComponent) => (
  <Switch
    trackColor={{ false: THEME.secondary, true: THEME.primary }}
    value={value}
    onValueChange={onValueChange}
  />
)

export default memo(SwitcherComponent)
