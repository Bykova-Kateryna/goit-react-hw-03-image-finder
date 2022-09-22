import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';
import { SearchbarContainer, SearchbarForm, SearchbarFormBtn, SearchbarFormBtnImg, SearchbarInput } from './Searchbar.styled'


export class Searchbar extends Component {
  state = {
    search: "",
  }

  handleChange = event => {
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }

  handleSubmitSearchInfo = (event) => {
    event.preventDefault();
    if(this.state.search.trim() === ""){
      Notify.failure('Please enter the search field');
      return
    }
    this.props.onSubmit(this.state.search)
    this.setState({search: ""})
  }

  render(){
    return (
      <SearchbarContainer>
      <SearchbarForm onSubmit={this.handleSubmitSearchInfo}>
        <SearchbarFormBtn type="submit">
          <SearchbarFormBtnImg>Search</SearchbarFormBtnImg>
        </SearchbarFormBtn>
    
        <SearchbarInput
          type="text"
          name="search"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleChange}
        />
      </SearchbarForm>
    </SearchbarContainer>
    );
  }
};

