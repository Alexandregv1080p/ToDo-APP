import React,{Component} from 'react'
import PageHeader from '../template/pageHeader'
import axios from 'axios'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component{
    constructor(props){
        super(props)
        this.state = { description: '', list: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.refresh()
    }
    refresh(description=''){
        const search = description ? `&description__regex=/${description}/` : '' 
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state,description,list:resp.data}))
    }
    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }
    handleSearch(){
        console.log('Funciona')
        this.refresh(this.state.description)
    }
    handleAdd(){
        let description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }
    handleClear(){
        this.refresh()
    }
    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh())
    }
    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo,done:true})
                .then(resp => this.refresh())
    }
    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo,done:false})
                .then(resp => this.refresh())
    }
    render(){
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm
                handleAdd={this.handleAdd}
                handleChange={this.handleChange}
                description={this.state.description}
                handleSearch={this.handleSearch}
                handleClear={this.handleClear}
                />
                <TodoList list={this.state.list}
                handleMarkAsDone={this.handleMarkAsDone}
                handleMarkAsPending={this.handleMarkAsPending}
                handleRemove={this.handleRemove}/>
            </div>
        )
    }
}