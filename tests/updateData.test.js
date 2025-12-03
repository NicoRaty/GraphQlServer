import test from 'node:test'
import assert from 'node:assert/strict'
import { resolvers } from '../resolvers.js'
import { getUsers, getUserById } from '../databases/db.js'

test('updateData updates an existing user', () => {
  const updated = resolvers.Mutation.updateData(null, { id: 2, forename: 'Timothy' })

  assert.equal(updated.id, 2)
  assert.equal(updated.forename, 'Timothy')

  const stored = getUserById(2)
  assert.equal(stored.forename, 'Timothy')
})

test('updateData throws when user does not exist', () => {
  assert.throws(
    () => resolvers.Mutation.updateData(null, { id: 999, forename: 'X' }),
    /Record not found/
  )
})