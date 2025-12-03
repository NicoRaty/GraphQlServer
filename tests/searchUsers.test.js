import test from 'node:test'
import assert from 'node:assert'
import { resolvers } from '../resolvers.js'

test('searchUsers finds matching users by forename', () => {
  const args = { forename: 'roy' }

  const result = resolvers.Query.searchUsers(null, args)

  assert.equal(result.length, 1)
  assert.equal(result[0].forename, 'Roy')
})

test('searchUsers returns [] when no users match', () => {
  const result = resolvers.Query.searchUsers(null, { forename: 'Nobody' })
  assert.deepEqual(result, [])
})