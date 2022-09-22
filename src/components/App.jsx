import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { AppSection } from './App.styled'
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem'
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button'

const API_KEY = "29159880-83bd8f09217c4813e14c9607d";
const PER_PAGE = 12;
const URL = "https://pixabay.com/api/";
let page = 0;

export class App extends Component {
  state = {
    search: "",
    items: null,
    loading: false,
  }

  handleSubmit = (info) => {
    this.setState({search: info})
  }
  handleRequest = () => {
    page +=1;
    fetch(`${URL}?q=${this.state.search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`)
      .then(response => response.json())
      .then(items => this.setState({items}))
      .finally(()=>{this.setState({loading: false})})

  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.search !== this.state.search){
      this.setState({loading: true})
      this.handleRequest()
    }
  }

  render(){
  return (
<AppSection>
<GlobalStyle />
<Searchbar onSubmit={this.handleSubmit}/>
{this.state.loading && <Loader/>}
<ImageGallery>
<ImageGalleryItem array={this.state.items}/>
</ImageGallery>
{this.state.items && <Button loadeMore={()=>{this.handleRequest()}}/>}
</AppSection>
  );}
};
