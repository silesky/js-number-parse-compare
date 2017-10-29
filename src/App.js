import React, { Component } from 'react';
import './App.css';
import initialEvalList from './data';

// const escapeQuotes = (str) => (`${str}`).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');

class App extends Component {
  state = {
    evalsList: initialEvalList,
    input: '',
  };

  handleChange = ({ target: { value: textInput } }) => {
    this.setState(() => ({ input: textInput }));
  };
  handleSubmit = (e) => {
    e.preventDefault(); // so page does not reload, but we want the enter button to work.
    this.setState(({ evalsList, input }) => ({
      evalsList: [[`'${input}'`, input], ...evalsList],
    }));
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" />
          <button type="submit">Submit</button>
        </form>
        <Table evalsList={this.state.evalsList} />
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

const Table = ({ evalsList }) => {
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
  const evaluations = createEvaluations(evalsList);
  return (
    <table className="table">
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
      <tbody>
        {evaluations.map(({
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
          })}
      </tbody>
    </table>
  );
};

export default App;
