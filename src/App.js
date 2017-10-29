import React, { Component } from 'react';
import './App.css';
import initialEvalList from './data';

class App extends Component {
  state = { evalsList: initialEvalList }
  render() {
    return (
      <div className="container">
        <Table evalsList={this.state.evalsList} />
      </div>
    );
  }
}

const objToString = obj =>
  Object.values(obj)
    .map(eachVal => [eachVal].toString())
    .reduce((acc, cur, i) => {
      const keyName = Object.keys(obj)[i];
      acc[keyName] = cur;
      return acc;
    }, {});

const Table = ({ evalsList }) => {
  const createEvaluations = (nums) => {
    return nums.map(([label, value]) => {
      return objToString({
        evaluee: label,
        _parseInt: parseInt(value, 10),
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
          <th style={{ color: 'red' }}>X</th>
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
              <tr key={evaluee}>
                <td style={{ color: 'red' }}>{evaluee}</td>
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
