import './options.css';

function Option(props) {
    const {
        hashTags = [],
        moods = []
    } = props
    
    return (
        <div class = "options">
            <div class = "writepostbox">
                <div class = "writepostmsg">{'Write a post'}</div>
            </div>
            <div class = "trendingbox">
                <div class ="trendingtoday">{'Trending today'}</div>
                <div class = "tagbox">{hashTags[0]}</div>
                <div class = "tagbox">{hashTags[1]}</div>
                <div class = "tagbox">{hashTags[2]}</div>
                <div class = "tagbox">{hashTags[3]}</div>
                <div class = "tagbox">{hashTags[4]}</div>
            </div>
            <div class = "moodybox">
                <div class = "moodytxt">{'Moody'}</div>
                <div class = "moody">{moods[0]}</div>
                <div class = "moody">{moods[1]}</div>
                <div class = "moody">{moods[2]}</div>
                <div class = "moody">{moods[3]}</div>
                <div class = "moody">{moods[4]}</div>
            </div>
        </div>
    )
}



export default Option