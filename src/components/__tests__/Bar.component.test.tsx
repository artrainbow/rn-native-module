// @ts-nocheck @ts-ignore
import { render, fireEvent } from '@testing-library/react-native'
import BarComponent from '../Bar.component'
import COPY from '../../copy'

describe('BarComponent', () => {
  const signOutMock = jest.fn()
  const signInMock = jest.fn()

  it('renders sign-in button when not authenticated', () => {
    const { getByText } = render(
      <BarComponent auth={false} signIn={signInMock} signOut={signOutMock} />,
    )
    const signInButton = getByText(COPY.bar.sign_in)
    expect(signInButton).toBeTruthy()
  })

  it('renders sign-out button when authenticated', () => {
    const { getByText } = render(
      <BarComponent auth={true} signIn={signInMock} signOut={signOutMock} />,
    )
    const signOutButton = getByText(COPY.bar.sign_out)
    expect(signOutButton).toBeTruthy()
  })

  it('calls sign-in function when sign-in button is clicked', () => {
    const { getByText } = render(
      <BarComponent auth={false} signIn={signInMock} signOut={signOutMock} />,
    )
    const signInButton = getByText(COPY.bar.sign_in)
    fireEvent.press(signInButton)
    expect(signInMock).toHaveBeenCalled()
  })

  it('calls sign-out function when sign-out button is clicked', () => {
    const { getByText } = render(
      <BarComponent auth={true} signIn={signInMock} signOut={signOutMock} />,
    )
    const signOutButton = getByText(COPY.bar.sign_out)
    fireEvent.press(signOutButton)
    expect(signOutMock).toHaveBeenCalled()
  })
})
