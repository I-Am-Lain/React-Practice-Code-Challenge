import React, { Component, Fragment } from 'react'

export default class Wallet extends Component {
    state = {
        budget: this.props.budget
    }

    handleBudgetChange = (e) => {
        this.setState({
            budget: e.target.value
        })
    }

    render(){
        return (
            <Fragment>
                <form onSubmit={(e) => this.props.handleWalletAdd(e, this.state.budget)}>
                    <input type='text' value={this.state.budget} name='budget' onChange={this.handleBudgetChange}/>
                    <input type='submit' value='Add Money'/>
                </form>
            </Fragment>
        )
    }
    
}