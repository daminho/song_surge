import './post_content.css';

export default function MoodyPart(props) {
    const {
        symbol,
        moodColor,
        content,
    } = props
    return (
        <div className="moody_part" style = {{backgroundColor: moodColor}}>
            <div className="symbol">{symbol}</div>
            <div className="string">{content}</div>
        </div>
    );
}