import React, { Component} from 'react';
import axios from 'axios';


class Annotate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: null,
      concepts: [],
      data: [],
      header: {}
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    this.setState({
      source: params.sourceId
    })

    this.getData(params.sourceId);
    this.getConcepts();
  }

  getConcepts = () => {
    axios.get("http://localhost:8000/concepts").then((response) => {
      this.setState({
        concepts: response.data.map((x) => x.uri)
      })
    });
  }

  getData = (source) => {
    axios.get("http://localhost:8000/sample", {
      params: {
        "source": source
      }
    }).then((response) => {
      this.setState({
        data: response.data
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  getConceptSuggestion = (fieldName) => {
    axios.get("http://localhost:8000/suggest", {
      params: {
        "source": this.state.source,
        "field": fieldName
      }
    }).then((response) => {
      var newConcept = {}
      newConcept[fieldName] = response.data.concept;

      this.setState(prev => ({
        header: Object.assign(prev.header, newConcept)
      }));
    }).catch((e) => {
      console.log(e);
    });
  }

  handleDropdownClick = (k) => {
    var key = k + "-dropdown";
    this.setState(prev => ({
      [key] : (key in prev) ? !prev[key] : true
    }));
  }

  handleManualConcept = (field, concept) => {
    const conceptName = concept.substr(concept.lastIndexOf('/')+1);
    axios.post("http://localhost:8000/concepts", {
      "source": this.state.source,
      "field": field,
      "concept": conceptName
    }).catch((e) => {
      console.log(e);
    });
  }

  handleChange = (e) => {
    this.setState({newConcept: e.target.value});
  }

  generateNewConcept = (field) => {
    axios.post("http://localhost:8000/concepts", {
      "source": this.state.source,
      "field": field,
      "concept": this.state.newConcept
    }).catch((e) => {
      console.log(e);
    });
  }

  renderTable = () => {
    const firstRow = this.state.data[0] || {};
    const header = Object.keys(firstRow).map((k) => {
      if (!(k in this.state.header)) {
        this.getConceptSuggestion(k);
      }

      return (
        <th>
          <div class={this.state[k+"-dropdown"] ? "dropdown is-active" : "dropdown"}>
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={() => this.handleDropdownClick(k)}>
                <span>{k} { this.state.header[k] ? "(" + this.state.header[k] + ")" : ""}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu3" role="menu">
              <div class="dropdown-content">
                {
                  this.state.concepts.map((concept) => (
                    <a href="#" class="dropdown-item" onClick={() => this.handleManualConcept(k, concept)}> {concept} </a>
                  ))
                }

                <hr class="dropdown-divider"></hr>
                <a href="#" class="dropdown-item">
                  <div class="field has-addons has-addons-centered">
                    <p class="control">
                      <input class="input is-small" type="text" placeholder="New concept name" onChange={this.handleChange}></input>
                    </p>
                    <p class="control">
                      <a class="button is-small is-primary" onClick={() => this.generateNewConcept(k)}>
                        Save
                      </a>
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </th>
      )
    })

    const body = this.state.data.map((row) => {
      const cells = Object.values(row).map((v) => <td> {v} </td>);

      return (
        <tr>
          { cells }
        </tr>
      )
    })

    return (
      <div class="table-container">
        <table class="table is-bordered is-striped">
          <thead>
            <tr>
              { header }
            </tr>
          </thead>
          <tbody>
            { body }
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <section class="annotate">
        <div>
          { this.renderTable() }
        </div>
      </section>
    )
  }
}

export default Annotate;
