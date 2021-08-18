/**
 *
 * @param {array} comments
 * @param {array} commentsId
 */
const renderComments = (comments, commentsId) => {
  let commentElements = '';
  for (let i = 0; i < commentsId.length; i++) {
    comments.forEach((comment) => {
      const {
        _id,
        reaction,
        comment: textComment,
        author,
        datePublication,
      } = comment;
      // reaction более глубокая десктуктаризация
      const {emoji, shortReview} = reaction;
      if (_id === commentsId[i]) {
        commentElements += `
        <li class="film-details__comment" data-comment-id="${_id}">
            <span class="film-details__comment-emoji">
              <img src="${emoji}" width="55" height="55" alt="${shortReview}">
            </span>
            <div>
              <p class="film-details__comment-text">${textComment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${datePublication}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        `;
      }
    });
  }
  return commentElements;
};

export {renderComments};
