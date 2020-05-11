import React from 'react';
import { useState } from 'react';
import "./CategoryTable.css"
import Modal from "../Modal/Modal"
import EditBtn from "../EditBtn"
import DeleteBtn from "../DeleteBtn"
function CategoryTable() {
    let i = 0;
    const [categoryList, setCategoryList] = useState([])
    const [editedItemId, setEditedItemId] = useState()
    const [catName, setCatName] = useState("")
    const [modalState, setModalState] = useState("add")
    React.useEffect(() => {
        fetchData(setCategoryList)
    }, [])
    return <div class="mt-5 text-center">
        <button class="btn" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => { setCatName(""); setModalState("add") }}><i class="fa fa-plus"></i></button>
        <Modal setCategoryList={setCategoryList} categoryList={categoryList} catName={catName} setCatName={setCatName} modalState={modalState} editedItemId={editedItemId} />
        <table class="table mt-2 table-striped" >
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    categoryList.map((category) => {
                        i++;
                        return <TarbleRow index={i} category={category} setCategoryList={setCategoryList} setEditedItemId={setEditedItemId}
                            categoryList={categoryList} setCatName={setCatName} setModalState={setModalState}></TarbleRow>
                    })
                }
            </tbody>
        </table>
    </div>
}


function TarbleRow({ index, category, setCategoryList, categoryList, setCatName, setModalState, setEditedItemId }) {
    return (<tr>
        <th scope="row">{index}</th>
        <td>{category.catName}</td>
        <td>
            <EditBtn category={category} setCategoryList={setCategoryList} categoryList={categoryList}
                setCatName={setCatName} setModalState={setModalState} setEditedItemId={setEditedItemId}></EditBtn>
            <DeleteBtn category={category} setCategoryList={setCategoryList} categoryList={categoryList}></DeleteBtn>
        </td>
    </tr>
    )
}

async function fetchData(setList) {
    console.log("detching");
    
    const url = "http://localhost:5000/";
    let response = await fetch(url + "categories")
    let data = await response.json();
    console.log(data);
    setList(data);
}

export default CategoryTable