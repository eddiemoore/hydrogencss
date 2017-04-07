const getValues = require('../build').getValues

describe('getValues', () => {
  it('should convert auto | none | enabled | disabled', () => {
    const actual = getValues('auto | none | enabled | disabled')
    const expected = ['auto', 'none', 'enabled', 'disabled']
    expect(actual).toEqual(expected)
  })

  it('should convert &lt;length&gt; | auto', () => {
    const actual = getValues('&lt;length&gt; | auto')
    const expected = ['auto']
    expect(actual).toEqual(expected)
  })

  it('should handle #', () => {
    const actual = getValues('[ &lt;geometry-box&gt; | no-clip ]#')
    const expected = [['no-clip']]
    expect(actual).toEqual(expected)
  })

  it('should handle {1,4}', () => {
    const actual = getValues('[ &lt;length&gt; | &lt;percentage&gt; | auto ]{1,4}')
    const expected = [['auto']]
    expect(actual).toEqual(expected)
  })

  it('should handle +', () => {
    const actual = getValues('&lt;track-size&gt;+')
    const expected = []
    expect(actual).toEqual(expected)
  })

  it('should handle *', () => {
    const actual = getValues('[ &lt;color&gt; ]* &lt;color&gt; | none')
    const expected = ['none']
    expect(actual).toEqual(expected)
  })

  it('should handle ?', () => {
    const actual = getValues('[ above | below | right | left ]? &lt;length&gt;? &lt;image&gt;?')
    const expected = [['above', 'below', 'right', 'left']]
    expect(actual).toEqual(expected)
  })

  it('should handle /', () => {
    const actual = getValues('[ &lt;image&gt; , ]* [ normal | none | &lt;content-list&gt; ] [/ &lt;string&gt; ]?')
    const expected = [['normal', 'none']]
    expect(actual).toEqual(expected)
  })

  it('should handle !', () => {
    const actual = getValues("[ &lt;'offset-position'&gt;? [ &lt;'offset-path'&gt; [ &lt;'offset-distance'&gt; || &lt;'offset-rotate'&gt; ]? ]? ]! [ / &lt;'offset-anchor'&gt; ]?")
    const expected = []
    expect(actual).toEqual(expected)
  })
})
