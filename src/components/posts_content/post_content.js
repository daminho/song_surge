import "./post_content.css"
/**
 * @author Rvvse
 * @param {{
 *  link: string
 *  backgroundColor: string
 *  postingTime: number
 *  content: string
 *  hashTags: Array<string>
 *  moodyPart: {
 *      symbol: string
 *      string: string
 *  }
 *  userId: string
 * }} props 
 */
function PostContent(props) {
    const {
        link,
        backgroundColor = '',
        postingTime = '',
        content,
        hashTags = [],
        moodyPart,
        userId,
    } = props
    const dateStrArr = new Date(postingTime).toDateString().split(' ');
    const dateStr = dateStrArr.slice(1, 3).join(' ');
    return (
        <div className="post_content" style={{ backgroundColor: backgroundColor }}>
            <div className="post_header">
                <div className="user_id">{userId}</div>
                <div className="date">{dateStr}</div>
            </div>
            <div className="content">{content}</div>
            <iframe width="560" height="315" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div className="status">
                <div className="moody_part">
                    <div className="symbol">{moodyPart?.symbol}</div>
                    <div className="string">{moodyPart?.string}</div>
                </div>
                {hashTags.map(item => (
                    <div className="hash_tag" key={item}>{item}</div>
                ))}
            </div>
        </div>
    )
}

export default PostContent