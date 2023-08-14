// @ts-nocheck @ts-ignore
import COPY from '../src/copy'
import { element } from 'detox'

const delay = ms => new Promise(r => setTimeout(r, ms))

describe('App interactions (IOS)', () => {
  beforeAll(async () => {
    await device.launchApp({ permissions: { faceid: 'YES' } })
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await device.setBiometricEnrollment(true)
  })

  it('CASE 1: should sign in, switch on edit mode, add item, add some text, delete item, sign out', async () => {
    const signInElement = element(by.text(COPY.bar.sign_in))
    await expect(signInElement).toBeVisible()
    await signInElement.tap()
    await device.matchFace()
    await delay(4000)
    await expect(element(by.text(COPY.app.login_successful))).toBeVisible()
    const editModeElement = element(by.id('switcher'))
    await expect(editModeElement).toBeVisible()
    await editModeElement.tap()
    const addItemButton = element(by.id('add-item'))
    await expect(addItemButton).toBeVisible()
    await addItemButton.tap()
    const inputElement = element(by.id('input'))
    await expect(inputElement).toBeVisible()
    await inputElement.tap()
    await inputElement.typeText('New TODO item')
    const inputElementWithText = element(by.text('New TODO item'))
    await expect(inputElementWithText).toBeVisible()
    const deleteItemButton = element(by.id('delete-button'))
    await expect(deleteItemButton).toBeVisible()
    await deleteItemButton.tap()
    await expect(inputElement).not.toBeVisible()
    await expect(deleteItemButton).not.toBeVisible()
    const signOutElement = element(by.text(COPY.bar.sign_out))
    await expect(signOutElement).toBeVisible()
    await signOutElement.tap()
    await expect(signInElement).toBeVisible()
  })
})
