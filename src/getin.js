import './getin.css';

function GetIn(props) {
    const {userId = ''} = props
    if (userId === '') {
        return(
            <div class = "getin">
                <div class = "welcomebox">
                    <div class = "welcomemsg"> {"Welcome to SongSurge"}</div>
                </div>
                <div class = "namebox">
                    <div class = "namemsg">{'How can we call you?'}</div>
                </div>
                <div class = "randombox">
                    <div class ="randomnamemsg">{'Continue with a random name'}</div>
                </div>
            </div>
        )
    }
    

    return (
        <div class = "getin">
            <div class = "welcomebox">
                <div class = "welcomemsg"> {"Welcome to SongSurge"}</div>
            </div>
            <div class = "namebox">
                <div class = "namemsg">{userId}</div>
            </div>
            <div class = "continuebox">
                <div class = "continuemsg">{'Continue'}</div>
            </div>
        </div>
    )
}

export default GetIn