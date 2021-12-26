import React from 'react';
import {ItemType} from "../../../types/propsType";
import {AiOutlineRedo} from "react-icons/ai";

type Props = {
    item: ItemType,
    redoItem: (id: string) => void
}

const SingleRemovedItem: React.FC<Props> = ({item, redoItem}) => {
    return (
        <div>
            <h1>{item.title}</h1>
            <button onClick={() => redoItem(item.id)}><AiOutlineRedo /></button>
        </div>
    );
};

export default SingleRemovedItem;
