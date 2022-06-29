import {useState, useEffect} from 'react'

function NoticePage() {

    const [notices, setNotices] = useState([])

    const fetchNotices = async () => {
        const response = await fetch('/api/notices')
        const data = await response.json()
        setNotices(data)
    }
    return(
        <>
        <button onClick={fetchNotices}>Load comments</button>
        {
            notices.map(notice => {
                return (
                    <div key = {notice.id}>
                        {notice.id}  {notice.text}
                    </div>
                )
            })
        }
        </>
    )
}

export default NoticePage