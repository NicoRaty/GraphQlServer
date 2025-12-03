import test from 'node:test'
import assert from 'node:assert/strict'
import { resolvers } from '../resolvers.js'
import { getUsers, getUserById } from '../databases/db.js'

test('deleteData removes a user and returns deleted record', () => {
  const before = getUsers().length

  const deleted = resolvers.Mutation.deleteData(null, { id: 1 })

  assert.equal(deleted.id, 1)

  const after = getUsers().length
  assert.equal(after, before - 1)
  assert.equal(getUserById(1), undefined)
})

test('deleteData throws when user does not exist', () => {
  assert.throws(
    () => resolvers.Mutation.deleteData(null, { id: 999 }),
    /Record not found/
  )
})
