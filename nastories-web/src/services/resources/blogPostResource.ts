import { CategoryResource } from "./categoryResource";
import { TagResource } from "./tagResource";

 
export type BlogPostResource = {
    title: any,
    thumbnail: any,
    shortDescription: any,
    content: any,
    url: any,
    view: any,
    comment: any,
    category: CategoryResource,
    Tags: TagResource[],
    totalRows: any 
}
 