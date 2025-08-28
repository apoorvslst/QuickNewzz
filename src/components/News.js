import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    category: 'general'
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    setProgress: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      Loading: false,
      totalResults: 0,
      error: null
    }
  }

  getNewsFromAPI = async (country, category, pageNo, pageSize = 20) => {
    const API_KEY = "4ae62c67a7b5420382f9245f1b1cd3b3"; 
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}&page=${pageNo}&pageSize=${pageSize}`;
    let response = await fetch(url);
    return await response.json();
  };

  async componentDidMount() {
    await this.fetchNews(1);
  }

  fetchNews = async (pageNo) => {
  try {
    this.props.setProgress(10);
    this.setState({ Loading: true, error: null });

    let parseddata = await this.getNewsFromAPI(
      this.props.country,
      this.props.category,
      pageNo
    );

    this.props.setProgress(60);

    // Check API response
    if (!parseddata || parseddata.status !== "ok") {
      this.setState({ 
        error: parseddata?.message || "Something went wrong", 
        articles: [], 
        Loading: false 
      });
      this.props.setProgress(100);
      return; // stop here
    }

    this.setState({
      page: pageNo,
      articles: parseddata.articles || [],
      totalResults: parseddata.totalResults || 0,
      Loading: false
    });

    this.props.setProgress(100);
  } catch (err) {
    this.setState({ error: "Failed to fetch news.", Loading: false });
    this.props.setProgress(100);
  }
};


  handlenext = async () => {
    await this.fetchNews(this.state.page + 1);
  };

  handleprev = async () => {
    await this.fetchNews(this.state.page - 1);
  };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>News-Monkey Top Headlines</h2>

        {this.state.Loading && <Loading />}

        {this.state.error && (
          <div className="alert alert-danger text-center">{this.state.error}</div>
        )}

        <div className="row">
          {this.state.articles && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsitem
                title={!element.title ? "" : element.title.slice(0, 45) + "..."}
                description={!element.description ? "" : element.description.slice(0, 88) + "..."}
                imageurl={element.urlToImage}
                newsurl={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className='btn btn-dark'
            onClick={this.handleprev}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)}
            type="button"
            className='btn btn-dark'
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    )
  }
}
