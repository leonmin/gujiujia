import { useEffect, useState } from "react"
import { getRandom } from '../api/poetry'
import './index.css'
import logo from '../assets/logo.png'
const initPoetry = {
  id: '',
  author: '',
  paragraphs: [],
  rhythmic: '',
  type: '0' // 0 唐诗 1宋词
}
export function Random () {
  const [type, setType] = useState('2')
  const [layout, setLayout] = useState(false)
  const [poetry, setPoetry] = useState(initPoetry)
  const [fetching, setFetching] = useState(false)
  const fetchRandom = async () => {
    if (fetching) return
    setFetching(true)
    const res = await getRandom({
      type
    })
    setPoetry(res)
    setFetching(false)
  }
  useEffect(() => {
    fetchRandom()
  }, [])
  const handleRefresh = () => {
    fetchRandom()
  }
  const handleRetype = () => {
    const newType = ((parseInt(type) + 1) % 3).toString()
    setType(newType)
  }
  const handleRelayout = () => {
    setLayout(!layout)
  }
  return (
    <div className="page">
      <div className="wrap pd-15">
        <div className="header flex space-between h-50 mb-15">
          <div className="momo">沽酒家</div>
          <div className="setting flex">
            <div className="relayout btn mr-15" onClick={() => handleRelayout()}>
              布局
            </div>
            <div className="restyle btn mr-15" onClick={() => handleRetype()}>
              {type === '0' && <span>诗</span>}
              {type === '1' && <span>词</span>}
              {type === '2' && <span>诗/词</span>}
            </div>
            <div className={`refresh btn ${fetching ? 'grey' : 'gray'}`} onClick={() => handleRefresh()}>刷新</div>
          </div>
        </div>
        <div className="center">
          <div className="author flex flex-start mb-15">
            <div className="avatar flex mr-10">
              <img src={logo} alt="avatar"/>
            </div>
            {fetching && !poetry.author && <div className="name shrink mr-10 grey">沽酒人</div>}
            {poetry.author && <div className="name shrink mr-10">{poetry.author}</div>}
            <div className="rhythmic mr-10 gray">
              <span className="red mr-2">#</span>
              <span>{poetry.rhythmic}</span>
            </div>
            <div className="poetry-type">{poetry.type === '0' ? '诗' : '词'}</div>
          </div>
          {fetching && poetry.paragraphs.length === 0 && <div className="grey">何处不容我, 沽酒处为家...</div>}
          {layout && <div className="content">
            {poetry.paragraphs}
          </div>}
          {!layout && <div className="content">
              {poetry.paragraphs.map((v, idx) => (
                <div className="para" key={idx}>{v}</div>
              ))}
            </div>}
        </div>
        <div className="footer flex">
          <span className="mr-5 gray">沽酒家</span><a href="http://beian.miit.gov.cn" className="grey">蜀ICP备16028678号-6</a>
        </div>
      </div>
    </div>
  )
}