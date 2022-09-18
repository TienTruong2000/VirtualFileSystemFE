export const commandDictionary = {
  'ls': {
    description: "123",
    options: [],
    arguments: [{
      name: 'path',
      description: '1231231231',
      isMultiple: false,
    }]
  },
  cr: {
    description: "123",
    options: [{
      value: "p",
    }],
    arguments: [{
      name: 'path',
      description: '1231231231',
      isMultiple: false,
    }, {
      name: 'data',
      description: '1231231231',
      isMultiple: false,
    }]
  },
}

export const supportedCommand = {
  ls: 'ls',
  cr: 'cr',
  cat: 'cat',
  mv: 'mv',
  rm: 'rm'
}

