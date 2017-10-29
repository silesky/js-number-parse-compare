import React, { Component } from 'react';
import './App.css';
import initialEvalList from './data';

class App extends Component {
  state = {
    evalsLive: ["'123'", '123'],
    evalsList: initialEvalList,
  };

  handleChange = ({ target: { value: textInput } }) => {
    this.setState(() => ({ evalsLive: [`'${textInput}'`, textInput] }));
  };
  render() {
    return (
      <div className="container">
        <h1>
          Ultimate Javascript Number Parsing Functions & Operator Comparison
          Table
        </h1>
        <div className="input-container">
          <input
            className="input"
            placeholder="Type something here."
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <Table
          evalsLive={this.state.evalsLive}
          evalsList={this.state.evalsList}
        />
      </div>
    );
  }
}

const objToString = obj =>
  Object.values(obj) // convert results -> string b4 displaying.
    .map(eachEvalResult => [eachEvalResult].toString())
    .reduce((acc, cur, i) => {
      const keyName = Object.keys(obj)[i];
      acc[keyName] = cur;
      return acc;
    }, {});

const Table = ({ evalsList, evalsLive }) => {
  const createEvaluations = nums => {
    return nums.map(([label, value]) => {
      return objToString({
        evaluee: label,
        _parseInt: parseInt(value),
        _parseFloat: parseFloat(value),
        _Number: Number(value),
        _unary: +value,
        _unaryMinus: --value,
        _bitwise: value >>> 0,
      });
    });
  };
  const Head = () => (
    <thead>
      <tr>
        <th>X</th>
        <th>parseInt(x)</th>
        <th>parseFloat(x)</th>
        <th>Number(x)</th>
        <th>+x</th>
        <th>--x</th>
        <th>x>>>0</th>
      </tr>
    </thead>
  );
  const [elive] = createEvaluations([evalsLive]);
  const evaluations = createEvaluations(evalsList);

  return (
    <div>
      <table className="table">
        <Head />
        <tbody>
          <tr key={`${elive.evaluee}${Math.random()}`}>
            <td>{elive.evaluee}</td>
            <td>{elive._parseInt}</td>
            <td>{elive._parseFloat}</td>
            <td>{elive._Number}</td>
            <td>{elive._unary}</td>
            <td>{elive._unaryMinus}</td>
            <td>{elive._bitwise}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table className="table">
        <Head />
        <tbody>
          {evaluations.map(
            ({
              evaluee,
              _parseInt,
              _parseFloat,
              _Number,
              _unary,
              _unaryMinus,
              _bitwise,
            }) => {
              return (
                <tr key={`${evaluee}${Math.random()}`}>
                  <td>{evaluee}</td>
                  <td>{_parseInt}</td>
                  <td>{_parseFloat}</td>
                  <td>{_Number}</td>
                  <td>{_unary}</td>
                  <td>{_unaryMinus}</td>
                  <td>{_bitwise}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
