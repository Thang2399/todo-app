import React from 'react';
import {ItemType} from "../../../types/propsType";
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'

type Props = {
    item: ItemType,
    removeItem: (id: string) => void,
    editItem: (id: string) => void
}

const SingleItem: React.FC<Props> = ({item, removeItem, editItem}) => {
    return (
        <div>
            <h1>{item.title}</h1>
            <div>
                <button onClick={() => editItem(item.id)}><AiOutlineEdit /></button>
                <button onClick={() => removeItem(item.id)}><AiOutlineDelete /></button>
            </div>
        </div>
    );
};

export default SingleItem;
