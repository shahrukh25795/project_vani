export const USERS_SCHEMA = "Users";
export const MESSAGE_SCHEMA = "Message";
export const COMMENTS_SCHEMA = "Comments";
export const FEEDS_SCHEMA = "Feeds";
export const NEWS_FEED_SCHEMA = "NewsFeed";


// Models and their properties

export const Users = {
    name: USERS_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "string", // primary key
        first_name: "string",
        last_name: "string?",
        email: "string",
        password: "string?",
    },
};

export const Feeds = {
    name: FEEDS_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "string", // primary key
        image: "data",
        like_count: 'int',
        comment_count: 'int',
        user_name: "string",
        user: 'string'
    },
};

export const Message = {
    name: MESSAGE_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "string", // primary key
        message: "string",
    },
};

export const Comments = {
    name: COMMENTS_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "string", // primary key
        message: "string",
    },
};

export const NewsFeed = {
    name: NEWS_FEED_SCHEMA,
    primaryKey: "id",
    properties: {
        id: "string", // primary key
        news_title: "string",
        news_description: "string",
        image: "data?",
    },
};