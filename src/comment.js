import "./comment.css"

function Postcomment(prop) {
    const {
        link = '',
        postingTime = '',
        content,
        hashTags = [],
        userId,
    } = prop
    const dateStrArr = new Date(postingTime).toDateString().split(' ');
    const dateStr = dateStrArr.slice(1, 3).join(' ');
    if(link === ''){
        return(
            <div className="comment">
            <div className="comment_header">
                <div className="user_id">{userId}</div><div className="date">{dateStr}</div>
            </div>
            <div className="content">{content}</div>
            <div className="status">
                {hashTags.map(item => (
                    <div className="hash_tag" key={item}>{item}</div>
                ))}
            </div>
        </div>
        )
    }
    return (
        <div className="comment">
            <div className="comment_header">
                <div className="user_id">{userId}</div>
                <div className="date">{dateStr}</div>
            </div>
            <div className="content">{content}</div>
            <iframe width="560" height="315" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div className="status">
                {hashTags.map(item => (
                    <div className="hash_tag" key={item}>{item}</div>
                ))}
            </div>
        </div>
    )
}

export default Postcomment