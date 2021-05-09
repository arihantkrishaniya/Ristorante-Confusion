import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    
    function RenderComments({comments,dish}){
        if(dish != null){
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
                    <RenderComments dish={props.dish} comments={props.comments} /> 
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