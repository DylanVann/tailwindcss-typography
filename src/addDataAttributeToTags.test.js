const addDataAttributeToTags = require('./addDataAttributeToTags')

it('should add data attribute to tags', async () => {
  expect(addDataAttributeToTags('prose', 'ul > li::before')).toMatchInlineSnapshot(
    `"ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before"`
  )

  expect(addDataAttributeToTags('prose', '.sm:prose ul > li::before')).toMatchInlineSnapshot(
    `".sm:prose ul[data-prose=\\"true\\"] > li[data-prose=\\"true\\"]::before"`
  )
})
