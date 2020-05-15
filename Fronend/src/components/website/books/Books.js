import React, { Component } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import '../categories/Categories.css'
import bg2 from '../../assests/bg2.png'
import { Link } from 'react-router-dom'
const SERVER_URL = "http://localhost:5000"
export default class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: [],
            offset: 0,
            data: [],
            perPage: 10,

            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }
    receivedData() {
        axios
            .get(`http://localhost:5000/books`)
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                 this.state.postData = slice
                 this.setState({postData:slice})
       console.log(slice)
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                })
            
        });
            
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset,
          
        }, () => {
            this.receivedData()
        });

    };

    componentDidMount() {
        this.receivedData()
    }
    render() { const {postData}=this.state
        return (
            <div>
                <div class="row  m-5 d-flex justify-content-around text-center">
                {
                postData.map((book, index) =>
                
                <div key={index}  style={{ width: 250 }}>
<img class="card-img-top   rounded mx-auto d-block mt-5 "  style={{ width: 250,height:250 }} src= {`${SERVER_URL}/${book.bookImage}`}/>
      <Link  class=" font-italic "style={{fontSize:18 }} to={"/books/" + book._id}>{book.name}</Link>
                <Link style={{fontSize:18 }} class=" font-italic" to={"/author/" + book.author._id}>{book.author.firstName}{book.author.lastName}</Link>
  
    </div>
                 ) }
                 
                </div>
                <div class=" d-flex justify-content-center">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>
                <img class ="col-12"src={bg2}/>
            </div>

        )
        
    }
    
}