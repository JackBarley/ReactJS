import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyCvfzSeQjW5TdCLvRTq4DM4WRW0z0R4aUg';

// Create a new component.
// This component should produce some HTML
class App extends Component {
  // when render, the constructor function is kicked off
  // and Create an empty array videos
  // and search the term, update the array videos with new state
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.VideoSearch('surfboards');
  }

  VideoSearch(term) {
    YTSearch({key: API_KEY, term: term}, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
     });
    });
  };

  render() {
    const VideoSearch = _.debounce( (term) => {this.VideoSearch(term)}, 300 );

    return (
      <div>
        <SearchBar onSearchTermChange={VideoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos}/>
      </div>
    );
  }
}

// Take this component's generated HTML
// and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
