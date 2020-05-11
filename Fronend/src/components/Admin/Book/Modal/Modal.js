import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'


const SERVER_URL = "http://localhost:5000"

function Modal({
    bookList, setBookList, modalState, editedItemId, editedBookName, setEditedBookName,
    editedPhoto, seteditedPhoto, editedAuthorId, setEditedAuthorId,
    editedCategoryId, setEditedCategoryId
}) {
    const [categoryList, setCategoryList] = useState([]);
    const [authorList, setAuthorList] = useState([]);

    React.useEffect(() => {
        fetchData(`${SERVER_URL}/categories`, setCategoryList)
        fetchData(`${SERVER_URL}/authors`, setAuthorList)
    }, [])

    return (<React.Fragment>
        <div class="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{modalState === "add" ? "Add New Book" : "Edit Book"}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <Form
                            authorList={authorList} setAuthorList={setAuthorList}
                            categoryList={categoryList} setCategoryList={setCategoryList}
                            bookList={bookList} setBookList={setBookList}
                            modalState={modalState} editedItemId={editedItemId}
                            editedBookName={editedBookName} setEditedBookName={setEditedBookName}
                            editedPhoto={editedPhoto} seteditedPhoto={seteditedPhoto}
                            editedAuthorId={editedAuthorId} setEditedAuthorId={setEditedAuthorId}
                            editedCategoryId={editedCategoryId} setEditedCategoryId={setEditedCategoryId}
                        ></Form>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>)
}



function Form(props) {
    const {
        authorList, setAuthorList, categoryList, setCategoryList,
        bookList, setBookList, modalState, editedItemId,
        editedBookName, setEditedBookName, editedPhoto, seteditedPhoto,
        editedAuthorId, setEditedAuthorId, editedCategoryId, setEditedCategoryId
    } = props
    return <form method="POST">
        <div class="form-group">
            <label for="recipient-name" class="col-form-label font-weight-bold">Book Name:</label>
            <input type="text" class="form-control" id="book-name" value={editedBookName} onChange={e => setEditedBookName(e.target.value)} />

            <label for="category-select" class="col-form-label font-weight-bold">Category</label>
            <select className="form-control" id="category-select" name="category-select" onChange={e => setEditedCategoryId(e.target.value)}>
                <option value=""></option>
                {
                    categoryList.map((item) => {
                        let state = (item._id == editedCategoryId)
                        return <option value={item._id} selected={state}>{item.catName}</option>
                    })}
            </select>

            <label for="author-select" class="col-form-label font-weight-bold">Author</label>
            <select className="form-control" id="author-select" name="author-select" onChange={e => setEditedAuthorId(e.target.value)}>
                <option value=""></option>
                {
                    authorList.map((item) => {
                        let state = (item._id == editedAuthorId)
                        return <option value={item._id} selected={state}>{item.firstName + " " + item.lastName}</option>
                    })}
            </select>


            <label for="bookImage" class="col-form-label font-weight-bold">Book Image:</label>
            <input type="file" class="form-control" name="bookImage" id="bookImage" onChange={(e) => seteditedPhoto(e.target.files[0])} />
            <ConfirmationBtn
                bookList={bookList} setBookList={setBookList}
                modalState={modalState} editedItemId={editedItemId}
                editedBookName={editedBookName} editedPhoto={editedPhoto}
                editedAuthorId={editedAuthorId} editedCategoryId={editedCategoryId}
            ></ConfirmationBtn>
        </div>
    </form>
}


function ConfirmationBtn({ modalState, bookList, setBookList, editedItemId,
    editedBookName, editedPhoto, editedAuthorId, editedCategoryId }) {
    return <div class="modal-footer " >
        <button type="submit" onClick={() => {
            const formData = new FormData()
            formData.append("name", editedBookName)
            formData.append("categoryId", editedCategoryId)
            formData.append("authorId", editedAuthorId)
            formData.append("bookImage", editedPhoto)
            if (modalState === "add") {
                if (editedBookName && editedCategoryId && editedAuthorId && editedPhoto) {
                    axios.post(`${SERVER_URL}/books`, formData, {})
                        .then(res => {
                            setBookList([...bookList, res.data])
                        })
                } else {
                    alert("Please Fill All Fields")
                }
            }
            else { //edit Author
console.log(editedBookName);
console.log(editedCategoryId);
console.log(editedAuthorId);
console.log(editedPhoto);



                if (editedBookName && editedCategoryId && editedAuthorId) {
                    axios.patch(`${SERVER_URL}/books/${editedItemId}`, formData)
                        .then(res => {
                            if (res.status === 200) {
                                console.log("res is",res.data);
                                setBookList(bookList.map(item => {
                                    return item._id == editedItemId ? res.data : item
                                }));
                            } else {
                                alert("Database Erorr! Book Name Exist")
                            }
                        })
                } else {
                    alert("Please Fill All Fields")
                }
            }


            // if (cateName) {
            //     if (modalState === "add") {
            //         setCategoryList([...categoryList, { id: 4, name: cateName }])
            //         setCatName("")
            //     } else {
            //         setCategoryList(categoryList.map(item => {
            //             if (item.id == editedItemId) {
            //                 item.name = cateName;
            //             }
            //             return item
            //         }));
            //         console.log("confirm edit");
            //         setCatName("")
            //     }
            // }
        }}
            class="btn btn-primary " data-dismiss="modal" style={{ margin: "auto" }}>{modalState === "add" ? "Add Book" : "Edit"}</button>
    </div>

}

async function fetchData(url, setList) {
    let response = await fetch(url)
    let data = await response.json();
    setList(data);
}

export default Modal