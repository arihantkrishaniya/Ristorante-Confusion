import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);


    };


    renderDish(dish){
        if(dish != null){
            return(
                <div className = "col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src = {this.props.dish.image} alt ={this.props.dish.name} />
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
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
    
    renderComments(comments){
        if(this.props.dish != null){
            const feedback = this.props.dish.comments.map((element) => {
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

    

    render(){

        return(
            <div className = "container">
            <div className="row">
                    {this.renderDish(this.props.dish)} 
                    {this.renderComments(this.props.dish)} 
            </div>
            </div>

        );
    };
    
};

export default DishDetail;