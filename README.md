# This is project code for CS473- Introduction to Social Computing

(the actual final code are implemented in 'writing_feature' branch)
# Project Summary
Many people listen to music alone during the pandemic, but we strongly believe that interacting with other music lovers could properly enrich their music experience.

We created a platform that only focuses on music, which provides a variety of ways to help users express their feelings and understand others.

SongSurge is divided into two independent parts (share & search) so that both users with different purposes can immerse themselves in the emotional resonance with others.
# Instruction
Entering the platform users will face the log in page. Users can click sign up to sign up for new account.

![](https://i.imgur.com/iR4K0Tp.png)

After signing up the account information will be added to the server, and the users will be able to log in. Then a feed of SongSurgeShare will appear containing the posts other users had uploaded. This feed is the same for all users. On the right, users can check the hashtags and the moods, which allows users to filter their feed to contain only songs from those hashtag. 

![](https://i.imgur.com/U3BbzaE.png)

Users can share their own songs clicking the "Write a Post" button above the trending hashtags and moods. SongSurge asks for a link of the song to share, and after adding the link screen below appears. 

![](https://i.imgur.com/hA3wkX0.png)

Users can write anything about the song, including what they like about it or any episodes related to the song. Below are the hashtags, background color, and the mood users can freely add or choose. A preview of the post is shown at the right. Clicking the "Write Post" button the post is added on the feed, as in the image below. 

![](https://i.imgur.com/4MKkDSk.png)

Users can also post questions asking for a song that matches the explanation, and other users can comment recommending the song the post-writer seems to seek for. Hashtags and moods can be used to filter out the atmosphere of the song.

![](https://i.imgur.com/v78ByZG.png)


Users will also be able to add comments to each of the posts. In the comments, users can use emojis, pictures, and gifs to express more on their own ideas about the post or the song itself. 

SongSurgeSearch - which can be switched clicking the word "Search" placed at the upper right - is implemented in a similar manner. 


# URL
Prototype: https://songsurgehci.herokuapp.com/
Git Repository: https://github.com/daminho/song_surge
# Libraries and Framework
- joeattardi/emoji-button
- react-images-uploading
- react-bootstrap
- giphy/js-fetch-api
