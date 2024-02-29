export interface TagInterface {
    id: number;
    name: string;
    color: string;
    order: number;
}

export interface CollectionInterface {
    id: number;
    tagIds: number[];
}

export interface TagsStateInterface {
    tags: TagInterface[];
    collections: CollectionInterface[];
    filteredTags: TagInterface[] | null;
}

export interface RootState {
    tags: TagsStateInterface;
}