import { createSlice } from '@reduxjs/toolkit';
import { TagsStateInterface } from './sliceTypes';
import { PayloadAction } from '@reduxjs/toolkit';

const initialTagsState: TagsStateInterface = {
    tags: [
        {
            id: 1,
            name: 'Тег 1',
            color: '#47D17C',
            order: 1
        },
        {
            id: 2,
            name: 'Тег 2',
            color: '#F46262',
            order: 2
        },
        {
            id: 3,
            name: 'Очень длинный на свете тег',
            color: '#FC944A',
            order: 3
        },
        {
            id: 4,
            name: 'Тег 4',
            color: '#FAD038',
            order: 4
        },
        {
            id: 5,
            name: 'Тег 5',
            color: '#6E85F7',
            order: 5
        },
    ],
    collections: [
        {
            id: 123450,
            tagIds: [1, 2, 3]
        },
        {
            id: 123451,
            tagIds: [1, 2, 3, 4, 5]
        },
        {
            id: 123452,
            tagIds: [1, 2, 3, 4, 5]
        },
        {
            id: 123453,
            tagIds: [1, 2, 3, 4]
        },
        {
            id: 123454,
            tagIds: [1, 2]
        },
    ]
};

const tagsSlice = createSlice({
    name: 'tags',
    initialState: initialTagsState,
    reducers: {
        addTag: (state, action: PayloadAction<{ name: string; color: string }>) => {
            const { name, color } = action.payload;
            const existingTag = state.tags.find(tag => tag.name === name);
            if (existingTag) {
                return;
            }
            const lastTagId = Math.max(...state.tags.map(tag => tag.id));
            const newTag = {
                id: lastTagId + 1,
                name,
                color,
                order: state.tags.length + 1
            };
            state.tags.push(newTag);
        },

        deleteTag: (state, action: PayloadAction<number | undefined>) => {
            const tagIdToDelete = action.payload;
            const indexToDelete = state.tags.findIndex(tag => tag.id === tagIdToDelete);
            if (indexToDelete !== -1) {
                state.tags.splice(indexToDelete, 1);

                state.collections.forEach(collection => {
                    collection.tagIds = collection.tagIds.filter(tagId => tagId !== tagIdToDelete);
                });
            }
        },

        updateTag: (state, action: PayloadAction<{ id: number | undefined; name: string; color: string | undefined }>) => {
            const { id, name, color } = action.payload;

            const nameExists = state.tags.some(tag => tag.name === name && tag.id !== id);

            if (nameExists) {
                return;
            }

            const tagToUpdate = state.tags.find(tag => tag.id === id);

            if (tagToUpdate && color) {
                tagToUpdate.name = name;
                tagToUpdate.color = color;
            }
        },

        addTagToCollection: (state, action: PayloadAction<{ collectionId: number | null; tagId: number | null }>) => {
            const { collectionId, tagId } = action.payload;
            const collection = state.collections.find(collection => collection.id === collectionId);
            if (tagId) {
                if (collection && !collection.tagIds.includes(tagId)) {
                    collection.tagIds.push(tagId);
                }
            }

        },

        removeTagFromCollection: (state, action: PayloadAction<{ collectionId: number | null; tagId: number | null }>) => {
            const { collectionId, tagId } = action.payload;
            const collection = state.collections.find(collection => collection.id === collectionId);
            if (collection) {
                collection.tagIds = collection.tagIds.filter(id => id !== tagId);
            }
        },

        moveTagOrder: (state, action: PayloadAction<{ id: number; newOrder: number }>) => {
            const { id, newOrder } = action.payload;

            const tagToMove = state.tags.find(tag => tag.id === id);
            if (!tagToMove) return;
            const originalOrder = tagToMove.order;
            tagToMove.order = -1;

            state.tags.forEach(tag => {
                if (originalOrder > newOrder) {
                    if (tag.order >= newOrder && tag.order < originalOrder) {
                        tag.order += 1;
                    }
                } else {

                    if (tag.order > originalOrder && tag.order <= newOrder) {
                        tag.order -= 1;
                    }
                }
            });

            tagToMove.order = newOrder;

            state.tags.sort((a, b) => a.order - b.order);
            state.tags.forEach((tag, index) => {
                tag.order = index + 1;
            });
        },

    }
});

export const { addTag, deleteTag, updateTag, addTagToCollection, removeTagFromCollection, moveTagOrder } = tagsSlice.actions;

export default tagsSlice.reducer;
