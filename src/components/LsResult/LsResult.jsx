import moment from "moment";
import { DATE_FORMAT, FILE_TYPE } from "../../constants/appConstants";
import React from "react";

const LsResult = ({ data }) => {
  return (
    <div>
      <pre>Size: {data.size}</pre>
      <pre>Type: {data.type}</pre>
      <table>
        <thead>
        <tr>
          <th style={{ textAlign: 'left' }}> <pre>Create at</pre></th>
          <th> <pre> Type </pre> </th>
          <th> <pre> Size </pre> </th>
          <th style={{ textAlign: 'left' }}> <pre> Name </pre> </th>
        </tr>
        </thead>
        <tbody>
        {data.children?.map(child => {
          return (
            <tr key={child.id}>
              <td>
                <pre>
                  {moment(child.createdAt).format(DATE_FORMAT)}
                </pre>
              </td>
              <td style={{ padding: '0 1rem' }}>
                {FILE_TYPE[child.type]}
              </td>
              <td style={{ padding: '0 1rem' }}>
                {child.size}
              </td>
              <td style={{ padding: '0 0 0 10px' }}>
                {child.name}
              </td>
            </tr>)
        })
        }
        </tbody>
      </table>

      <br/>
    </div>
  )
}

export default LsResult;