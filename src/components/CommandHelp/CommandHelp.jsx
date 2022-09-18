import React from "react";

const CommandHelp = ({ commandDefinition }) => {
  return (<div>
    <div>
      <span style={{ color: "#7c7b18" }}><pre>Description:</pre></span>
      <pre style={{ marginLeft: '1rem' }}>{commandDefinition.description}</pre>
    </div>
    <div>
      <span style={{ color: "#7c7b18" }}><pre>Usage:</pre></span>
      <pre
        style={{ marginLeft: '1rem' }}>{commandDefinition.name} {commandDefinition.options.map(option => `[-${option.value}] `)}{commandDefinition.arguments.map(arg => `${arg.optional ? '[' : '<'}${arg.name}${arg.optional ? ']' : '>'} `)}</pre>
    </div>
    <div>
      <span style={{ color: "#7c7b18" }}><pre>Options:</pre></span>
      <table style={{ marginLeft: '1rem' }}>
        <tbody>
        {commandDefinition.options.length === 0 ?
          <pre>None</pre> : commandDefinition.options.map(option => {
            return (<tr>
              <td style={{ color: '#008424' }}>-{option.value}</td>
              <td> {option.description}</td>
            </tr>)
          })}
        </tbody>
      </table>

    </div>
    <div>
      <span style={{ color: "#7c7b18" }}><pre>Arguments:</pre></span>
      <table style={{ marginLeft: '1rem' }}>
        <tbody>
        {commandDefinition.arguments.length === 0 ?
          <pre>None</pre> : commandDefinition.arguments.map(arg => {
            return (<tr>
              <td style={{ color: '#008424' }}>
                <pre>{arg.name}</pre>
              </td>
              <td>
                <pre style={{ marginLeft: '1rem' }}>{arg.description}</pre>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  </div>)
}

export default CommandHelp;