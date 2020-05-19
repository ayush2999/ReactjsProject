import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';

  class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return( 
                <div></div>
            );
    }
    
    renderComments(dish){
      if(dish!=null && dish.comments!=null)
       { 
          
          return(  
            <Card key={dish.id}>
            <CardBody>
              <CardTitle>Comments</CardTitle>
              <CardText>{dish.comments[0].comment}</CardText>
              <CardText>--{dish.comments[0].author}, {dish.comments[0].date}</CardText>
          
              <CardText>{dish.comments[1].comment}</CardText>
              <CardText>--{dish.comments[1].author}, {dish.comments[1].date}</CardText>

              <CardText>{dish.comments[2].comment}</CardText>
              <CardText>--{dish.comments[2].author}, {dish.comments[2].date}</CardText>

              <CardText>{dish.comments[3].comment}</CardText>
              <CardText>--{dish.comments[3].author}, {dish.comments[3].date}</CardText>

              <CardText>{dish.comments[4].comment}</CardText>
              <CardText>--{dish.comments[4].author}, {dish.comments[4].date}</CardText>
            </CardBody>
        </Card>
        );
       }
       else
       return(
        <div></div>
       );
       
    }
 
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

     
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                  <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
                  <div className="col-md-5">
                   {this.renderComments(this.state.selectedDish)} 
                    {this.value}
                    </div>
                </div>
            </div>
        );
    }
}
export default Menu;