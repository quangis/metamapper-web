import React, { Component} from 'react';
import axios from 'axios';


class Concepts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsActive: false,
      conceptFilter: "",
      concepts: [],
      concept: null,
      measurmentScale: "Ordinal",
      propertyType: "Extensive",
      dataSetType: "EventDS"
    };
  }

  componentDidMount() {
    this.getConcepts();
  }

  getConcepts = () => {
    axios.get("http://localhost:8000/concepts").then((response) => {
      this.setState({
        concepts: response.data
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  editConcept = (concept) => {
    this.setState({
      concept: concept
    });

    this.toggleModal()
  }

  renderConcepts = () => {
    const concepts = this.state.concepts.filter(concept =>
      concept.name.includes(this.state.conceptFilter)
    )

    return concepts.map((concept) =>
      <a class="panel-block" onClick={() => this.editConcept(concept)}>
        <span class="panel-icon">
          <i class="fas fa-book" aria-hidden="true"></i>
        </span>
        { concept.name }
      </a>
    )
  }

  handleFilterChange = (e) => {
    e.preventDefault();

    this.setState({
      conceptFilter: e.target.value
    });
  }


  updateConcept = (url) => {
    axios.post("http://localhost:8000/concepts", {
      "concept": this.state.concept.uri,
      "measurement": this.state.measurmentScale,
      "property": this.state.propertyType,
      "dataset": this.state.dataSetType
    }).catch((e) => {
      console.log(e);
    });
  }

  toggleModal = () => {
    this.setState(prev => ({
      modalIsActive: !prev.modalIsActive
    }))
  }

  submitForm = (e) => {
    e.preventDefault();

    this.updateConcept();
    this.toggleModal();
  }

  handleMeasurementScaleChange = (e) => {
    e.preventDefault();

    this.setState({
      measurmentScale: e.target.value
    });
  }

  handlePropertyTypeChange = (e) => {
    e.preventDefault();

    this.setState({
      propertyType: e.target.value
    });
  }

  handleDataSetTypeChange = (e) => {
    e.preventDefault();

    this.setState({
      dataSetType: e.target.value
    });
  }

  render() {
    return (
      <section class="concepts">
        <div class="container is-ridescreen">
          <article class="panel is-primary">
            <div class="panel-block">
              <p class="control has-icons-left">
                <input class="input is-primary" type="text" placeholder="Search" onChange={this.handleFilterChange}></input>
                <span class="icon is-left">
                  <i class="fas fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div>

            <div>
              { this.renderConcepts() }
            </div>
          </article>

        </div>

        <div class={this.state.modalIsActive ? "modal is-active" : "modal"}>
          <div class="modal-background"></div>
          <div class="modal-content">
            <section class="concept-modal-content">
              <div class="box has-background-light">
                <form>
                  <div class="field">
                    <label class="label">Measurement Scale</label>
                    <div class="select" value={this.state.measurmentScale} onChange={this.handleMeasurementScaleChange}>
                      <select>
                        <option>Nominal</option>
                        <option>Ordinal</option>
                        <option>Interval</option>
                        <option>Ratio</option>
                      </select>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">Property Type</label>
                    <div class="select" value={this.state.propertyType} onChange={this.handlePropertyTypeChange}>
                      <select>
                        <option>Extensive</option>
                        <option>Intensive</option>
                      </select>
                    </div>
                  </div>

                  <div class="field">
                    <label class="label">DataSet Type</label>
                    <div class="select" value={this.state.dataSetType} onChange={this.handleDataSetTypeChange}>
                      <select>
                        <option>EventDS</option>
                        <option>TrackDS</option>
                        <option>ContourDS</option>
                        <option>FieldRasterDS</option>
                        <option>PatchDS</option>
                        <option>CoverageDS</option>
                        <option>PointMeasureDS</option>
                        <option>LineMeasureDS</option>
                        <option>LatticeDS</option>
                        <option>ObjectDS</option>
                        <option>AmountDS</option>
                        <option>NetworkDS</option>
                      </select>
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

              </section>
              <button class="modal-close is-large" aria-label="close" onClick={this.toggleModal}></button>
          </div>
        </div>
      </section>
    )
  }
}

export default Concepts;
