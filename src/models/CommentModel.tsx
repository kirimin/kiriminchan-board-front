export interface CommentModel { 
    commentId: number,
    threadId: number,
    title: string,
    createdUserId: number,
    createdUserName: string,
    text: string,
    stampId: number,
    createdAt: string,
    updatedAt: string,
    isDeleted: string
}