// @ts-nocheck @ts-ignore
describe('BarComponent interactions', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should sign in and sign out', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible()
    await element(by.text('Sign In')).tap()
    await expect(element(by.text('Sign Out'))).toBeVisible()
    await element(by.text('Sign Out')).tap()
    await expect(element(by.text('Sign In'))).toBeVisible()
  })
})
