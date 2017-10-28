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
    return nums.map(eachNum => {
      return objToString({
        evaluee: eachNum,
        _parseInt: parseInt(eachNum, 10),
        _parseFloat: parseFloat(eachNum),
        _Number: Number(eachNum),
        _Unary: +eachNum,
        _foo: --eachNum,
        _bar: eachNum >>> 0,
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
          <th>${'x>>>0'}</th>
        </tr>
      </thead>
      <tbody>
        {evaluations.map(({
            evaluee,
            _parseInt,
            _parseFloat,
            _Number,
            _Unary,
            _foo,
            _bar,
          }) => {
            return (
              <tr key={evaluee}>
                <td style={{ color: 'red' }}>{evaluee}</td>
                <td>{_parseInt}</td>
                <td>{_parseFloat}</td>
                <td>{_Number}</td>
                <td>{_Unary}</td>
                <td>{_foo}</td>
                <td>{_bar}</td>
              </tr>
            );
          } )}
      </tbody>
    </table>
  );
};

export default App;
