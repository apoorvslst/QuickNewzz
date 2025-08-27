import React, { Component,useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import sampleop from './sampleop.json'
import Loading from './Loading';
import PropTypes from 'prop-types'
export default class News extends Component {
  static defaultProps={
    country:'us',
    category:'general'
  };
  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string
  };
    constructor(){
      super();
      this.state={
        articles:[],
        page:1,
        Loading:false,
        totalResults:0
      }
    }

  async componentDidMount(){
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ae62c67a7b5420382f9245f1b1cd3b3&page=1&pageSize=20`;
    this.setState({Loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parseddata=await data.json();
    this.props.setProgress(50);
    this.setState({articles:parseddata.articles,totalResults: parseddata.totalResults,Loading:false});
    this.props.setProgress(100);
  }
  handlenext= async ()=>{
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ae62c67a7b5420382f9245f1b1cd3b3&page=${this.state.page +1}&pageSize=20`;
    this.setState({Loading:true});
    let data=await fetch(url);
    this.props.setProgress(30);
    let parseddata=await data.json();
    this.props.setProgress(65);
    this.setState({
      page:this.state.page+1,
      articles:parseddata.articles,
      totalResults: parseddata.totalResults,
      Loading:false
    })
    this.props.setProgress(100);
  }
  handleprev= async ()=>{
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4ae62c67a7b5420382f9245f1b1cd3b3&page=${this.state.page -1}&pageSize=20`;
    let data=await fetch(url);
    this.props.setProgress(30);
    let parseddata=await data.json();
    this.props.setProgress(65);
    this.setState({
      page:this.state.page-1,
      articles:parseddata.articles,totalResults: parseddata.totalResults
    })
    this.props.setProgress(100);
  }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>News-Monkey Top Headlines</h2>
        {this.state.Loading && <Loading/>}
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <Newsitem title={!element.title?"":element.title.slice(0,45)+"..."} description={!element.description?"":element.description.slice(0,88)+"..."} 
                imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
})}
           
        </div>
        <div className="container d-flex justify-content-between">
  <button disabled={this.state.page<=1} type="button" className='btn btn-dark' onClick={this.handleprev}>&larr; Previous</button>
  <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} type="button" className='btn btn-dark' onClick={this.handlenext}>Next &rarr;</button>
</div>
      </div>
    )
  }
}
