
// returns the other userName of a chat based on which user is logged in
export const getSender = (loggedUser, chatUsers) => {

    return ((chatUsers[0]?._id === loggedUser?.userId) ? chatUsers[1].name : chatUsers[0].name);
};

// below two functions are to get the logic to display the userAvatar for the other sender at their last message on the opposite side
// basically if the message is from sender or not ? (true if it is from the other person)
export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
};
  
// last message of the other user (true->if it is)
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId && // neq to logged user
    messages[messages.length - 1].sender._id // msg is not null
  );
};


export const isSameSenderMargin = (messages, m, i, userId) => {

    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33; // if the same user as logged in return 33 margin -> message to the right
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
    return 0; // if the other user(s) return 0 margin -> message to the left
    else return "auto";
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
  
export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
};