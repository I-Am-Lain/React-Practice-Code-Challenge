import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import Wallet from './components/Wallet'

// Endpoint!
const API = "http://localhost:3001/sushis"

class App extends Component {

  state = {
    sushis: [],
    sushiDex: 0,
    budget: 100,
    walletToggle: false
  }

  componentDidMount(){
    fetch(API)
    .then(resp => resp.json())
    .then(json => {

      const allSushis = json.map(sushi => {
        return {
          ...sushi,
          isEaten: false
        }
      })

      this.setState({
        sushis: allSushis
      })
    })
  }

  moreSushi = () => {
    this.setState(prev => {
      return {
        sushiDex: prev.sushiDex === 96 ? 0 : prev.sushiDex + 4
      }
    })
  }

  handleEaten = (id, price) => {

    if (price > this.state.budget){
      alert('YOU ARE BROKE')
      return
    }

    const newSushis = this.state.sushis.map(sushi => {
      return sushi.id === id ? {...sushi, isEaten: true} : sushi
    })


    this.setState(prevState => {
      return {
        sushis: newSushis,
        budget: prevState.budget-price
      }
    })
  }

  handleWallet = () => {
    this.setState(prev => {
      return{
        walletToggle: !prev.walletToggle
      }
    })
  }

  handleWalletAdd = (e, newBudget) => {
    e.preventDefault()

    this.setState({
      budget: newBudget
    })
  }


  render() {

    const eatenSushis = this.state.sushis.filter(sushi => {
      return sushi.isEaten === true
    })

    return (
      <div className="app">
        <SushiContainer handleEaten={this.handleEaten} moreSushi={this.moreSushi} sushiDex={this.state.sushiDex} sushis={this.state.sushis}/>
        {
          this.state.walletToggle ? <Wallet handleWalletAdd={this.handleWalletAdd} budget={this.state.budget}/> : null
        }
        <Table handleWallet={this.handleWallet} eatenSushis={eatenSushis} budget={this.state.budget} />
      </div>
    );
  }
}

export default App;