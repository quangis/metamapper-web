import React, { Component} from 'react';
import axios from 'axios';


class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      modalIsActive: false
    };
  }

  createNewPublisher = (url) => {
    axios.post("http://localhost:8000/publishers", {
      "access_url": url
    }).catch((e) => {
      console.log(e);
    });
  }

  toggleModal = () => {
    this.setState(prev => ({
      modalIsActive: !prev.modalIsActive
    }))
  }

  handleChange = (e) => {
    this.setState({url: e.target.value});
  }

  submitForm = (e) => {
    e.preventDefault();

    this.createNewPublisher(this.state.url);
    this.toggleModal();
  }

  render() {
    return (
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-two-thirds">
                <h1 class="title has-text-centered">
                  MetaMapper
                </h1>
                <h2 class="subtitle has-text-centered">
                  Browse existing or annotate new geospatial data sources
                </h2>
                <br></br>

                <div class="buttons is-centered">
                  <button class="button is-primary" onClick={this.toggleModal}>Add Source</button>
                </div>
              </div>
            </div>
          </div>
          <div class="is-divider"></div>
        </div>

        <div class={this.state.modalIsActive ? "modal is-active" : "modal"}>
          <div class="modal-background"></div>
          <div class="modal-content">
            <form>
              <div class="field">
                <label class="label">Access URL</label>
                <div class="control">
                  <input class="input" type="text" placeholder="https://example.com" onChange={this.handleChange}></input>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" onClick={this.submitForm}>Submit</button>
                </div>
                <div class="control">
                  <button class="button is-link is-light" onClick={this.toggleModal}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
          <button class="modal-close is-large" aria-label="close" onClick={this.toggleModal}></button>
        </div>
      </section>
    )
  }
}

export default Hero;
