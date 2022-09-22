import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { AppSection } from './App.styled'
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem'
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Report } from 'notiflix/build/notiflix-report-aio';

const API_KEY = "29159880-83bd8f09217c4813e14c9607d";
const PER_PAGE = 12;
const URL = "https://pixabay.com/api/";
let page = 0;
let totalResult = 0;

export class App extends Component {
  state = {
    search: "",
    items: null,
    loading: false,
    modalShow: false,
    modalImg: null,
  }

showModal = (img) => {
this.setState({modalShow: true, modalImg: img})
}

closeModal = () => {
  this.setState({modalShow: false, modalImg: null})
  }

  handleSubmit = (info) => {
    this.setState({search: info})
  }
  handleRequest = () => {
    page +=1;
    fetch(`${URL}?q=${this.state.search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`)
      .then(response => response.json())
      .then(items => {if(items.total === 0){
        Report.info(
          'FINDER INFO',
          'Sorry, but nothing was found for your query',
          'Okay &#9785;',
          );
      } else {
        totalResult = items.total
        this.setState({items})
      }})
      .finally(()=>{this.setState({loading: false})})

  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.search !== this.state.search){
      page = 0;
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
<ImageGalleryItem array={this.state.items} openModal={this.showModal}/>
</ImageGallery>
{this.state.items && totalResult > PER_PAGE && <Button loadeMore={()=>{this.handleRequest()}}/>}
{this.state.modalShow && <Modal onClose={this.closeModal}>{<img src={this.state.modalImg} alt={this.state.search}/>}</Modal>}
</AppSection>
  );}
};
