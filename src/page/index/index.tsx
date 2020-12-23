/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react'
import {fetchdata} from './service'



const Index: React.FC<{}> = () =>{

  const way = () => {
    // const obj={aa:"111",bb:"2222"
    return (<div></div>)
  }

  const click = () =>{
    return fetchdata({
      act_token: "aaaaaaaaaaaaaa"
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: { code: number; message: any }) => {
        console.log(res)
        if (res.code === 200) {
          console.log('调取接口成功')
          // setShowdata(res.message)
          // setshowPopup(true)
        } else {
          console.log('调取接口成功')
          // Toster.error({ content: res.message, duration: 2, key: '' })
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.log(error)
      })
  }

  return (
  <div >{way()}aaaa
    <div onClick={click}>bbbbb</div>
  </div>
  )
}

export default Index