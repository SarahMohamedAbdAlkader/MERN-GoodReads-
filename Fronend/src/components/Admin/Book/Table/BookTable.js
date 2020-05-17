import React from 'react';
import { useState, useEffect } from 'react';
import "./BookTable.css"
import Modal from "../Modal/Modal"
import axios from 'axios'
import AdminNav from "../../AdminNav/AdminNav"

const SERVER_URL = "http://localhost:5000"

function BookTable() {
    let i = 0;
    const [bookList, setBookList] = useState([])
    const [editedItemId, setEditedItemId] = useState()
    const [modalState, setModalState] = useState("add")
    const [editedBookName, setEditedBookName] = useState("")
    const [editedPhoto, seteditedPhoto] = useState("")
    const [editedAuthorId, setEditedAuthorId] = useState({})
    const [editedCategoryId, setEditedCategoryId] = useState({})

    useEffect(() => {
        fetchData(`${SERVER_URL}/books/all`, setBookList)
    }, [])


    return <div class="mt-5 text-center"><AdminNav/>
        <button class="btn" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => {
            setEditedBookName("")
            setEditedAuthorId("")
            setEditedCategoryId("")
            seteditedPhoto("")
            setModalState("add")
        }}><i class="fa fa-plus"></i></button>
        <Modal
            bookList={bookList} setBookList={setBookList}
            modalState={modalState} editedItemId={editedItemId}
            editedBookName={editedBookName} setEditedBookName={setEditedBookName}
            editedPhoto={editedPhoto} seteditedPhoto={seteditedPhoto}
            editedAuthorId={editedAuthorId} setEditedAuthorId={setEditedAuthorId}
            editedCategoryId={editedCategoryId} setEditedCategoryId={setEditedCategoryId}
        />
        <table class="table mt-2 table-striped" >
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Photo</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Author</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookList.map((book) => {
                        i++;
                        return <TarbleRow index={i}
                            book={book} bookList={bookList} setBookList={setBookList}
                            setEditedItemId={setEditedItemId} setModalState={setModalState}
                            setEditedBookName={setEditedBookName} seteditedPhoto={seteditedPhoto}
                            setEditedAuthorId={setEditedAuthorId} setEditedCategoryId={setEditedCategoryId}
                        ></TarbleRow>
                    })
                }
            </tbody>
        </table>
    </div>
}


function TarbleRow({ index, book, bookList, setBookList, setModalState, setEditedItemId,
    setEditedBookName, seteditedPhoto, setEditedAuthorId, setEditedCategoryId }) {
    return (<tr>
        <th scope="row">{index}</th>
        <td><a href={`${SERVER_URL}/${book.bookImage}`} target="_blank">Photo</a></td>
        <td>{book.name}</td>
        <td>{book.category? book.category.catName:""}</td>
        <td>{book.category?book.author.firstName +" "+book.author.lastName:""}</td>
        <td>
            <button class="btn" value={book._id}  >
                <i data-toggle="modal" data-target=".bd-example-modal-lg" class="fa fa-edit" onClick={(event) => {
                    const editedId = event.target.parentElement.value
                    setEditedItemId(editedId);setModalState("edit");
                    let editedItem = bookList.filter(item => editedId == item._id)[0]
                    setEditedBookName(editedItem.name);seteditedPhoto(editedItem.photo);
                    setEditedAuthorId(editedItem.author._id);setEditedCategoryId(editedItem.category._id)                    
                }}></i></button>
            <DeleteBtn book={book} setBookList={setBookList} bookList={bookList}></DeleteBtn>
        </td>
    </tr>
    )
}

const DeleteBtn = ({ book, setBookList, bookList }) => {
    return <button class="btn" value={book._id} >
        <i class="fa fa-trash" onClick={(event) => {
            const deletedId = event.target.parentElement.value;
            if (window.confirm("Are You Sure!")) {
                axios.delete(`${SERVER_URL}/books/${deletedId}`).then(res => {
                    if (res.status === 200) {
                        setBookList(() => {
                            return bookList.filter(item => deletedId != item._id)
                        })
                    }
                })
            }
        }}></i></button>
}

// const EditBtn =
//     ({ book, bookList, setModalState, setEditedItemId, setEditedBookName, seteditedPhoto, setEditedAuthorName, setEditedCategoryName }) => {

//     }

async function fetchData(url, setList) {
    let response = await fetch(url)
    let data = await response.json();
    console.log("books-data",data);
    
    setList(data);
}


export default BookTable