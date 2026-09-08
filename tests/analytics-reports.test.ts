import { test } from "node:test"
import assert from "node:assert/strict"
import {
  getReportRows,
  isReportKind,
} from "../src/features/analytics/data/reports"

test("unknown or inherited route names cannot resolve to analytics reports", () => {
  for (const key of [undefined, "missing", "constructor", "__proto__"])
    assert.equal(isReportKind(key), false)
  assert.equal(isReportKind("onboarding"), true)
})

test("shortening a report period preserves the latest month and does not mutate the full series", () => {
  const full = getReportRows("users", 6)
  const recent = getReportRows("users", 3)
  assert.equal(recent[0]?.month, "Jun")
  assert.deepEqual(recent.at(-1), full.at(-1))
  assert.equal(full.length, 6)
  assert.deepEqual(getReportRows("users", 6), full)
})
