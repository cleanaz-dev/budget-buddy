import React from 'react'
import Topnav from "../../components/Topnav"

export default function layout({ children }) {
  return (
    <>
    <Topnav />
      {children}
    </>
  )
}
