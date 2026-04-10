import {DndContext, closestCenter} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable';
import {useState} from 'react';
import List from '@mui/material/List';
import SortableItem from "../components/SortableItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setDraggedItems} from "./quizSlice";

interface ComponentProps {
    answers: string[];
    index: number
}

function SortableList({answers, index}: ComponentProps) {
    const dispatch = useDispatch();
    const arr = useSelector((state: RootState) => state.lists.lists[index])
    // const [draggedItems, setDraggedItems] = useState(answers);
    const draggedItems = arr || [];

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (active.id !== over.id) {
            const oldIndex = draggedItems.indexOf(active.id);
            const newIndex = draggedItems.indexOf(over.id);
            const newList = arrayMove(draggedItems, oldIndex, newIndex);
            dispatch(setDraggedItems({index, items: newList}));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={draggedItems}
                             strategy={verticalListSortingStrategy}>
                <List>
                    {draggedItems.map((item) => (
                        <SortableItem key={item} item={item}/>
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
}

export default SortableList;