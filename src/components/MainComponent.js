import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Header from './HeaderComponent'
import DishDetail from './DishdetailComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes:DISHES,
      selectedDish:null
    };
  }
  onDishSelect(dishId) {
    this.setState({selectedDish:dishId});
  }

 render(){
  const HomePage = () => {
    return(
        <Home 
        />
    );
  }
   return(
    <div className="App">
      <Header/>
      <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Redirect to="/home" />
          </Switch>
      <Footer/>  
   </div>
   );
 }
}
export default App;
