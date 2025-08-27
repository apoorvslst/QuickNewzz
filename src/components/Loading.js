import React, { Component } from 'react'
import loadingif from './loading.gif'
export default class Loading extends Component {
  render() {
    return (
      <div>
        <div className='text-center'>
        <img src={loadingif}></img>
      </div>
      </div>
    )
  }
}
