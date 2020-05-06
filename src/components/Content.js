import React, { Component} from 'react';
import axios from 'axios';
import md5 from 'blueimp-md5';


class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publishers: []
    };
  }

  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    axios.get("http://localhost:8000/publishers").then((response) => {
      this.setState({
        publishers: response.data
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  handleEdit = (url) => {
    axios.get("http://localhost:8000/extract", {
      params: {
        "url": url
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  handleIngest = (url) => {
    axios.get("http://localhost:8000/ingest", {
      params: {
        "url": url
      }
    }).catch((e) => {
      console.log(e);
    });
  }


  handleAnnotate = (url) => {
    const source = md5(url)
    window.location.href = "http://localhost:3000/annotate/" + source;
  }

  handleDelete = (url) => {
    axios.delete("http://localhost:8000/publishers", {
      params: {
        "url": url
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  renderContent = (publisher) => {
    const fields = Object.entries(publisher).map(([key, value]) =>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">{key}</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input" type="text" value={value}></input>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div class="section">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              { publisher.title }
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <fieldset disabled>
                { fields }
              </fieldset>

            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" onClick={() => this.handleEdit(publisher.access_url)}>Create / Edit</a>
            <a href="#" class="card-footer-item" onClick={() => this.handleIngest(publisher.download_url)}>Ingest</a>
            <a href="#" class="card-footer-item" onClick={() => this.handleAnnotate(publisher.download_url)}>Annotate</a>
            <a href="#" class="card-footer-item" onClick={() => this.handleDelete(publisher.access_url)}>Delete</a>
          </footer>
        </div>
      </div>
    )
  }


  render() {
    return (
      <section class="content">
        <div class="columns is-centered">
          <div class="column is-two-thirds">

            { this.state.publishers.map((x) => this.renderContent(x)) }

          </div>
        </div>
      </section>
    )
  }
}

export default Content;
