import React from 'react';

import MainScreen from './components/MainScreen';
import Store from './components/Store';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      health: 100,
      gold: 0,
      damage: 5,
      isStoreShown: false,
      isLoading: false,
      totalPeopleCount: '',
      enemyName: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.toggleStore = this.toggleStore.bind(this);
  }

  setCookie(name, value) {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `${name}=${value};path=/;expires=${date.toUTCString()}`;
  }

  getNewEnemy() {
    this.setState({isLoading: true});
    fetch(`https://swapi.co/api/people/${Math.round(Math.random() * this.state.totalPeopleCount)}`)
      .then(response => response.json())
      .then(data => this.setState({enemyName: data.name, isLoading: false}));
  }

  handleClick() {
    const damage = Math.round(Math.random() * (this.state.damage - (this.state.damage - 4))) + (this.state.damage - 4);
    const newHealth = this.state.health - damage;
    if (newHealth > 0) {
      this.setState({health: newHealth});
    } else {
      this.getNewEnemy();
      this.setState(prevState => {
        return ({
          health: 100,
          gold: prevState.gold + Math.round(Math.random() * 10)
        });
      });
      this.setCookie('gold', this.state.gold);
    }
  }

  handleBuy(event) {
    const { id } = event.target;
    let price;

    switch(id) {
      case 'buy_1_damage':
        price = 50;
        break;
      default:
        return;
    }

    if (this.state.gold >= price) {
      this.setState(prevState => {
        return ({
          gold: prevState.gold - price,
          damage: prevState.damage + 1
        });
      });

      this.setCookie('gold', this.state.gold);
      this.setCookie('damage', this.state.damage);
    }
  }

  toggleStore() {
    this.setState(prevState => {
      return {isStoreShown: !prevState.isStoreShown};
    });
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch('https://swapi.co/api/people/')
      .then(response => response.json())
      .then(data => {
        this.setState({totalPeopleCount: data.count, isLoading: false});
        this.getNewEnemy();
      });
    const cookieGold = parseInt(document.cookie.split('gold=')[1].split(';')[0]);
    const cookieDamage = parseInt(document.cookie.split('damage=')[1].split(';')[0]);
    this.setState({
      gold: cookieGold,
      damage: cookieDamage
    });
    console.log(this.state.gold, this.state.damage);
  }

  render() {
    return (
      <div className="App">
        <button className="toggle-store" onClick={this.toggleStore}>Store</button>
        <Store
          handleBuy={this.handleBuy}
          display={this.state.isStoreShown}
        />
        <MainScreen
          handleClick={this.handleClick}
          data={{
            isLoading: this.state.isLoading,
            enemyName: this.state.enemyName,
            health: this.state.health,
            gold: this.state.gold,
            damage: this.state.damage
          }}
        />
      </div>
    );
  }
}

export default App;