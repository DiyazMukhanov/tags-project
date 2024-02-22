import { createSlice } from '@reduxjs/toolkit';

const initialTagsState = {
    tags: [
        {
            id: 1,
            name: 'Тэг 1',
            color: '#47D17C',
            order: 1
        },
        {
            id: 2,
            name: 'Тэг 2',
            color: '#F46262',
            order: 2
        },
        {
            id: 3,
            name: 'Очень длинный тэг',
            color: '#FC944A',
            order: 3
        },
        {
            id: 4,
            name: 'Тэг 4',
            color: '#FAD038',
            order: 4
        },
        {
            id: 5,
            name: 'Тэг 5',
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
        addTag: (state, action) => {
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

        deleteTag: (state, action) => {
            const tagIdToDelete = action.payload;
            const indexToDelete = state.tags.findIndex(tag => tag.id === tagIdToDelete);
            if (indexToDelete !== -1) {
                state.tags.splice(indexToDelete, 1);

                state.collections.forEach(collection => {
                    collection.tagIds = collection.tagIds.filter(tagId => tagId !== tagIdToDelete);
                });
            }
        },

        updateTag: (state, action) => {
            const { id, name, color } = action.payload;
            const tagToUpdate = state.tags.find(tag => tag.id === id);
            if (tagToUpdate) {
                tagToUpdate.name = name;
                tagToUpdate.color = color;
            }
        },

        addTagToCollection: (state, action) => {
            const { collectionId, tagId } = action.payload;
            const collection = state.collections.find(collection => collection.id === collectionId);
            if (collection && !collection.tagIds.includes(tagId)) {
                collection.tagIds.push(tagId);
            }
        },

        removeTagFromCollection: (state, action) => {
            const { collectionId, tagId } = action.payload;
            const collection = state.collections.find(collection => collection.id === collectionId);
            if (collection) {
                collection.tagIds = collection.tagIds.filter(id => id !== tagId);
            }
        }
    }
});

export const { addTag, deleteTag, updateTag, addTagToCollection, removeTagFromCollection } = tagsSlice.actions;

export default tagsSlice.reducer;
