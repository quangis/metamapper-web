import React, { Component} from 'react';
import axios from 'axios';


class Concepts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      concepts: []
    };
  }

  componentDidMount() {
    this.getConcepts();
  }

  getConcepts = () => {
    axios.get("http://localhost:8000/concepts").then((response) => {
      this.setState({
        publishers: response.data
      });
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <section class="concepts">
        <div>
          hello
        </div>
      </section>
    )
  }
}

export default Concepts;
