export const commandDictionary = {
  cr: {
    name: 'cr',
    description: "make a new file or a new directory",
    options: [{
      value: "p",
      description: 'create the missing parent folders',
    }],
    arguments: [{
      name: 'path',
      description: 'path when create file',
      isMultiple: false,
      optional: false
    }, {
      name: 'data',
      description: "if the 'data' is specified create new file",
      isMultiple: false,
      optional: true
    }]
  },
  cat: {
    name: 'cat',
    description: "show the content of a file at 'path'",
    options: [],
    arguments: [{
      name: 'path',
      description: 'file path',
      isMultiple: false,
      optional: false
    }]
  },
  'ls': {
    name: 'ls',
    description: "list out all items directly under a directory",
    options: [],
    arguments: [{
      name: 'path',
      description: 'file path',
      isMultiple: false,
      optional: false
    }]
  },
  mv: {
    name: 'mv',
    description: "move file",
    options: [],
    arguments: [
      {
        name: 'source path',
        description: 'file or directory path that want to be moved',
        isMultiple: false,
        optional: false
      },
      {
        name: 'destination path',
        description: 'the destination path',
        isMultiple: false,
        optional: false
      }
    ]
  },
  rm: {
    name: 'rm',
    description: "remove files or directories",
    options: [],
    arguments: [
      {
        name: 'path(s)',
        description: 'directory or file path(s)',
        isMultiple: true,
        optional: false
      }
    ]
  }
}

export const supportedCommand = {
  ls: 'ls',
  cr: 'cr',
  cat: 'cat',
  mv: 'mv',
  rm: 'rm',
  help: 'help'
}

