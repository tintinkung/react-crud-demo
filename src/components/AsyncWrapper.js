import React, { Suspense } from "react"
import Loader from "./LoadingSvg"

const AsyncWrapper = ({ children }) => {
  return (
    <Suspense fallback={<Loader />}>{children}</Suspense>
  )
}

export default AsyncWrapper