import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { AppSection } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Report } from 'notiflix/build/notiflix-report-aio';

const API_KEY = '29159880-83bd8f09217c4813e14c9607d';
const PER_PAGE = 12;
const URL = 'https://pixabay.com/api/';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    modalShow: false,
    modalImg: null,
    loadeMore: false,
    page: 1,
    totalResult: 0,
  };

  showModal = img => {
    this.setState({ modalShow: true, modalImg: img });
  };

  closeModal = () => {
    this.setState({ modalShow: false, modalImg: null });
  };

  handleSubmit = info => {
    if (info === this.state.search) {
      Report.info('FINDER INFO', 'Please enter a new request.', 'Okay');
      return;
    } else {
      this.setState({ search: info, page: 1, items: [] });
    }
  };

  handleRequest = () => {
    fetch(
      `${URL}?q=${this.state.search}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    )
      .then(response => response.json())
      .then(items => {
        if (items.total === 0) {
          Report.info(
            'FINDER INFO',
            'Sorry, but nothing was found for your query.',
            'Okay &#9785;'
          );
        } else if (items.total <= PER_PAGE) {
          this.setState({ items: items.hits });
        } else {
          this.setState(prevState => {
            return {
              items: [...prevState.items, ...items.hits],
              loadeMore: true,
              totalResult: items.total,
            };
          });
          if (
            items.hits.length < 12 ||
            this.state.totalResult / this.state.page === PER_PAGE
          ) {
            this.setState({ loadeMore: false });
          }
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  hendleLoadeMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setState({ loading: true });
      this.handleRequest();
      if (this.state.totalResult / this.state.page === PER_PAGE) {
        return this.setState({ loadeMore: false });
      }
    }
  }

  render() {
    return (
      <AppSection>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleSubmit} />

        <ImageGallery>
          {this.state.items.map(item => {
            return (
              <ImageGalleryItem
                id={item.id}
                imageItem={item.webformatURL}
                description={item.tags}
                openModal={this.showModal}
                modalImage={item.largeImageURL}
                key={item.id}
              />
            );
          })}
        </ImageGallery>
        {this.state.loading && <Loader />}
        {this.state.loadeMore && (
          <Button
            loadeMore={() => {
              this.hendleLoadeMore();
            }}
          />
        )}
        {this.state.modalShow && (
          <Modal onClose={this.closeModal}>
            {<img src={this.state.modalImg} alt={this.state.search} />}
          </Modal>
        )}
      </AppSection>
    );
  }
}
