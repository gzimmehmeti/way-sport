import React from 'react'
import { Link } from 'react-router-dom'
type Props = {
    children:React.ReactNode
}

const Page = (props: Props) => {
  return (
    <div className='flex flex-col'>
        <div className='flex gap-4'>
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
        </div>
        <div>
            {props.children}
        </div>
    </div>
  )
}

export default Page