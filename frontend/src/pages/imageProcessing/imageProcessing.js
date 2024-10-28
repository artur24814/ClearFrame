import React from 'react'
import WithAuth from '../../components/hoc/withAuth.js'
import ImageComponent from './components/imageComponent.js'

const ImageProcessing = () => {
  return <ImageComponent />
}

export default WithAuth(ImageProcessing)