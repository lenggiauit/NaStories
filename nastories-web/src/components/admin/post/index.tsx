import React, { useEffect, useState } from "react";
import { Translation } from "../../translation"; 
import { AppSetting, MetaData, Paging } from "../../../types/type";
import Pagination from "../../pagination";  
import { v4 } from "uuid";
import PageLoading from "../../pageLoading";
import LocalSpinner from "../../localSpinner"; 
import { hasPermission } from "../../../utils/functions"; 
import { PermissionKeys } from "../../../utils/constants";
import AddEditBlogPostModal from "./modal/";
import { BlogPost } from "../../../services/models/admin/blogPost";
import { useGetBlogPostMutation } from "../../../services/admin";
import BlogPostItem from "./item";
import AddBlogPostButton from "./addButton";
const appSetting: AppSetting = require('../../../appSetting.json');

const BlogPostList: React.FC = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    // get list
    const [getBlogPostList, getBlogPostStatus] = useGetBlogPostMutation();
    const [metaData, setMetaData] = useState<MetaData>({ paging: { index: 1, size: appSetting.PageSize } });
    const [pagingData, setPagingData] = useState<Paging>({ index: 1, size: appSetting.PageSize });
    const [totalRows, setTotalRows] = useState<number>(0);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [isDraft, setIsDraft] = useState<boolean>(true);
    const [isArchived, setIsArchived] = useState<boolean>(false);
    const [keyWords, setKeyWords] = useState<string>("");
    const [BlogPostList, setBlogPostList] = useState<BlogPost[]>([]);

    const [selecttedBlogPost, setSelecttedBlogPost] = useState<BlogPost>();
    const pagingChangeEvent: any = (p: Paging) => {

        let mp: Paging = {
            index: p.index,
            size: p.size
        }
        setPagingData(mp);
    }
    useEffect(() => {
        let md: MetaData = {
            paging: pagingData
        }
        setMetaData(md);
    }, [pagingData]);


    useEffect(() => {
        getBlogPostList({ payload: { keywords:keyWords, isPublic: isPublic, isDraft: isDraft, isArchived: isArchived }, metaData: metaData });
    }, [metaData, isPublic]);

    useEffect(() => {
        if (getBlogPostStatus.isSuccess && getBlogPostStatus.data.resource != null) {
            let data = getBlogPostStatus.data.resource;
            if (data.length > 0) {
                setTotalRows(data[0].totalRows);
            }
            else {
                setTotalRows(0);
            }
            setBlogPostList(data);
        }
    }, [getBlogPostStatus]);

    const onEditHandler = (tempType: BlogPost) => {
        setSelecttedBlogPost(tempType);
        setIsShowModal(true);
    }

    const onCloseHandler = (tempType?: BlogPost) => {
        setIsShowModal(false);
        getBlogPostList( { payload: { keywords:keyWords, isPublic: isPublic, isDraft: isDraft, isArchived: isArchived }, metaData: metaData });
         
    } 

    return (<>
        {getBlogPostStatus.isLoading && <PageLoading />}
        {isShowModal && <AddEditBlogPostModal dataModel={selecttedBlogPost} onClose={onCloseHandler} />}
        <section className="section overflow-hidden bg-gray">
            <div className="container">
                <header className="section-header mb-0">
                    <h2><Translation tid="heading_BlogPostList" /></h2>
                    <hr />
                </header>

                <div data-provide="shuffle">
                    <ul className="nav nav-center nav-bold nav-uppercase nav-pills mb-7 mt-0" data-shuffle="filter">
                        <li className="nav-item">
                            <a className={"nav-link " + (isPublic ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setIsPublic(false) }}><Translation tid="all" /></a>
                        </li>
                        <li className="nav-item">
                            <a className={"nav-link " + (isDraft ? "active" : "")} href="#" data-shuffle="button" onClick={() => { setIsDraft(true) }} data-group="bag"><Translation tid="archived" /></a>
                        </li>
                    </ul>
                    <div className="row gap-y gap-2" data-shuffle="list">
                        {hasPermission(PermissionKeys.CreateEditBlogPost) && <AddBlogPostButton onAdded={onCloseHandler} />}
                        {BlogPostList.map(p => <BlogPostItem key={v4().toString()} dataItem={p} onSelected={onEditHandler} />)}
                    </div>

                    <div className="mt-7">
                        <Pagination totalRows={totalRows} pageChangeEvent={pagingChangeEvent} />
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default BlogPostList;

