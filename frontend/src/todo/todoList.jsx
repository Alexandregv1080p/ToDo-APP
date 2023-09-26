import React from "react";
import IconButton from "../template/iconButton";

export default props => {
    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='succes' icon='check'
                    onClick={() => props.handleMarkAsDone(todo)}/>
                    <IconButton style='warning' icon='undo'
                    onClick={() => props.handleMarkAsPending(todo)}/>
                    <IconButton style='danger' icon='trash-o'
                    onClick={() => props.handleRemove(todo)}/>
                </td>
            </tr>
        ))
    }
    return (
    <table className="table">
        <thead>
            <tr>
                <th>
                    Descrição
                </th>
                <th>
                    Ações
                </th>
            </tr>
        </thead>
        <tbody>
            {renderRows()}
        </tbody>  
    </table>
    )
}        
