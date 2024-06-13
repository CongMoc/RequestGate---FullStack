const GetCommentFromLocalStorage = () => {
  const comment = localStorage.getItem("comments");
  return comment ? JSON.parse(comment) : null;
};

const SaveNewCommentToLocalStorage = (comment) => {
  let commentModel = GetCommentFromLocalStorage() || [];
  commentModel.push(comment);
  localStorage.setItem("comments", JSON.stringify(commentModel));
};

const GetListCommentFromLocalStorageByIDRequets = (idRequest) => {
  let commentModel = GetCommentFromLocalStorage() || [];
  const listComment = commentModel.filter((comment) => {
    return comment.idRequest === idRequest;
  });

  if (listComment) {
    const sortedList = listComment.sort((a, b) => {
      const timeA = new Date(a.id).getTime();
      const timeB = new Date(b.id).getTime();
      return timeB - timeA;
    });
    return sortedList;
  }
};

const GetContentCommentFromID = (idComment) => {
  let commentModel = GetCommentFromLocalStorage() || [];
  const listComment = commentModel.find((comment) => comment.id === idComment);
  if (listComment) {
    return listComment.content;
  }
};

const GetNameUserCommentFromID = (idComment) => {
  let commentModel = GetCommentFromLocalStorage() || [];
  const listComment = commentModel.find((comment) => comment.id === idComment);
  if (listComment) {
    return listComment.idUserComment;
  }
}

export {
  GetCommentFromLocalStorage,
  SaveNewCommentToLocalStorage,
  GetListCommentFromLocalStorageByIDRequets,
  GetContentCommentFromID,
  GetNameUserCommentFromID
};
