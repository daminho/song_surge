(the actual final code are implemented in 'writing_feature' branch)
# Project Summary
Many people listen to music alone during the pandemic, but they have no interaction with other music lovers and couldn't properly enrich their playlists.
We created a platform that only focuses on music, which provides a variety of ways to help users express their feelings and understand others.
SongSurge is divided into two independent parts (share & search) so that both users with different purposes can immerse themselves in the emotional resonance with others.
# Instruction
Entering the platform users will face the log in page. 

![](https://i.imgur.com/iR4K0Tp.png)

After signing up the account information will be added to the server, and the users will be able to log in. Then a feed of SongSurgeShare will appear containing the posts other users had uploaded. On the right, users can check the hashtags and the moods, which are the two main features users can express their feelings or situations with. 

![](https://i.imgur.com/U3BbzaE.png)

Users can share their own songs clicking the "Write a Post" button above the trending hashtags and moods. SongSurge asks for a link of the song to share, and after adding the link screen below appears. 

![](https://i.imgur.com/hA3wkX0.png)

Users can write anything about the song, including what they like about it or any episodes related to the song. Below are the hashtags, background color, and the mood users can freely add or choose. A preview of the post is shown at the right. Clicking the "Write Post" button the post is added on the feed, as in the image below. 

![](https://i.imgur.com/4MKkDSk.png)

Users will also be able to add comments to each of the posts. In the comments, users can use emojis, pictures, and gifs to express more on their own ideas about the post or the song itself. 

SongSurgeSearch - which can be switched clicking the word "Search" placed at the upper right - is implemented in a similar manner. Users can post questions asking for a song that matches the explanation, and other users can comment recommending the song the post-writer seems to seek for. Hashtags and moods can be used to filter out the atmosphere of the song. 


# URL
Prototype:
Git Repository: https://github.com/daminho/song_surge
# Libraries and Framework
- joeattardi/emoji-button
- react-images-uploading
- react-bootstrap
- giphy/js-fetch-api
