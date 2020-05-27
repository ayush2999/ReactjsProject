import React, { Component, useLayoutEffect } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent'
import Header from './HeaderComponent'
import Contact from './ContactComponent';
import About from './AboutComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


class App extends Component {
  constructor(props) {
    super(props);
  
  }
 render(){
  const HomePage = () => {
    return(
      <Home 
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
      />
  );
  }
  const DishWithId = ({match}) => {    
    return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };
   return(
    <div className="App">
      <Header/>
      <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />
              <Route path="/aboutus" component={()=><About leaders={this.state.leaders}/>}/>
              <Redirect to="/home" />
          </Switch>
      <Footer/>  
   </div>
   );
 }
}
export default App;
