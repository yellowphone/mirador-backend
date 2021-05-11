const { gql } = require('apollo-server');

const typeDefs = gql`
scalar DateTime

enum Account {
    UNDEFINED
    GOOGLE
    FACEBOOK
}

type Mutation {
    createUser(email: String!, firstname: String!, lastname: String!, access_token: String!, user_id: String!, image_url: String!): User!
    addTagToUser(pktag: Int!, pkuser: Int!): User_Tag
    deleteTagFromUser(pkuser_tag: Int!): User_Tag
    followUser(user_following: Int!, user_followed: Int!): Follower!
    unfollowUser(pkfollower: Int!): Follower!
    deleteUser(pkuser: Int!): User!
    createExperience(title: String, pkuser: Int!, summary: String, miles: Float, elevation: Int, climbing: String, difficulty: Difficulty_Level, lat: Float!, lng: Float!, images: [Upload!], caption: String, tags: [Int]): Experience!
    addImageToExperience(images: [Upload!]!, pkexperience: Int!, caption: String, pkuser: Int!): String
    addTagToExperience(pktag: Int!, pkexperience: Int!): Experience_Tag
    deleteTagFromExperience(pkexperience_tag: Int!): Experience_Tag
    saveExperience(saving_user: Int!, saving_experience: Int!): Saved_Experience!
    unsaveExperience(pksaved_experience: Int!): Saved_Experience!
    visitExperience(visiting_user: Int!, visiting_experience: Int!): Visited_Experience
    reviewExperience(rating: Int!, content: String, review_user: Int!, review_experience: Int!, images: [Upload!]): Review_Experience
    deleteReviewExperience(pkreview_experience: Int!): Review_Experience
    unvisitExperience(pkvisited_experience: Int!): Visited_Experience
    deleteExperience(pkexperience: Int!): Experience!

    createBlog(title: String, pkuser: Int!, summary: String, mongoid: String, lat: Float!, lng: Float!, tags: [Int]): Blog!
    addTagToBlog(pktag: Int!, pkblog: Int!): Blog_Tag
    deleteTagFromBlog(pkblog_tag: Int!): Blog_Tag
    updateBlog(public_identifier: String, title: String, summary: String): Blog
    saveBlog(saving_user: Int!, saving_blog: Int!): Saved_Blog
    unsaveBlog(pksaved_blog: Int!): Saved_Blog
    likeBlog(liking_user: Int!, liking_blog: Int!): Liked_Blog
    unlikeBlog(pkliked_blog: Int!): Liked_Blog
    commentBlog(comment: String!, pkuser: Int!, pkblog: Int!): Comment_Blog
    deleteCommentBlog(pkcomment_blog: Int!): Comment_Blog
    deleteBlog(pkblog: Int!): Blog!

    createItinerary(title: String, summary: String, tags: [Int], pkuser: Int!, mongoid: String): Itinerary!
    updateItinerary(public_identifier: String!, title: String, mongoid: String): Itinerary
    addExperienceToItinerary(pkexperience: Int!, pkitinerary: Int!): Itinerary_Experience
    addTagToItinerary(pktag: Int!, pkitinerary: Int!): Itinerary_Tag
    deleteTagFromItinerary(pkitinerary_tag: Int!): Itinerary_Tag
    saveItinerary(saving_user: Int!, saving_itinerary: Int!): Saved_Itinerary
    unsaveItinerary(pksaved_itinerary: Int!): Saved_Itinerary
    addUserToItinerary(adding_user: Int!, adding_itinerary: Int!): User_Itinerary!
    deleteUserFromItinerary(pkuser_itinerary: Int!): Itinerary
    deleteItinerary(pkitinerary: Int!): Itinerary!

    createImage(pkuser: Int!, caption: String, file: Upload!): Image
    addTag(tag: String!): Tag
}

type Query {
    findUser(pkuser: Int!): User!
    findUserByUsername(username: String!): User!
    findUserByEmail(email: String!): User!
    findManyUsers(firstName: String!): [User!]!
    findExperienceById(pkexperience: Int!): Experience
    findExperienceByTitle(title: String!): [Experience]
    findExperienceByCoordinates(lat: Float!, lng: Float!): [Experience_Card]
    findExperienceByPublicIdentifier(public_identifier: String!): Experience
    findBlogById(pkblog: Int!): Blog
    findManyBlogs: [Blog]
    findBlogByPublicIdentifier(public_identifier: String!): Blog
    findItineraryById(pkitinerary: Int!): Itinerary
    findItineraryByPublicIdentifier(public_identifier: String!): Itinerary
    getTags: [Tag]
}

type User {
    pkuser: Int!
    username: String
    email: String!
    access_token: String!
    account_type: Account_Type
    firstname: String
    lastname: String
    user_id: String!
    image_url: String
    accout_type: Account
    public_identifier: String
    bio: String
    created_on: DateTime
    itineraries: [Itinerary]
    experiences: [Experience]
    blogs: [Blog]
    followers_followers_user_followedTousers: [Follower]
    followers_followers_user_followingTousers: [Follower]
    saved_experiences: [Saved_Experience]
    visited_experiences: [Visited_Experience]
    user_itineraries: [User_Itinerary]
    saved_blogs: [Saved_Blog]
    saved_itineraries: [Saved_Itinerary]
    liked_blogs: [Liked_Blog]
    user_tags: [User_Tag]
}

type Tag {
    pktag: Int!
    tag: String
}

type User_Tag {
    pkuser_tag: Int!
    user_tag: Int
    user_tagged: Int
    tags: Tag
    users: User
}

type Follower {
    pkfollower: Int!
    user_following: Int!
    user_followed: Int!
    created_on: DateTime
    users_followers_user_followedTousers: User
    users_followers_user_followingTousers: User
}

enum Account_Type {
    UNDEFINED
    GOOGLE
    FACEBOOK
}

type Experience {
    pkexperience: Int!
    title: String!
    summary: String
    created_on: DateTime
    fk_user_experience: Int!
    experience_locations: Experience_Location
    miles: Float
    elevation: Int
    climbing: String
    difficulty: Difficulty_Level
    public_identifier: String
    experience_images: [Experience_Image]
    review_experiences: [Review_Experience]
    experience_tags: [Experience_Tag]
}

type Experience_Tag {
    pkexperience_tag: Int!
    experience_tag: Int
    experience_tagged: Int
    tags: Tag
    experiences: Experience
}

enum Difficulty_Level {
    EASY
    MODERATE
    HARD
}

type Experience_Image {
    pkexperience_image: Int!
    adding_experience: Int!
    adding_image: Int!
    experiences: Experience
    images: Image
}

type Image {
    pkimage: Int!
    identifier: String!
    url: String!
    caption: String
    created_on: DateTime
    fk_user_image: Int
    users: User
}

type Saved_Experience {
    pksaved_experience: Int!
    created_on: DateTime
    saving_user: Int!
    saving_experience: Int!
    experiences: Experience
    users: User
}

type Visited_Experience {
    pkvisited_experience: Int!
    created_on: DateTime
    visiting_user: Int!
    visiting_experience: Int!
    experiences: Experience
    users: User
}

type Review_Experience {
    pkreview_experience: Int!
    rating: Int!
    content: String
    created_on: DateTime
    review_user: Int!
    review_experience: Int!
    users: User
    experiences: Experience
}

type Blog {
    pkblog: Int!
    title: String!
    summary: String
    mongoid: String 
    created_on: DateTime
    fk_user_blog: Int!
    public_identifier: String
    blog_locations: Blog_Location
    comment_blogs: [Comment_Blog]
    liked_blogs: [Liked_Blog]
    saved_blogs: [Saved_Blog]
    blog_tags: [Blog_Tag]
}

type Blog_Tag {
    pkblog_tag: Int!
    blog_tag: Int
    blog_tagged: Int
    tags: Tag
    blogs: Blog
}

type Saved_Blog {
    pksaved_blog: Int!
    created_on: DateTime
    saving_user: Int!
    saving_blog: Int!
    blogs: Blog
    users: User
}

type Liked_Blog {
    pkliked_blog: Int!
    created_on: DateTime
    liking_user: Int!
    liking_blog: Int!
    blogs: Blog
    users: User
}

type Comment_Blog {
    pkcomment_blog: Int!
    comment: String
    created_on: DateTime
    comment_user: Int!
    comment_blog: Int!
    blogs: Blog
    users: User
}

type Experience_Location {
    pkexperience_location: Int!
    lat: Float
    lng: Float
    fk_experience_location: Int!
    experiences: Experience
    distance: Float
}

type Blog_Location {
    pkblog_location: Int!
    lat: Float
    lng: Float
    fk_blog_location: Int!
    blogs: Blog
    distance: Float
}

type Itinerary_Location {
    pkitinerary_location: Int!
    lat: Float
    lng: Float
    fk_itinerary_location: Int!
    itineraries: Itinerary
    distance: Float
}

type Itinerary_Experience {
    pkitinerary_experience: Int!
    pkitinerary: Int!
    pkexperience: Int!
    experiences: Experience
    itineraries: Itinerary
}

type Experience_Card {
    lat: Float
    lng: Float
    fk_experience_location: Int!
    distance: Float
    title: String
    summary: String
    created_on: DateTime
    miles: Float
    elevation: Int
    climbing: String
    difficulty: Difficulty_Level
    public_identifier: String
    url: [String]
}

type Itinerary {
    pkitinerary: Int!
    title: String!
    summary: String
    mongoid: String
    fk_user_itinerary: Int
    created_on: DateTime
    public_identifier: String
    users: User
    user_itineraries: [User_Itinerary]
    itinerary_tags: [Itinerary_Tag]
    itinerary_experiences: [Itinerary_Experience]
}

type Itinerary_Tag {
    pkitinerary_tag: Int!
    itinerary_tag: Int
    itinerary_tagged: Int
    tags: Tag
    itineraries: Itinerary
}

type Saved_Itinerary {
    pksaved_itinerary: Int!
    created_on: DateTime
    saving_user: Int!
    saving_itinerary: Int!
    itineraries: Itinerary
    users: User
}

type User_Itinerary {
    pkuser_itinerary: Int!
    created_on: DateTime
    adding_user: Int!
    adding_itinerary: Int!
    itineraries: Itinerary
    users: User
}
`;

module.exports = typeDefs;
