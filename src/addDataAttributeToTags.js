const parser = require('postcss-selector-parser')
const tap = require('lodash/tap')

const addDataAttributeToTags = (attribute, selector) => {
  return parser((selectors) => {
      selectors.walkTags((tagSelector) => {
        tap(tagSelector.value, (tag) => {
          tagSelector.value = `${tag}[data-${attribute}="true"]`
        })
      })
    }).processSync(selector)
}

module.exports = addDataAttributeToTags
