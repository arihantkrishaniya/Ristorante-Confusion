import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Navbar, Nav, NavItem, Button,  Label, Modal, ModalHeader, ModalBody, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';

    function RenderDish({dish}){
        if(dish != null){
            return(
                <div className = "col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src = {dish.image} alt ={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                </Card>
                </div>
            );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    } 
    
    function RenderComments({comments,addComment,dishId}){
        if(comments != null){
            const feedback = comments.map((element) => {
                return(  
                <div className ="container">
                <div key = {element.id} >
                    <ul class="list-unstyled">
                    <li>{element.comment}</li>
                    <li>--{element.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(element.date)))}</li>
                    </ul>
                </div>
                </div>
                
                
                

            );
        });

            return(
                <div className="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>
                    <div>
                        {feedback}
                        <div className="row">
                        <CommentForm dishId={dishId} addComment={addComment} />
                        </div>
                    </div>
                </div>

        )
        }
        else{
            return(
                <div>
                </div>
            )
        }
    }


    const required = (val) => val && val.length;
    const maxLength  = (len) => (val) => !(val) || (val.length <= len);
    const minLength  = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component{

        constructor(props){
            super(props);
    
            this.state = {
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
  
        handleSubmit(values){
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(
            <>
            <Navbar>
                <div className="container">
                    <Nav className='ml-auto' navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                                <span className= "fa fa-pencil fa-lg"></span> Submit Comment
                            </Button>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
            <Modal isOpen ={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <FormGroup>
                            <Label htmlFor ="rating" >Rating</Label> <br/>
                           
                                <Control.select model=".rating" name = "rating" 
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                         
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor ="author" >Your Name</Label>
                             
                                    <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name" 
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                    /> 

                             
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor ="comment" >Comment</Label>
                            
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                rows="6" 
                                className="form-control" />
                             
                        </FormGroup>
                        <FormGroup>
                           
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                            
                        </FormGroup>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>

            );
            
        }
    }

    

    const DishDetail = (props) => {
        if(props.dish != null){
        return(
            <div className = "container">
                 <div className ="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to = '/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className ="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId = {props.dish.id} /> 
                </div>
            </div>

        );
        }
        else{
            return(
                <div>

                </div>
            )
        }
    };
    


export default DishDetail;