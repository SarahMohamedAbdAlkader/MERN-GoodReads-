import React from 'react';
import {Card} from 'react-bootstrap'



    
function LoadBooks() {
    const arr=[{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"},{name:"bla",author:"bla bla"}]
    return (<div>
       
        {arr.map((item)=>{
            return <Card style={{ width: '12rem' , display : 'inline-block' , marginRight:'10px'}}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                item.author
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        })}
    </div>

    );
}
export default LoadBooks;