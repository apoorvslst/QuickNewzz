import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,date}=this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: '18rem'}}>
  <img src={imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card time'><small className='text-muted'>By {author} on {date}</small></p>
    <a href={newsurl} target='_blank' className="btn btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  }
}
