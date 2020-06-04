import React, { Component } from 'react';
import Board from "./components/Tablero";
import BoardHead from "./components/BoardHead";

class Minesweeper extends Component{
  constructor() {
    super();

    this.state = {
        status: "waiting",
        rows: 10,
        columns: 10,
        flags: 10,
        mines: 10,
        time: 0,
        openCells: 0
    };
    this.baseState = this.state;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.status === "running") {
      this.ganador();
    }
  }

  fin = () => {
    this.setState({
      status: "perdiste"
    })
  }

  ganador = () => {
    if(this.state.flags + this.state.openCells >= this.state.columns * this.state.rows) {
      this.setState({
        status: "winner"
      }, alert('GANASTEEEE!!!!'))
    }
  }

  reset = () => {
    this.intervals.map(clearInterval);
    this.setState({... this.baseState}, () => {
      this.intervals = [];
    })
  }

  componentWillMount() {
    this.intervals = [];
  }

  tick = () => {
    if(this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({ time })
    }
  }

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn,t));
  }

  handleCellClick = () => {
    if(this.state.openCells === 0 && this.state.status !== "running") {
      this.setState({
        status: "running"
      }, () => {
        this.setInterval(this.tick, 1000);
      })
    }

    this.setState(prevState=>{
      return { openCells: prevState.openCells + 1};
    })
  }

  cambiaNumBandera = (amount) => {
    this.setState({ flags: this.state.flags + amount})
  }

  render() {
    return (
      <div className="minesweeper">
        <h1>Busca Minas en React</h1>
        <BoardHead time={this.state.time} flagCount={this.state.flags} reset={this.reset} />
        <Board
        status={this.state.status}
        cambiaNumBandera={this.cambiaNumBandera}
        fin={this.fin}
         rows={this.state.rows} 
         columns={this.state.columns} 
         mines={this.state.mines} 
         openCells={this.state.openCells}
         openCellClick={this.handleCellClick}
         />
      </div>
    );
  }
}
  

export default Minesweeper;
