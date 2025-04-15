import { Tag } from './tag.model';

export type Note = {
    id: number;
    title: string;
    content: string;
    tags: Tag[];
}