import { after, beforeEach, test } from "node:test"
import assert from "node:assert/strict"
import { authService } from "../src/features/auth/services/auth-service"

class MemoryStorage implements Storage {
  private values = new Map<string, string>()
  get length() {
    return this.values.size
  }
  clear() {
    this.values.clear()
  }
  getItem(key: string) {
    return this.values.get(key) ?? null
  }
  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null
  }
  removeItem(key: string) {
    this.values.delete(key)
  }
  setItem(key: string, value: string) {
    this.values.set(key, value)
  }
}

const storage = new MemoryStorage()
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window")
Object.defineProperty(globalThis, "window", {
  configurable: true,
  value: { localStorage: storage, setTimeout },
})
beforeEach(() => storage.clear())
after(() => {
  if (originalWindow)
    Object.defineProperty(globalThis, "window", originalWindow)
  else Reflect.deleteProperty(globalThis, "window")
})

test("arbitrary nonempty demo credentials create a session without saving credentials", async () => {
  await authService.loginWithPassword({
    username: "someone-unregistered",
    password: "x",
  })
  const session = await authService.getSession()
  assert.equal(session.authenticated, true)
  const persisted = storage.getItem("app.session")
  assert.ok(persisted)
  assert.equal(persisted.includes("someone-unregistered"), false)
  assert.equal(persisted.includes('"password"'), false)
})

test("empty credentials leave the demo signed out", async () => {
  await assert.rejects(
    authService.loginWithPassword({ username: "", password: "x" })
  )
  assert.equal((await authService.getSession()).authenticated, false)
})

test("Google demo entry creates a persistent session and sign-out clears it", async () => {
  await authService.loginWithGoogle()
  assert.equal((await authService.getSession()).authenticated, true)
  assert.ok(storage.getItem("app.session"))
  await authService.logout()
  assert.equal((await authService.getSession()).authenticated, false)
  assert.equal(storage.getItem("app.session"), null)
})

test("invalid stored session data is discarded", async () => {
  for (const invalid of ["not json", '{"name":"Incomplete profile"}']) {
    storage.setItem("app.session", invalid)
    assert.equal((await authService.getSession()).authenticated, false)
    assert.equal(storage.getItem("app.session"), null)
  }
})
