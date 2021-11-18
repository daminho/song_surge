import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {CONST_HASHTAG} from '../../../constant/hash_tag.js';
import {MOODY} from '../../../constant/moods.js';
import '../writing_pages.css';
// import '../../../post_content/post_content.css';
// function singleHashTag() {

// }

export const listMoody = Object.entries(MOODY).map((item) => {
    const key = item[0];
    const moody = MOODY[key];
    return <CustomOption
        key = {key}
        moodSymbol = {moody.moodSymbol}
        moodContent = {moody.moodContent}
        moodValue = {moody.moodValue}
     ></CustomOption>
});

export default function CustomOption(props) {
    const {
        moodSymbol,
        moodContent,
        moodValue,
    } = props
    return (
        <option value = {moodValue}>
            {moodSymbol}{" " + moodContent}
        </option>
    );
}
