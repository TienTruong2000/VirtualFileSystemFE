import { parseCommand } from "../services/commandService";

const compareArray = (array1, array2) => {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index])
}

describe('Test parse cr command', () => {
  test('cr /new', () => {
    const command = 'cr /new';
    const expected = ["cr", "/new"]
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr /new file', () => {
    const command = 'cr /new file';
    const expected = ["cr", "/new", "file"]
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr "/new file"', () => {
    const command = 'cr "/new file"';
    const expected = ["cr", "/new file"]
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr /new file', () => {
    const command = 'cr /new file';
    const expected = ["cr", "/new", "file"]
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr /new file content', () => {
    const command = 'cr /new file content';
    const expected = ["cr", "/new", "file", "content"]
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr /new "file content"', () => {
    const command = 'cr /new "file content"';
    const expected = ["cr", "/new", "file content"]
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr /new/file', () => {
    const command = 'cr /new/file';
    const expected = ["cr", "/new/file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr /new /file/file', () => {
    const command = 'cr /new file/file';
    const expected = ["cr", "/new", "file/file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cr "/new /file/file"', () => {
    const command = 'cr "/new file/file"';
    const expected = ["cr", "/new file/file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
});

describe('Test parse cat command', () => {
  test('cat /new', () => {
    const command = 'cat /new';
    const expected = ["cat", "/new"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
    test('cat /new file', () => {
    const command = 'cat /new file';
    const expected = ["cat", "/new", "file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cat "/new file"', () => {
    const command = 'cat "/new file"';
    const expected = ["cat", "/new file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('cat /new file/file', () => {
    const command = 'cat /new file/file';
    const expected = ["cat", "/new", "file/file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
});

describe('Test parse ls command', () => {
  test('ls /new', () => {
    const command = 'ls /new';
    const expected = ["ls", "/new"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('ls /new file', () => {
    const command = 'ls /new file';
    const expected = ["ls", "/new", "file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('ls "/new file"', () => {
    const command = 'ls "/new file"';
    const expected = ["ls", "/new file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('ls /new file/file', () => {
    const command = 'ls /new file/file';
    const expected = ["ls", "/new", "file/file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
});

describe('Test parse mv command', () => {
  test('mv /source /dest', () => {
    const command = 'mv /source /dest';
    const expected = ["mv", "/source", "/dest"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('mv /source file /dest', () => {
    const command = 'mv /source file /dest';
    const expected = ["mv", "/source", "file", "/dest"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('mv "/source file" /dest', () => {
    const command = 'mv "/source file" /dest';
    const expected = ["mv", "/source file", "/dest"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('mv "/source file /file" /dest', () => {
    const command = 'mv "/source file /file" /dest';
    const expected = ["mv", "/source file /file", "/dest"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
});

describe('Test parse mv command', () => {
  test('rm /path1 /path2', () => {
    const command = 'rm /path1 /path2';
    const expected = ["rm", "/path1", "/path2"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('rm "/path1 file" /path2', () => {
    const command = 'rm "/path1 file" /path2';
    const expected = ["rm", "/path1 file", "/path2"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
  test('rm "/path1 file/ path2 file"', () => {
    const command = 'rm "/path1 file/ path2 file"';
    const expected = ["rm", "/path1 file/ path2 file"];
    const actual = parseCommand(command);
    expect(compareArray(expected, actual)).toBe(true)
  });
});