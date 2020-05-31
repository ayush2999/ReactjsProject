import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,
    Col,Label,Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';    
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len); 

class CommentForm extends Component{
    
    constructor(props){
        super(props)
        this.state={
            isModalOpen :false
        };
        this.toggleModal=this.toggleModal.bind(this)
    }
    toggleModal(){
        this.setState(
         {isModalOpen: !this.state.isModalOpen}
        );
    }

    render(){
        return(
          <>  
          <Button outline onClick={this.toggleModal}><i className="fa fa-pencil"> Submit Button</i></Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
               <LocalForm>
                   <Row className="form-group">
                     <Label htmlFor="rating" md={12}>Rating</Label>
                     <Col md={12}>
                        <Control.select model=".rating" id="rating" name="rating" className="form-control">
                          <option>1</option><option>2</option><option>3</option>
                          <option>4</option><option>5</option>  
                       </Control.select>      
                     </Col>  
                    </Row>   
                   <Row className="form-group">
                    <Label htmlFor="yourname" md={3}>Your Name</Label>
                    <Col md={12}>
                      <Control.text model=".yourname" name="yourname" id="yourname"
                       placeholder="Your Name"
                       className="form-control"
                       validators={{
                        required, minLength: minLength(3), maxLength: maxLength(20)
                    }}
                       />
                    <Errors
                        className="text-danger"
                        model=".yourname"
                        show="touched"
                        messages={{
                        required: 'Required',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 20 characters or less'
                        }}                 
                    />   
                    </Col>   
                   </Row>    
                   <Row className="form-group">
                    <Label htmlFor="commentbox" xs={12}>Comment</Label>
                    <Col xs={12}>
                    <Control.textarea model=".commentarea" id="commentarea" name="commentarea"
                     row="12"
                     className="form-control"
                    />
                    </Col>   
                   </Row>   
                   <Row className="form-group">
                       <Col md={3}>
                      <Button type="submit" className="bg-primary">Submit</Button>
                      </Col> 
                   </Row>     
                </LocalForm>   
            </ModalBody>
        </Modal>
        </>
        );
    }
}

function RenderComments({comments}) {
        if (comments == null) {
            return (<div></div>)
        }
        return(
        <div className='col-12 m-1'>
        <h4> Comments </h4>
        <ul className='list-unstyled'>{
         comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            );
            })}
            </ul>
            <CommentForm/>
            </div>
        );
    }

    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 m-1'>
                    <Card>
                        <CardImg src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const  DishDetail = (props) => {
        if (props == null) {
            return (<div></div>)
        }
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem >{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
    }

export default DishDetail